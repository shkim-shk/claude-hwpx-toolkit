#!/usr/bin/env python3
"""
HWPX 후처리: 표 너비/열 비율 수정 + Heading 여백 축소 + 표 좌측정렬
1. 모든 표의 전체 너비를 본문폭(46489)에 맞춤
2. 열 너비를 내용 길이 기반으로 동적 배분
3. 모든 Heading의 전후 여백을 축소 (before=0, after=소량)
4. 표 내부 문단을 좌측 정렬(LEFT)로 변경
"""
import sys
import os
import shutil
import subprocess
from lxml import etree

SKILL_DIR = "/Users/seokhyunkim/.claude/skills/hwpx"
BODY_WIDTH = 46489  # 59527 - 6519*2

HP = 'http://www.hancom.co.kr/hwpml/2011/paragraph'
HH = 'http://www.hancom.co.kr/hwpml/2011/head'
HC = 'http://www.hancom.co.kr/hwpml/2011/core'


def get_cell_text(tc):
    texts = []
    for t in tc.iter(f'{{{HP}}}t'):
        if t.text:
            texts.append(t.text)
    return ''.join(texts)


def weighted_len(text):
    return sum(2 if ord(c) > 0x7F else 1 for c in text)


def fix_cell_heights(root):
    """표 셀 높이를 키워서 위아래 여백 확보 (vertAlign=CENTER와 함께 작동)"""
    ROW_PADDING = 800  # 행 높이에 추가할 여유값
    MIN_ROW_HEIGHT = 1800  # 최소 행 높이

    for tbl in root.iter(f'{{{HP}}}tbl'):
        trs = tbl.findall(f'{{{HP}}}tr')
        for tr in trs:
            tcs = tr.findall(f'{{{HP}}}tc')
            if not tcs:
                continue

            # 행 내 최대 텍스트 줄 수 추정
            max_lines = 1
            for tc in tcs:
                text = get_cell_text(tc)
                cs = tc.find(f'{{{HP}}}cellSz')
                cell_w = int(cs.get('width', '10000')) if cs is not None else 10000
                chars_per_line = max(cell_w // 500, 5)
                wlen = weighted_len(text)
                lines = max(1, (wlen + chars_per_line - 1) // chars_per_line)
                if lines > max_lines:
                    max_lines = lines

            # 행 높이: 줄 수 × 줄 높이 + 패딩
            line_height = 1600
            content_height = max_lines * line_height
            new_height = max(MIN_ROW_HEIGHT, content_height + ROW_PADDING)

            for tc in tcs:
                cs = tc.find(f'{{{HP}}}cellSz')
                if cs is not None:
                    old_h = int(cs.get('height', '850'))
                    if new_height > old_h:
                        cs.set('height', str(new_height))


def is_blank_para(p):
    """문단이 빈 줄(공백/빈 텍스트)인지 판별"""
    texts = []
    for t in p.iter(f'{{{HP}}}t'):
        if t.text and t.text.strip():
            texts.append(t.text.strip())
    # 표를 포함하는 문단은 빈 줄이 아님
    if p.find(f'.//{{{HP}}}tbl') is not None:
        return False
    return len(texts) == 0


def remove_excess_blank_paras(root):
    """연속된 빈 문단을 최대 1개로 줄임. Heading 전 빈 줄도 1개로."""
    sec = root  # root가 sec
    children = list(sec)
    to_remove = []
    prev_blank = False

    for i, child in enumerate(children):
        if child.tag != f'{{{HP}}}p':
            prev_blank = False
            continue

        if is_blank_para(child):
            if prev_blank:
                # 연속 빈 줄 → 제거 대상
                to_remove.append(child)
            else:
                prev_blank = True
        else:
            prev_blank = False

    for elem in to_remove:
        sec.remove(elem)
    print(f"    빈 문단 제거: {len(to_remove)}개")


def fix_tables(root):
    """모든 표의 너비/열 비율 수정 + 셀 내 좌측정렬"""
    for tbl in root.iter(f'{{{HP}}}tbl'):
        sz = tbl.find(f'{{{HP}}}sz')
        if sz is not None:
            sz.set('width', str(BODY_WIDTH))

        trs = tbl.findall(f'{{{HP}}}tr')
        if not trs:
            continue

        colszs = tbl.findall(f'{{{HP}}}colSz')
        num_cols = len(colszs)
        if num_cols == 0:
            continue

        # 각 열의 최대 텍스트 길이 계산
        col_max_lens = [4] * num_cols
        for tr in trs:
            tcs = tr.findall(f'{{{HP}}}tc')
            for tc in tcs:
                addr = tc.find(f'{{{HP}}}cellAddr')
                if addr is None:
                    continue
                col = int(addr.get('colAddr', '0'))
                span = tc.find(f'{{{HP}}}cellSpan')
                col_span = int(span.get('colSpan', '1')) if span is not None else 1
                if col_span > 1:
                    continue
                if col < num_cols:
                    text = get_cell_text(tc)
                    wlen = weighted_len(text)
                    if wlen > col_max_lens[col]:
                        col_max_lens[col] = wlen

        # 열 너비 계산
        total_weight = sum(col_max_lens)
        min_ratio = 0.08
        remaining = 1.0 - min_ratio * num_cols
        if remaining < 0:
            remaining = 0
            min_ratio = 1.0 / num_cols

        col_widths = []
        for ci in range(num_cols):
            ratio = min_ratio + remaining * (col_max_lens[ci] / total_weight)
            col_widths.append(int(BODY_WIDTH * ratio))
        diff = BODY_WIDTH - sum(col_widths)
        col_widths[-1] += diff

        # colSz 업데이트
        for ci, csz in enumerate(colszs):
            if ci < len(col_widths):
                csz.set('width', str(col_widths[ci]))

        # 모든 셀: cellSz 업데이트 + 내부 문단 좌측정렬
        for tr in trs:
            tcs = tr.findall(f'{{{HP}}}tc')
            for tc in tcs:
                addr = tc.find(f'{{{HP}}}cellAddr')
                if addr is None:
                    continue
                col = int(addr.get('colAddr', '0'))
                span = tc.find(f'{{{HP}}}cellSpan')
                col_span = int(span.get('colSpan', '1')) if span is not None else 1

                cell_sz = tc.find(f'{{{HP}}}cellSz')
                if cell_sz is not None and col < num_cols:
                    if col_span == 1:
                        cell_sz.set('width', str(col_widths[col]))
                    else:
                        merged_width = sum(col_widths[col:col+col_span])
                        cell_sz.set('width', str(merged_width))

                # 셀 내 문단 좌측 정렬: paraPrIDRef를 0(JUSTIFY)에서 LEFT로
                # section0.xml에서는 paraPrIDRef로 정렬이 결정됨
                # subList 내 모든 p 태그의 정렬을 직접 변경할 수 없으므로
                # paraPrIDRef를 LEFT 정렬인 ID로 변경 필요
                # → header.xml에서 LEFT 정렬 paraPr을 확인/생성 필요


def fix_header_all(header_path):
    """header.xml 일괄 수정: Heading 문단 간격 축소 + LEFT 정렬 paraPr 추가"""
    import copy
    parser = etree.XMLParser(remove_blank_text=False)
    tree = etree.parse(header_path, parser)
    root = tree.getroot()

    # ── 1. Heading paraPr별 문단 전후 간격 축소 ──
    # <hh:spacing before="X" after="Y"/> 를 수정
    # 800 HWPUNIT ≈ 14pt → 1pt ≈ 57 HWPUNIT
    PT = 57
    target_spacing = {
        '38': (1 * PT, 1 * PT),    # H1: 문단위 1pt, 문단아래 1pt
        '39': (1 * PT, 1 * PT),    # H2: 문단위 1pt, 문단아래 1pt
        '40': (1 * PT, 1 * PT),    # H3: 문단위 1pt, 문단아래 1pt
        '37': (1 * PT, 1 * PT),    # H4: 문단위 1pt, 문단아래 1pt
        '35': (1 * PT, 1 * PT),    # H5
        '36': (1 * PT, 1 * PT),    # H6
    }

    for para_pr in root.iter(f'{{{HH}}}paraPr'):
        pr_id = para_pr.get('id', '')
        if pr_id not in target_spacing:
            continue

        target_before, target_after = target_spacing[pr_id]

        # 모든 <hh:spacing> 요소 수정
        for spacing in para_pr.iter(f'{{{HH}}}spacing'):
            spacing.set('before', str(target_before))
            spacing.set('after', str(target_after))

        # margin의 prev/next도 수정 (한글이 실제로 참조하는 값)
        # 1pt ≈ 114 HWPUNIT (margin 단위)
        MPT = 114
        target_prev = target_before * MPT // PT
        target_next = target_after * MPT // PT
        for margin in para_pr.iter(f'{{{HH}}}margin'):  # HH namespace!
            prev_el = margin.find(f'{{{HC}}}prev')
            next_el = margin.find(f'{{{HC}}}next')
            if prev_el is not None:
                prev_el.set('value', str(target_prev))
            if next_el is not None:
                next_el.set('value', str(target_next))

    # ── 2. 표 셀용 LEFT 정렬 paraPr 추가 ──
    para_props = root.find(f'.//{{{HH}}}paraProperties')
    new_id = None
    if para_props is not None:
        max_id = 0
        for pp in para_props.findall(f'{{{HH}}}paraPr'):
            pid = int(pp.get('id', '0'))
            if pid > max_id:
                max_id = pid

        base_pp = None
        for pp in para_props.findall(f'{{{HH}}}paraPr'):
            if pp.get('id') == '0':
                base_pp = pp
                break

        if base_pp is not None:
            new_pp = copy.deepcopy(base_pp)
            new_id = str(max_id + 1)
            new_pp.set('id', new_id)

            align = new_pp.find(f'{{{HC}}}align')
            if align is not None:
                align.set('horizontal', 'LEFT')
            else:
                align = etree.SubElement(new_pp, f'{{{HC}}}align')
                align.set('horizontal', 'LEFT')
                align.set('vertical', 'BASELINE')

            para_props.append(new_pp)
            item_cnt = int(para_props.get('itemCnt', '0'))
            para_props.set('itemCnt', str(item_cnt + 1))

    tree.write(header_path, xml_declaration=True, encoding='UTF-8')
    return new_id


def fix_table_cell_alignment(section_path, left_para_pr_id):
    """표 셀 내 문단의 paraPrIDRef를 LEFT 정렬 ID로 변경"""
    if left_para_pr_id is None:
        return

    parser = etree.XMLParser(remove_blank_text=False)
    tree = etree.parse(section_path, parser)
    root = tree.getroot()

    for tbl in root.iter(f'{{{HP}}}tbl'):
        for tr in tbl.findall(f'{{{HP}}}tr'):
            for tc in tr.findall(f'{{{HP}}}tc'):
                sub_list = tc.find(f'{{{HP}}}subList')
                if sub_list is not None:
                    for p in sub_list.findall(f'{{{HP}}}p'):
                        p.set('paraPrIDRef', left_para_pr_id)

    tree.write(section_path, xml_declaration=True, encoding='UTF-8')


def process_hwpx(hwpx_path):
    tmp_dir = f"/tmp/fix_tbl_{os.path.basename(hwpx_path).replace('.hwpx', '')}"
    if os.path.exists(tmp_dir):
        shutil.rmtree(tmp_dir)

    subprocess.run([sys.executable, f"{SKILL_DIR}/scripts/office/unpack.py",
                    hwpx_path, tmp_dir], check=True, capture_output=True)

    section_path = os.path.join(tmp_dir, "Contents", "section0.xml")
    header_path = os.path.join(tmp_dir, "Contents", "header.xml")

    # 1. header.xml — Heading 문단 간격 축소 + LEFT 정렬 paraPr 추가
    left_pr_id = fix_header_all(header_path)

    # 3. section0.xml — 빈 문단 제거 + 표 너비/열 비율 수정
    parser = etree.XMLParser(remove_blank_text=False)
    tree = etree.parse(section_path, parser)
    root = tree.getroot()
    remove_excess_blank_paras(root)
    fix_tables(root)
    fix_cell_heights(root)
    tree.write(section_path, xml_declaration=True, encoding='UTF-8')

    # 3. 표 셀 좌측 정렬
    fix_table_cell_alignment(section_path, left_pr_id)

    # repack
    subprocess.run([sys.executable, f"{SKILL_DIR}/scripts/office/pack.py",
                    tmp_dir, hwpx_path], check=True, capture_output=True)

    # validate
    result = subprocess.run([sys.executable, f"{SKILL_DIR}/scripts/validate.py",
                            hwpx_path], capture_output=True, text=True)
    print(f"  {result.stdout.strip()}")

    shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == '__main__':
    for path in sys.argv[1:]:
        print(f"Fixing: {os.path.basename(path)}")
        process_hwpx(path)
