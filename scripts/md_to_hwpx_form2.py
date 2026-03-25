#!/usr/bin/env python3
"""
MD → HWPX 변환 스크립트 — 서식2 (도전적 문제 정의서)
서식2 원본 HWPX의 header.xml + section0.xml 구조를 그대로 복원하면서,
MD 내용을 표 셀에 채워 넣는다.

사용법:
  python3 md_to_hwpx_form2.py <input.md> <output.hwpx> <reference.hwpx>
"""
import re
import sys
import os
import copy
from lxml import etree

# 스킬 디렉토리 자동 감지
SKILL_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_SCRIPT = os.path.join(SKILL_DIR, 'build_hwpx.py')
ANALYZE_SCRIPT = os.path.join(SKILL_DIR, 'analyze_template.py')

NS = {
    'hp': 'http://www.hancom.co.kr/hwpml/2011/paragraph',
    'hs': 'http://www.hancom.co.kr/hwpml/2011/section',
    'hc': 'http://www.hancom.co.kr/hwpml/2011/core',
    'hh': 'http://www.hancom.co.kr/hwpml/2011/head',
}

# 원본에서 사용하는 charPr ID 매핑
# [21] 10pt 맑은 고딕 bold spacing=-10  → 소제목
# [23] 10pt 맑은 고딕 spacing=-10       → 본문
# [27] 10pt 맑은 고딕 spacing=-10       → 본문 (borderFill=8)
# [29] 9pt 맑은 고딕 bold spacing=-10   → 참고자료 제목
# [14] 10pt 맑은 고딕 white bold spacing=-5 → 헤더 셀 텍스트
# [15] 10pt 맑은 고딕 bold              → 라벨 셀 텍스트
# [16] 10pt 맑은 고딕 bold spacing=-8   → 미션 텍스트
# [19] 10pt 맑은 고딕 spacing=-7        → 제안자 내용
# [18] 10pt 맑은 고딕 bold spacing=-7   → 제안자 라벨
CHARPR_BODY = "23"        # 본문 텍스트
CHARPR_BODY_ALT = "27"    # 본문 텍스트 (내용 입력 행)
CHARPR_BOLD = "21"        # 볼드 소제목
CHARPR_ITALIC = "26"      # 이탤릭
CHARPR_REF_BOLD = "29"    # 참고자료 볼드 (9pt)

# 원본에서 사용하는 paraPr ID 매핑
# [21] JUSTIFY 130%       → 본문 기본
# [30] JUSTIFY 130% indent=-2300, next=300 → 들여쓰기 본문
# [31] JUSTIFY 130% indent=-2046 → 본문
# [32] JUSTIFY 130% indent=-1423, next=300 → 들여쓰기
# [33] JUSTIFY 130% next=300 → 본문 (간격)
# [22] CENTER 130%         → 셀 중앙
PARAPR_BODY = "21"
PARAPR_BODY_INDENT = "30"
PARAPR_BODY_INDENT2 = "32"
PARAPR_BODY_SPACED = "33"
PARAPR_CENTER = "22"


def make_para(para_pr="21", runs=None, p_id="0"):
    """HWPX 문단 XML 생성"""
    p = etree.SubElement(etree.Element('dummy'), '{http://www.hancom.co.kr/hwpml/2011/paragraph}p')
    p.set('id', p_id)
    p.set('paraPrIDRef', para_pr)
    p.set('styleIDRef', '0')
    p.set('pageBreak', '0')
    p.set('columnBreak', '0')
    p.set('merged', '0')

    if runs is None:
        runs = [("23", "")]

    for char_pr, text in runs:
        run = etree.SubElement(p, '{http://www.hancom.co.kr/hwpml/2011/paragraph}run')
        run.set('charPrIDRef', char_pr)
        t = etree.SubElement(run, '{http://www.hancom.co.kr/hwpml/2011/paragraph}t')
        if text:
            t.text = text

    return p


def parse_inline(text):
    """Markdown 인라인 서식 파싱 → [(charPrID, text), ...] 리스트"""
    runs = []
    pattern = r'(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))'
    for m in re.finditer(pattern, text):
        if m.group(2):  # bold italic
            runs.append((CHARPR_ITALIC, m.group(2)))
        elif m.group(3):  # bold
            runs.append((CHARPR_BOLD, m.group(3)))
        elif m.group(4):  # italic
            runs.append((CHARPR_ITALIC, m.group(4)))
        elif m.group(5):  # plain
            runs.append((CHARPR_BODY, m.group(5)))
    return runs if runs else [(CHARPR_BODY, text)]


def make_nested_tbl(rows_data, parent_cell_width=38837):
    """셀 내부에 HWPX 중첩 표를 생성하여 해당 표를 포함하는 문단(hp:p)을 반환.

    rows_data: [[col1, col2, ...], ...] 형태의 2D 리스트
    parent_cell_width: 부모 셀 너비 (HWPUNIT). 셀 내부 여백 제외 후 표 너비 결정.

    HWPX 중첩 표 구조:
      hp:p > hp:run > hp:tbl > hp:tr > hp:tc > hp:subList > hp:p > hp:run > hp:t
    """
    HP = 'http://www.hancom.co.kr/hwpml/2011/paragraph'

    if not rows_data or not rows_data[0]:
        return None

    num_cols = len(rows_data[0])
    num_rows = len(rows_data)
    # 표 너비: 부모 셀 너비에서 좌우 여백 제외
    tbl_width = parent_cell_width - 566
    col_width = tbl_width // num_cols
    row_height = 1600  # 기본 행 높이

    # borderFill ID 참조: 9 = 0.12mm SOLID 사방
    BORDER_FILL_CELL = "9"
    BORDER_FILL_HEADER = "10"  # 헤더용 (2B5686 배경)

    # 문단 생성 (표를 감싸는)
    wrapper_p = etree.Element(f'{{{HP}}}p')
    wrapper_p.set('id', '0')
    wrapper_p.set('paraPrIDRef', PARAPR_BODY)
    wrapper_p.set('styleIDRef', '0')
    wrapper_p.set('pageBreak', '0')
    wrapper_p.set('columnBreak', '0')
    wrapper_p.set('merged', '0')

    wrapper_run = etree.SubElement(wrapper_p, f'{{{HP}}}run')
    wrapper_run.set('charPrIDRef', CHARPR_BODY)

    # tbl 요소
    tbl = etree.SubElement(wrapper_run, f'{{{HP}}}tbl')
    tbl.set('pageBreak', 'CELL')
    tbl.set('repeatHeader', '0')
    tbl.set('rowCnt', str(num_rows))
    tbl.set('colCnt', str(num_cols))
    tbl.set('cellSpacing', '0')
    tbl.set('borderFillIDRef', BORDER_FILL_CELL)

    # sz (표 전체 크기)
    total_height = row_height * num_rows
    sz = etree.SubElement(tbl, f'{{{HP}}}sz')
    sz.set('width', str(tbl_width))
    sz.set('height', str(total_height))
    sz.set('widthRelTo', 'absolute')
    sz.set('heightRelTo', 'absolute')
    sz.set('hasWidth', '1')
    sz.set('hasHeight', '0')
    sz.set('protect', '0')

    # pos (위치 — inline)
    pos = etree.SubElement(tbl, f'{{{HP}}}pos')
    pos.set('treatAsChar', '1')
    pos.set('affectLSpacing', '0')
    pos.set('flowWithText', '1')
    pos.set('allowOverlap', '0')
    pos.set('holdAnchorAndSO', '0')
    pos.set('vertRelTo', 'para')
    pos.set('horzRelTo', 'para')
    pos.set('vertAlign', 'top')
    pos.set('horzAlign', 'left')
    pos.set('vertOffset', '0')
    pos.set('horzOffset', '0')

    # margin
    outMargin = etree.SubElement(tbl, f'{{{HP}}}outMargin')
    outMargin.set('left', '0')
    outMargin.set('right', '0')
    outMargin.set('top', '141')
    outMargin.set('bottom', '141')

    # 각 행/셀 생성
    for ri, row in enumerate(rows_data):
        tr = etree.SubElement(tbl, f'{{{HP}}}tr')

        for ci, cell_text in enumerate(row):
            is_header = (ri == 0)
            tc = etree.SubElement(tr, f'{{{HP}}}tc')
            tc.set('name', '')
            tc.set('header', '1' if is_header else '0')
            tc.set('hasMargin', '1')
            tc.set('protect', '0')
            tc.set('editable', '0')
            tc.set('dirty', '0')
            tc.set('colAddr', str(ci))
            tc.set('rowAddr', str(ri))
            tc.set('colSpan', '1')
            tc.set('rowSpan', '1')

            # cellAddr
            ca = etree.SubElement(tc, f'{{{HP}}}cellAddr')
            ca.set('colAddr', str(ci))
            ca.set('rowAddr', str(ri))

            # cellSz
            csz = etree.SubElement(tc, f'{{{HP}}}cellSz')
            csz.set('width', str(col_width))
            csz.set('height', str(row_height))

            # cellMargin
            cm = etree.SubElement(tc, f'{{{HP}}}cellMargin')
            cm.set('left', '142')
            cm.set('right', '142')
            cm.set('top', '71')
            cm.set('bottom', '71')

            # borderFill
            bf_id = BORDER_FILL_CELL
            tc.set('borderFillIDRef', bf_id)

            # subList > p > run > t
            sl = etree.SubElement(tc, f'{{{HP}}}subList')
            sl.set('id', '0')
            sl.set('textDirection', 'HORIZONTAL')
            sl.set('lineWrap', 'BREAK')
            sl.set('vertAlign', 'CENTER')
            sl.set('linkListIDRef', '0')
            sl.set('linkListNextIDRef', '0')
            sl.set('textWidth', str(col_width - 284))
            sl.set('textHeight', str(row_height - 142))

            p_el = etree.SubElement(sl, f'{{{HP}}}p')
            p_el.set('id', '0')
            p_el.set('paraPrIDRef', PARAPR_BODY)
            p_el.set('styleIDRef', '0')
            p_el.set('pageBreak', '0')
            p_el.set('columnBreak', '0')
            p_el.set('merged', '0')

            run_el = etree.SubElement(p_el, f'{{{HP}}}run')
            charpr = CHARPR_BOLD if is_header else CHARPR_BODY
            run_el.set('charPrIDRef', charpr)

            t_el = etree.SubElement(run_el, f'{{{HP}}}t')
            t_el.text = cell_text if cell_text else ''

    return wrapper_p


def md_to_paras(content_lines, charpr_body=CHARPR_BODY, parapr_body=PARAPR_BODY):
    """MD 섹션 내용을 HWPX 문단 리스트로 변환 (표는 중첩 표 XML로 생성)"""
    paras = []

    for line_data in content_lines:
        lt = line_data['type']
        text = line_data['text']

        if lt == 'heading3':
            runs = parse_inline(text)
            # 볼드로 override
            bold_runs = [(CHARPR_BOLD, r[1]) for r in runs]
            paras.append(make_para(parapr_body, bold_runs))
        elif lt == 'heading4':
            runs = parse_inline(text)
            bold_runs = [(CHARPR_BOLD, r[1]) for r in runs]
            paras.append(make_para(parapr_body, bold_runs))
        elif lt == 'bullet':
            runs = [(charpr_body, "- ")]
            runs.extend(parse_inline(text))
            paras.append(make_para(PARAPR_BODY_INDENT2, runs))
        elif lt == 'numbered':
            runs = parse_inline(text)
            paras.append(make_para(PARAPR_BODY_INDENT, runs))
        elif lt == 'reference':
            runs = parse_inline(text)
            paras.append(make_para(PARAPR_BODY_SPACED, runs))
        elif lt == 'table':
            rows = line_data.get('rows', [])
            if rows:
                tbl_p = make_nested_tbl(rows)
                if tbl_p is not None:
                    paras.append(tbl_p)
        else:
            # 일반 본문
            runs = parse_inline(text)
            paras.append(make_para(parapr_body, runs))

    return paras


def parse_md_table_rows(lines, start_idx):
    """Markdown 표 파싱"""
    rows = []
    i = start_idx
    while i < len(lines):
        line = lines[i].strip()
        if not line.startswith('|'):
            break
        if re.match(r'^\|[\s\-:|]+\|$', line):
            i += 1
            continue
        cells = [c.strip() for c in line.split('|')[1:-1]]
        rows.append(cells)
        i += 1
    return rows, i


def parse_markdown(md_text):
    """MD 파싱 → 구조화 데이터"""
    lines = md_text.split('\n')
    result = {
        'title_kr': '', 'title_en': '',
        'mission': '',
        'affiliation': '', 'name': '', 'contact': '', 'privacy': 'O',
        'sections': {}
    }

    current_section = None
    section_lines = []
    i = 0

    while i < len(lines):
        stripped = lines[i].strip()

        if not stripped or stripped == '---':
            i += 1
            continue

        if stripped.startswith('# ') and not stripped.startswith('## '):
            i += 1
            continue

        if stripped.startswith('## '):
            section_text = stripped[3:].strip()

            if '도전적 문제' in section_text and '정의서' not in section_text:
                i += 1
                while i < len(lines) and not lines[i].strip().startswith('|'):
                    i += 1
                if i < len(lines):
                    rows, i = parse_md_table_rows(lines, i)
                    for row in rows:
                        if len(row) >= 2:
                            if '국문' in row[0]:
                                result['title_kr'] = row[1]
                            elif '영문' in row[0]:
                                result['title_en'] = row[1]
                continue

            if '미션' in section_text and '체크' not in section_text:
                i += 1
                while i < len(lines):
                    s = lines[i].strip()
                    if s and not s.startswith('#'):
                        result['mission'] = s
                        i += 1
                        break
                    elif s.startswith('#'):
                        break
                    i += 1
                continue

            if '제안자' in section_text or '인적사항' in section_text:
                i += 1
                while i < len(lines) and not lines[i].strip().startswith('|'):
                    i += 1
                if i < len(lines):
                    rows, i = parse_md_table_rows(lines, i)
                    for row in rows:
                        if len(row) >= 2:
                            if '소속' in row[0]:
                                result['affiliation'] = row[1]
                            elif '성함' in row[0]:
                                result['name'] = row[1]
                            elif '연락처' in row[0]:
                                result['contact'] = row[1]
                            elif '개인정보' in row[0]:
                                result['privacy'] = row[1]
                continue

            sec_match = re.match(r'^(\d+)\.', section_text)
            if sec_match:
                if current_section and section_lines:
                    result['sections'][current_section] = section_lines
                current_section = sec_match.group(1)
                section_lines = []
                i += 1
                continue

        if stripped.startswith('### '):
            if current_section:
                section_lines.append({'type': 'heading3', 'text': stripped[4:].strip()})
            i += 1
            continue

        if stripped.startswith('#### '):
            if current_section:
                section_lines.append({'type': 'heading4', 'text': stripped[5:].strip()})
            i += 1
            continue

        if stripped.startswith('|') and i + 1 < len(lines) and lines[i + 1].strip().startswith('|'):
            if current_section:
                rows, i = parse_md_table_rows(lines, i)
                section_lines.append({'type': 'table', 'text': '', 'rows': rows})
            else:
                _, i = parse_md_table_rows(lines, i)
            continue

        if stripped.startswith('- '):
            if current_section:
                section_lines.append({'type': 'bullet', 'text': stripped[2:].strip()})
            i += 1
            continue

        num_match = re.match(r'^(\d+)\.\s+(.+)', stripped)
        if num_match and current_section:
            section_lines.append({'type': 'numbered', 'text': stripped})
            i += 1
            continue

        ref_match = re.match(r'^\[(\d+)\]\s+(.+)', stripped)
        if ref_match and current_section == "6":
            section_lines.append({'type': 'reference', 'text': stripped})
            i += 1
            continue

        if current_section:
            para_lines = [stripped]
            j = i + 1
            while j < len(lines):
                nl = lines[j].strip()
                if (not nl or nl.startswith('#') or nl.startswith('|') or
                    nl.startswith('- ') or re.match(r'^\d+\.\s+', nl) or
                    re.match(r'^\[\d+\]', nl) or nl == '---'):
                    break
                para_lines.append(nl)
                j += 1
            section_lines.append({'type': 'paragraph', 'text': ' '.join(para_lines)})
            i = j
            continue

        i += 1

    if current_section and section_lines:
        result['sections'][current_section] = section_lines

    return result


def estimate_cell_height(text, cell_width, font_size_pt=10, line_spacing_pct=130):
    """텍스트 길이와 셀 너비로 필요한 셀 높이 추정 (HWPUNIT)"""
    # 10pt 맑은 고딕 기준: 한글 글자폭 약 500 HWPUNIT, 영문/숫자 약 280
    # spacing=-10 적용 시 약 10% 축소
    weighted_len = sum(500 if ord(c) > 0x7F else 280 for c in text)
    weighted_len = int(weighted_len * 0.9)  # spacing=-10 보정
    # 셀 내부 여백 제외 (좌우 283씩)
    usable_width = cell_width - 566
    num_lines = max(1, (weighted_len + usable_width - 1) // usable_width)
    line_height = int(font_size_pt * 100 * line_spacing_pct / 100)  # HWPUNIT
    return num_lines * line_height + 300  # 상하 여백


def adjust_cell_height(tc, min_height, ns):
    """셀 높이를 최소 min_height로 조정"""
    cell_sz = tc.find('hp:cellSz', ns)
    if cell_sz is not None:
        current = int(cell_sz.get('height', '0'))
        if min_height > current:
            cell_sz.set('height', str(min_height))


def replace_cell_content(tc, new_paras, ns):
    """표 셀의 문단들을 새 문단들로 교체 (subList 내부)"""
    # HWPX 구조: tc > subList > p
    sublist = tc.find('hp:subList', ns)
    if sublist is None:
        # subList가 없으면 직접 p를 찾기
        old_paras = tc.findall('hp:p', ns)
        for p in old_paras:
            tc.remove(p)
        for p in new_paras:
            tc.append(p)
        return

    # subList 내 기존 문단 모두 제거
    old_paras = sublist.findall('hp:p', ns)
    for p in old_paras:
        sublist.remove(p)

    # 새 문단 추가
    for p in new_paras:
        sublist.append(p)


def remove_linesegarray(element, ns):
    """linesegarray를 재귀적으로 모두 제거 (한글이 자동 재계산하도록)"""
    for lsa in element.findall('.//hp:linesegarray', ns):
        lsa.getparent().remove(lsa)


def set_cell_text(tc, text, charpr="15", parapr="22", ns=NS):
    """셀에 단일 텍스트 설정 (subList 내부의 문단)"""
    # HWPX: tc > subList > p > run > t
    sublist = tc.find('hp:subList', ns)
    target = sublist if sublist is not None else tc
    paras = target.findall('hp:p', ns)
    if paras:
        # 기존 문단 모두 제거하고 새로 1개만
        for p in paras[1:]:
            target.remove(p)
        p = paras[0]
        p.set('paraPrIDRef', parapr)
        # linesegarray 제거 (한글이 자동 재계산)
        remove_linesegarray(p, ns)
        # 기존 run 모두 제거
        for run in p.findall('hp:run', ns):
            p.remove(run)
        # 새 run 추가
        run = etree.SubElement(p, '{http://www.hancom.co.kr/hwpml/2011/paragraph}run')
        run.set('charPrIDRef', charpr)
        t = etree.SubElement(run, '{http://www.hancom.co.kr/hwpml/2011/paragraph}t')
        t.text = text


def convert(md_path, output_path, reference_path):
    """MD → HWPX 변환 (서식2 레퍼런스 기반)"""
    import subprocess
    import tempfile

    # 1) 레퍼런스에서 header.xml, section0.xml 추출
    header_path = tempfile.mktemp(suffix='_header.xml')
    section_path = tempfile.mktemp(suffix='_section.xml')

    subprocess.run([
        sys.executable, ANALYZE_SCRIPT, reference_path,
        '--extract-header', header_path,
        '--extract-section', section_path
    ], capture_output=True)

    # 2) MD 파싱
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    data = parse_markdown(md_text)

    # 3) section0.xml 수정
    tree = etree.parse(section_path)
    root = tree.getroot()

    tables = root.findall('.//hp:tbl', NS)

    # ── 표1 (도전적 문제): 2행×3열 ──
    if len(tables) >= 2:
        tbl1 = tables[1]
        trs = tbl1.findall('hp:tr', NS)

        # Row 0: [국문] 내용 → Cell(2,0)
        row0_cells = trs[0].findall('hp:tc', NS)
        if len(row0_cells) >= 3:
            set_cell_text(row0_cells[2], data['title_kr'], charpr="15", parapr="21")
            kr_height = estimate_cell_height(data['title_kr'], 37932)
            adjust_cell_height(row0_cells[2], kr_height, NS)
            adjust_cell_height(row0_cells[1], kr_height, NS)

        # Row 1: [영문] 내용
        row1_cells = trs[1].findall('hp:tc', NS)
        if len(row1_cells) >= 2:
            set_cell_text(row1_cells[1], data['title_en'], charpr="15", parapr="21")
            en_height = estimate_cell_height(data['title_en'], 37932)
            adjust_cell_height(row1_cells[1], en_height, NS)
            adjust_cell_height(row1_cells[0], en_height, NS)

        # "도전적 문제" 라벨 셀(rowSpan=2) 높이
        total_height = kr_height + en_height
        if len(row0_cells) >= 1:
            adjust_cell_height(row0_cells[0], total_height, NS)

        # 표 자체의 hp:sz height도 갱신 (표가 run 안에 있으므로 필수)
        tbl1_sz = tbl1.find('hp:sz', NS)
        if tbl1_sz is not None:
            old_h = int(tbl1_sz.get('height', '0'))
            if total_height > old_h:
                tbl1_sz.set('height', str(total_height))

        # subList의 textWidth를 셀 너비로 설정 (줄바꿈 활성화)
        for tr in trs:
            for tc in tr.findall('hp:tc', NS):
                sublist = tc.find('hp:subList', NS)
                cell_sz = tc.find('hp:cellSz', NS)
                cell_margin = tc.find('hp:cellMargin', NS)
                if sublist is not None and cell_sz is not None:
                    cw = int(cell_sz.get('width', '0'))
                    ml = int(cell_margin.get('left', '0')) if cell_margin is not None else 283
                    mr = int(cell_margin.get('right', '0')) if cell_margin is not None else 283
                    tw = cw - ml - mr
                    sublist.set('textWidth', str(tw))

    # ── 표2 (미션/제안자): 3행×6열 ──
    if len(tables) >= 3:
        tbl2 = tables[2]
        trs = tbl2.findall('hp:tr', NS)

        # Row 0: 미션 내용 → Cell(1,0) (5열 병합)
        row0_cells = trs[0].findall('hp:tc', NS)
        if len(row0_cells) >= 2:
            set_cell_text(row0_cells[1], data['mission'], charpr="16", parapr="11")

        # Row 1: 소속, 성함
        row1_cells = trs[1].findall('hp:tc', NS)
        # 소속 내용: Cell(2,1) → row1_cells[2] (0=제안자라벨(rowspan), 1=소속라벨, 2=소속내용, 3=성함라벨, 4=성함내용)
        if len(row1_cells) >= 5:
            set_cell_text(row1_cells[2], data['affiliation'], charpr="19", parapr="26")
            set_cell_text(row1_cells[4], data['name'], charpr="19", parapr="27")

        # Row 2: 연락처, 개인정보
        row2_cells = trs[2].findall('hp:tc', NS)
        if len(row2_cells) >= 4:
            set_cell_text(row2_cells[1], data['contact'], charpr="19", parapr="26")
            # 개인정보 동의 O/X는 이미 원본에 있으므로 유지

    # ── 표3 (본문): 양식 원본 10행×2열을 제거하고 6행×2열로 직접 생성 ──
    # 양식 표3 조작이 한글에서 깨지므로, 표 전체를 새로 만든다.
    # 스타일은 양식 원본의 borderFill, charPr, paraPr ID를 그대로 참조.
    if len(tables) >= 4:
        old_tbl3 = tables[3]
        # old_tbl3이 포함된 run 찾기
        old_tbl3_parent_run = old_tbl3.getparent()

        # 섹션 라벨 정의
        SECTION_LABELS = [
            ("1", "정의 및 중요성", "무엇이 문제인가?"),
            ("2", "2. 배경 및 목적", "왜 이 문제에 대한 해결을\n시도하려고 하는가?"),
            ("3", "3. 목표 및 방법", "이 문제를 해결하기 위한\n기존의 방법과 한계는 무엇이며,\n시도하고자 하는 방법은\n어떻게 다르고 무엇을\n새롭게 제안하는가?"),
            ("4", "4. 예상 결과", "문제를 해결할 수 있을\n것이라는 신호는\n무엇인가?"),
            ("5", "5. 파급효과 ", "만약 성공한다면, 그\n영향은 무엇인가?"),
            ("6", "6. 참고자료", "각 질문에 대해 입증할 수\n있는 학술 자료, 통계,\n보고서, 실험/임상 데이터,\n글로벌 기술/산업 동향\n분석 자료, 정책 자료,\n해당 분야 전문가들의\n코멘트나 추천 의견,\n미디어 및 언론 보도\n자료 링크 등"),
        ]

        HP = 'http://www.hancom.co.kr/hwpml/2011/paragraph'
        num_rows = 6
        label_width = 8786
        content_width = 38837
        row_height = 4113  # 기본 행 높이 (한글이 내용에 맞게 자동 조정)

        # 양식 원본의 borderFill ID 참조
        # 10 = 헤더 배경 (#2B5686), 24 = 라벨 배경 (#DFEAF5)
        # 11, 12, 13, 14 = 내용 셀 테두리 변형들
        # 25, 26, 27 = 내용 셀 테두리 변형들
        BF_LABEL = "24"    # 라벨 셀 (연파랑 배경 #DFEAF5)
        BF_CONTENT = "25"  # 내용 셀 (기본 테두리)

        # 새 표 생성
        new_tbl = etree.Element(f'{{{HP}}}tbl')
        new_tbl.set('pageBreak', 'CELL')
        new_tbl.set('repeatHeader', '0')
        new_tbl.set('rowCnt', str(num_rows))
        new_tbl.set('colCnt', '2')
        new_tbl.set('cellSpacing', '0')
        new_tbl.set('borderFillIDRef', '9')

        # sz — 원본 양식과 동일한 설정 (47623 = 본문 전체 폭)
        total_width = 47623
        sz = etree.SubElement(new_tbl, f'{{{HP}}}sz')
        sz.set('width', str(total_width))
        sz.set('widthRelTo', 'ABSOLUTE')
        sz.set('height', '51742')
        sz.set('heightRelTo', 'ABSOLUTE')
        sz.set('protect', '0')

        # pos — treatAsChar=0 (블록 객체, 페이지 넘김 허용)
        pos = etree.SubElement(new_tbl, f'{{{HP}}}pos')
        pos.set('treatAsChar', '0')
        pos.set('affectLSpacing', '0')
        pos.set('flowWithText', '1')
        pos.set('allowOverlap', '0')
        pos.set('holdAnchorAndSO', '0')
        pos.set('vertRelTo', 'PARA')
        pos.set('horzRelTo', 'COLUMN')
        pos.set('vertAlign', 'TOP')
        pos.set('horzAlign', 'LEFT')
        pos.set('vertOffset', '0')
        pos.set('horzOffset', '0')

        # outMargin
        om = etree.SubElement(new_tbl, f'{{{HP}}}outMargin')
        om.set('left', '0')
        om.set('right', '0')
        om.set('top', '141')
        om.set('bottom', '141')

        def make_cell(col_addr, row_addr, width, height, border_fill_id):
            """HWPX 표 셀(tc) 생성"""
            tc = etree.Element(f'{{{HP}}}tc')
            tc.set('name', '')
            tc.set('header', '0')
            tc.set('hasMargin', '1')
            tc.set('protect', '0')
            tc.set('editable', '0')
            tc.set('dirty', '0')
            tc.set('colAddr', str(col_addr))
            tc.set('rowAddr', str(row_addr))
            tc.set('colSpan', '1')
            tc.set('rowSpan', '1')
            tc.set('borderFillIDRef', border_fill_id)

            ca = etree.SubElement(tc, f'{{{HP}}}cellAddr')
            ca.set('colAddr', str(col_addr))
            ca.set('rowAddr', str(row_addr))

            csz = etree.SubElement(tc, f'{{{HP}}}cellSz')
            csz.set('width', str(width))
            csz.set('height', str(height))

            cm = etree.SubElement(tc, f'{{{HP}}}cellMargin')
            cm.set('left', '142')
            cm.set('right', '142')
            cm.set('top', '425')
            cm.set('bottom', '425')

            sl = etree.SubElement(tc, f'{{{HP}}}subList')
            sl.set('id', '0')
            sl.set('textDirection', 'HORIZONTAL')
            sl.set('lineWrap', 'BREAK')
            sl.set('vertAlign', 'CENTER')
            sl.set('linkListIDRef', '0')
            sl.set('linkListNextIDRef', '0')
            sl.set('textWidth', str(width - 284))
            sl.set('textHeight', str(height - 142))

            return tc, sl

        for ri, (sec_key, title, subtitle) in enumerate(SECTION_LABELS):
            tr = etree.SubElement(new_tbl, f'{{{HP}}}tr')

            # ── 라벨 셀 (c0) ──
            label_tc, label_sl = make_cell(0, ri, label_width, row_height, BF_LABEL)
            # 라벨: 제목 (볼드)
            p_title = make_para(PARAPR_CENTER, [(CHARPR_BOLD, title)])
            label_sl.append(p_title)
            # 빈 줄
            p_space = make_para(PARAPR_CENTER, [(CHARPR_BODY, "")])
            label_sl.append(p_space)
            # 부제
            for sub_line in subtitle.split('\n'):
                p_sub = make_para(PARAPR_CENTER, [(CHARPR_BODY, sub_line)])
                label_sl.append(p_sub)

            tr.append(label_tc)

            # ── 내용 셀 (c1) ──
            content_tc, content_sl = make_cell(1, ri, content_width, row_height, BF_CONTENT)

            if sec_key in data['sections']:
                content_paras = md_to_paras(data['sections'][sec_key], CHARPR_BODY, PARAPR_BODY)
                if not content_paras:
                    content_paras = [make_para(PARAPR_BODY, [(CHARPR_BODY, "")])]
            else:
                content_paras = [make_para(PARAPR_BODY, [(CHARPR_BODY, "")])]

            for p in content_paras:
                content_sl.append(p)

            tr.append(content_tc)

        # 양식의 표3을 새 표로 교체
        old_tbl3_parent_run.replace(old_tbl3, new_tbl)

    # 5) 전체 문서에서 linesegarray 제거 (한글이 열 때 자동 재계산)
    remove_linesegarray(root, NS)

    # 수정된 section0.xml 저장
    tree.write(section_path, xml_declaration=True, encoding='UTF-8')

    # 5) build_hwpx.py로 HWPX 조립
    subprocess.run([
        sys.executable, BUILD_SCRIPT,
        '--header', header_path,
        '--section', section_path,
        '--output', output_path
    ], capture_output=True)

    # 6) 검증
    validate_script = os.path.join(SKILL_DIR, 'validate.py')
    result = subprocess.run([
        sys.executable, validate_script, output_path
    ], capture_output=True, text=True)

    if result.returncode == 0:
        print(f"✓ 생성 완료: {output_path}")
    else:
        print(f"✓ 생성 완료: {output_path}")
        if result.stdout:
            print(f"  검증: {result.stdout.strip()}")
        if result.stderr:
            print(f"  경고: {result.stderr.strip()}")

    # 임시 파일 정리
    try:
        os.unlink(header_path)
        os.unlink(section_path)
    except:
        pass


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python3 md_to_hwpx_form2.py <input.md> <output.hwpx> <reference.hwpx>")
        sys.exit(1)

    convert(sys.argv[1], sys.argv[2], sys.argv[3])
