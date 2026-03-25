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


def md_to_paras(content_lines, charpr_body=CHARPR_BODY, parapr_body=PARAPR_BODY):
    """MD 섹션 내용을 HWPX 문단 리스트로 변환"""
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
            # 표 내 표는 텍스트로 표현 (HWPX 중첩 표는 복잡)
            rows = line_data.get('rows', [])
            if rows:
                # 헤더
                header_text = " | ".join(rows[0])
                paras.append(make_para(parapr_body, [(CHARPR_BOLD, header_text)]))
                for row in rows[1:]:
                    row_text = " | ".join(row)
                    paras.append(make_para(parapr_body, parse_inline(row_text)))
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

    # ── 표3 (본문): 10행×2열 ──
    # 구조: Row0=섹션1, Row1=배경목적(고려사항), Row2=배경목적(입력),
    #        Row3=목표방법(고려사항), Row4=목표방법(입력),
    #        Row5=예상결과(고려사항), Row6=예상결과(입력),
    #        Row7=파급효과(고려사항), Row8=파급효과(입력),
    #        Row9=참고자료
    if len(tables) >= 4:
        tbl3 = tables[3]
        trs = tbl3.findall('hp:tr', NS)

        # 섹션→행 매핑: 내용이 들어갈 행의 col=1 셀
        section_row_map = {
            "1": (0, 1),   # Row 0, Cell index 1
            "2": (2, 0),   # Row 2, Cell index 0 (1 cell only, col=1)
            "3": (4, 0),   # Row 4, Cell index 0
            "4": (6, 0),   # Row 6, Cell index 0
            "5": (8, 0),   # Row 8, Cell index 0
            "6": (9, 1),   # Row 9, Cell index 1
        }

        for sec_key, (row_idx, cell_idx) in section_row_map.items():
            if sec_key not in data['sections']:
                continue

            row = trs[row_idx]
            cells = row.findall('hp:tc', NS)

            if cell_idx >= len(cells):
                continue

            tc = cells[cell_idx]
            content_lines = data['sections'][sec_key]

            # 본문 문단 생성
            new_paras = md_to_paras(content_lines, CHARPR_BODY, PARAPR_BODY)

            if not new_paras:
                new_paras = [make_para(PARAPR_BODY, [(CHARPR_BODY, "")])]

            # 셀 내용 교체
            replace_cell_content(tc, new_paras, NS)

    # 4) 본문 대형 표(표3)의 pageBreak를 CELL로 변경 (페이지 넘김 허용)
    if len(tables) >= 4:
        tables[3].set('pageBreak', 'CELL')

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
