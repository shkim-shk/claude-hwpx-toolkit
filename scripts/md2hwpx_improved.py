#!/usr/bin/env python3
"""
Markdown to HWPX converter.
Uses new_reference.hwpx as a style template and converts markdown content
into a styled hwpx document.

All style IDs are read dynamically from the reference file, so if you
modify styles in the reference hwpx, the converter picks them up automatically.
"""

import os
import re
import shutil
import sys
import tempfile
import zipfile
from datetime import datetime
from xml.sax.saxutils import escape as xml_escape


# ── XML Namespaces ──────────────────────────────────────────────────────────
NS_DECL = (
    'xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" '
    'xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" '
    'xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" '
    'xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" '
    'xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" '
    'xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" '
    'xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" '
    'xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" '
    'xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" '
    'xmlns:dc="http://purl.org/dc/elements/1.1/" '
    'xmlns:opf="http://www.idpf.org/2007/opf/" '
    'xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" '
    'xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" '
    'xmlns:epub="http://www.idpf.org/2007/ops" '
    'xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"'
)

LINESEG = (
    '<hp:linesegarray>'
    '<hp:lineseg textpos="0" vertpos="0" vertsize="1000" textheight="1000" '
    'baseline="850" spacing="300" horzpos="0" horzsize="0" flags="393216"/>'
    '</hp:linesegarray>'
)

TABLE_WIDTH = 51024
TABLE_CELL_HEIGHT = 850
TABLE_CELL_MARGIN_LEFT_RIGHT = 141
TABLE_CELL_MARGIN_TOP_BOTTOM = 113
TABLE_BODY_BORDER_FILL_ID = "5"
TABLE_HEADER_BORDER_FILL_ID = "6"


# ── Reference Style Extractor ──────────────────────────────────────────────

# Map from our style keys to the style names in the reference hwpx
STYLE_NAME_MAP = {
    "title":      "Heading 1",
    "heading2":   "heading 2",
    "heading3":   "heading 3",
    "heading4":   "heading 4",
    "heading5":   "heading 5",
    "heading6":   "heading 6",
    "body":       "Body Text",
    "first_para": "First Paragraph",
    "block_text": "Block Text",
    "source_code":"Source Code",
    "table_cell": "Compact",
    "bullet":     "Body Text",
}


def extract_styles_from_reference(ref_hwpx_path):
    """Read style definitions (styleIDRef, paraPrIDRef, charPrIDRef) from reference hwpx.

    Returns:
        styles: dict mapping style key -> (styleIDRef, paraPrIDRef, charPrIDRef)
        inline_chars: dict with 'bold', 'italic', 'bold_italic' charPrIDRef
        sec_pr: the <hp:secPr>...</hp:secPr> XML string from section0.xml
        table_border_fill: borderFillIDRef for tables
        cell_border_fill: borderFillIDRef for table cells
    """
    with zipfile.ZipFile(ref_hwpx_path, 'r') as zf:
        header_xml = zf.read('Contents/header.xml').decode('utf-8')
        section_xml = zf.read('Contents/section0.xml').decode('utf-8')

    # Extract styles by name
    styles = {}
    for key, name in STYLE_NAME_MAP.items():
        pattern = re.compile(
            r'<hh:style\s+id="(\d+)"\s+type="\w+"\s+name="'
            + re.escape(name)
            + r'"\s+engName="[^"]*"\s+paraPrIDRef="(\d+)"\s+charPrIDRef="(\d+)"'
        )
        m = pattern.search(header_xml)
        if m:
            styles[key] = (m.group(1), m.group(2), m.group(3))
        else:
            print(f"Warning: style '{name}' not found in reference", file=sys.stderr)

    # Find bold/italic charPr IDs
    # Get body text charPr height as reference
    body_char_pr = styles.get("body", ("0", "0", "0"))[2]
    body_height = "1000"
    height_match = re.search(
        r'<hh:charPr\s+id="' + body_char_pr + r'"[^>]*height="(\d+)"',
        header_xml
    )
    if height_match:
        body_height = height_match.group(1)

    inline_chars = {
        'bold': body_char_pr,
        'italic': body_char_pr,
        'bold_italic': body_char_pr,
    }

    # Search all charPr for matching height with bold/italic
    for m in re.finditer(
        r'<hh:charPr\s+id="(\d+)"[^>]*height="' + body_height + r'"[^>]*>(.*?)</hh:charPr>',
        header_xml, re.DOTALL
    ):
        cid = m.group(1)
        body = m.group(2)
        has_bold = '<hh:bold' in body
        has_italic = '<hh:italic' in body
        if has_bold and has_italic:
            inline_chars['bold_italic'] = cid
        elif has_bold and not has_italic:
            inline_chars['bold'] = cid
        elif has_italic and not has_bold:
            inline_chars['italic'] = cid

    # Extract secPr from section0.xml
    sec_pr_match = re.search(r'<hp:secPr[^>]*>.*?</hp:secPr>', section_xml, re.DOTALL)
    sec_pr = sec_pr_match.group() if sec_pr_match else ''

    # Extract table borderFillIDRef from section0.xml
    tbl_match = re.search(r'<hp:tbl[^>]*borderFillIDRef="(\d+)"', section_xml)
    table_border_fill = tbl_match.group(1) if tbl_match else "4"

    cell_match = re.search(r'<hp:tc[^>]*borderFillIDRef="(\d+)"', section_xml)
    cell_border_fill = cell_match.group(1) if cell_match else "5"

    custom_table_fills = {
        'body': TABLE_BODY_BORDER_FILL_ID,
        'header': TABLE_HEADER_BORDER_FILL_ID,
    }

    return styles, inline_chars, sec_pr, table_border_fill, cell_border_fill, custom_table_fills


# ── Markdown Parser ─────────────────────────────────────────────────────────

def parse_inline(text):
    """Parse inline markdown (bold, italic, links) into a list of (text, format) tuples."""
    # Remove markdown link syntax: [text](url) -> text
    text = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', text)
    # Remove reference-style link markers like \[[pubs.acs]\]
    text = re.sub(r'\\\[([^\]]*)\\\]', '', text)
    text = re.sub(r'\[([^\]]*)\]\s*$', '', text)
    text = re.sub(r'\[[^\]]*\]\([^)]*\)', '', text)

    # Drop paragraphs that are just formatting markers left over from markdown cleanup.
    if text.strip() in {'*', '**', '***', '_', '__', '___'}:
        return []

    segments = []
    pattern = re.compile(r'(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)')

    last_end = 0
    for m in pattern.finditer(text):
        if m.start() > last_end:
            normal_text = text[last_end:m.start()]
            if normal_text:
                segments.append((normal_text, 'normal'))

        if m.group(2):
            segments.append((m.group(2), 'bold_italic'))
        elif m.group(3):
            segments.append((m.group(3), 'bold'))
        elif m.group(4):
            segments.append((m.group(4), 'italic'))

        last_end = m.end()

    if last_end < len(text):
        remaining = text[last_end:]
        if remaining:
            segments.append((remaining, 'normal'))

    if not segments:
        segments.append((text, 'normal'))

    return segments


def parse_markdown(md_text):
    """Parse markdown text into a list of block elements."""
    lines = md_text.split('\n')
    blocks = []
    i = 0

    while i < len(lines):
        line = lines[i]

        if not line.strip():
            if blocks and blocks[-1]['type'] != 'empty':
                blocks.append({'type': 'empty'})
            i += 1
            continue

        if re.match(r'^-{3,}\s*$', line.strip()):
            blocks.append({'type': 'hr'})
            i += 1
            continue

        heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)
        if heading_match:
            level = len(heading_match.group(1))
            text = heading_match.group(2).strip()
            # Clean up inline styling from headings so it doesn't reset template font size
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
            text = re.sub(r'\*(.*?)\*', r'\1', text)
            text = re.sub(r'__(.*?)__', r'\1', text)
            text = re.sub(r'_(.*?)_', r'\1', text)
            blocks.append({'type': 'heading', 'level': level, 'text': text})
            i += 1
            continue
            
        # Check for implicit bold headings (e.g. **1. Title**, **1) Title**, **(1) Title**, **첫째, Title**)
        # and treat them as actual headings to get font sizing.
        implicit_head_match = re.match(r'^\*\*((\d+\.)|(\d+\))|(\(\d+\))|(첫째,)|(둘째,)|(셋째,)|(넷째,))\s*(.+)\*\*$', line.strip())
        if implicit_head_match:
            prefix = implicit_head_match.group(1)
            content = implicit_head_match.group(9)
            # determine level from prefix type
            if re.match(r'^\d+\.$', prefix):
                level = 3  # equivalent to ### 
            elif re.match(r'^\d+\)$', prefix):
                level = 4  # equivalent to ####
            elif re.match(r'^\(\d+\)$', prefix):
                level = 5  # equivalent to #####
            else:
                level = 5  # 첫째, 둘째, etc
                
            text = f"{prefix} {content}"
            # Clean up any inner bolding
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
            text = re.sub(r'\*(.*?)\*', r'\1', text)
            blocks.append({'type': 'heading', 'level': level, 'text': text})
            i += 1
            continue

        if line.strip().startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1
            blocks.append({'type': 'code', 'text': '\n'.join(code_lines)})
            continue

        if '|' in line and i + 1 < len(lines) and re.match(r'^[\s|:-]+$', lines[i + 1]):
            header_cells = [c.strip() for c in line.strip().strip('|').split('|')]
            i += 2
            rows = [header_cells]
            while i < len(lines) and '|' in lines[i] and lines[i].strip():
                row_cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                rows.append(row_cells)
                i += 1
            blocks.append({'type': 'table', 'rows': rows})
            continue

        if line.strip().startswith('>'):
            quote_lines = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                quote_lines.append(re.sub(r'^>\s*', '', lines[i]))
                i += 1
            blocks.append({'type': 'blockquote', 'text': ' '.join(quote_lines)})
            continue

        list_match = re.match(r'^(\s*)([-*]|\d+\.)\s+(.+)$', line)
        if list_match:
            indent, marker, text = list_match.groups()
            prefix = indent + marker + ' '
            blocks.append({'type': 'list_item', 'prefix': prefix, 'text': text.strip()})
            i += 1
            continue

        para_lines = []
        while i < len(lines) and lines[i].strip() and not re.match(r'^#{1,6}\s', lines[i]) \
                and not re.match(r'^\*\*((\d+\.)|(\d+\))|(\(\d+\))|(첫째,)|(둘째,)|(셋째,)|(넷째,))\s*(.+)\*\*$', lines[i].strip()) \
                and not re.match(r'^(\s*(?:[-*]|\d+\.)\s+)', lines[i]) \
                and not lines[i].strip().startswith('```') \
                and not lines[i].strip().startswith('>') \
                and not (('|' in lines[i]) and i + 1 < len(lines) and re.match(r'^[\s|:-]+$', lines[i + 1])) \
                and not re.match(r'^-{3,}\s*$', lines[i].strip()):
            para_lines.append(lines[i])
            i += 1
        if para_lines:
            blocks.append({'type': 'paragraph', 'text': ' '.join(para_lines)})

    return blocks


# ── HWPX XML Generator ─────────────────────────────────────────────────────

class HwpxGenerator:
    def __init__(self, styles, inline_chars, sec_pr, table_border_fill, cell_border_fill, custom_table_fills):
        self.styles = styles
        self.inline_chars = inline_chars
        self.sec_pr = sec_pr
        self.table_border_fill = table_border_fill
        self.cell_border_fill = cell_border_fill
        self.custom_table_fills = custom_table_fills
        self.para_id = 1000000
        self.table_id = 3000000
        self.is_first_para_after_heading = False

    def next_para_id(self):
        pid = self.para_id
        self.para_id += 1
        return pid

    def _char_pr_for_format(self, fmt, base_char_pr):
        if fmt == 'bold':
            return self.inline_chars['bold']
        elif fmt == 'italic':
            return self.inline_chars['italic']
        elif fmt == 'bold_italic':
            return self.inline_chars['bold_italic']
        return base_char_pr

    def _make_runs(self, text, base_char_pr):
        segments = parse_inline(text)
        runs = []
        for seg_text, fmt in segments:
            if not seg_text.strip() and not seg_text:
                continue
            char_pr = self._char_pr_for_format(fmt, base_char_pr)
            escaped = xml_escape(seg_text)
            runs.append(
                f'<hp:run charPrIDRef="{char_pr}">'
                f'<hp:t>{escaped}</hp:t>'
                f'</hp:run>'
            )
        return ''.join(runs)

    def _make_table_cell_runs(self, text, base_char_pr, make_header_bold=False):
        """Build table cell runs using the same inline markdown parser as body text."""
        segments = parse_inline(text)
        has_explicit_format = any(fmt != 'normal' for _, fmt in segments)

        if make_header_bold and not has_explicit_format:
            segments = [(text, 'bold')] if text else []

        runs = []
        for seg_text, fmt in segments:
            if not seg_text:
                continue
            char_pr = self._char_pr_for_format(fmt, base_char_pr)
            escaped = xml_escape(seg_text)
            runs.append(
                f'<hp:run charPrIDRef="{char_pr}">'
                f'<hp:t>{escaped}</hp:t>'
                f'</hp:run>'
            )
        return ''.join(runs)

    def make_paragraph(self, text, style_key, include_secpr=False):
        style_id, para_pr, char_pr = self.styles[style_key]
        pid = self.next_para_id()

        secpr_xml = ''
        col_ctrl = ''
        if include_secpr:
            secpr_xml = self.sec_pr
            col_ctrl = ('<hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" '
                        'colCount="1" sameSz="1" sameGap="0"/></hp:ctrl>')

        runs = self._make_runs(text, char_pr)

        return (
            f'<hp:p id="{pid}" paraPrIDRef="{para_pr}" styleIDRef="{style_id}" '
            f'pageBreak="0" columnBreak="0" merged="0">'
            f'<hp:run charPrIDRef="{char_pr}">'
            f'{secpr_xml}{col_ctrl}'
            f'</hp:run>'
            f'{runs}'
            f'{LINESEG}'
            f'</hp:p>'
        )

    def make_table(self, rows):
        if not rows or not rows[0]:
            return ''

        num_cols = max(len(row) for row in rows)
        num_rows = len(rows)

        table_width = TABLE_WIDTH
        col_width = table_width // num_cols
        row_height = TABLE_CELL_HEIGHT
        col_sz_xml = ''.join(
            f'<hp:colSz width="{col_width}" widthRelTo="ABSOLUTE"/>'
            for _ in range(num_cols)
        )

        tr_xml = ''
        for r_idx, row in enumerate(rows):
            tc_xml = ''
            for c_idx in range(num_cols):
                cell_text = row[c_idx].strip() if c_idx < len(row) else ''
                cell_para_id = 2000000 + r_idx * 100 + c_idx

                style_id, _para_pr, char_pr = self.styles["table_cell"]
                cell_runs = self._make_table_cell_runs(
                    cell_text,
                    char_pr,
                    make_header_bold=(r_idx == 0),
                )
                cell_border_fill = (
                    self.custom_table_fills['header'] if r_idx == 0
                    else self.custom_table_fills['body']
                )

                tc_xml += (
                    f'<hp:tc name="" header="{1 if r_idx == 0 else 0}" hasMargin="1" protect="0" '
                    f'editable="0" dirty="0" borderFillIDRef="{cell_border_fill}">'
                    f'<hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" '
                    f'vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" '
                    f'textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">'
                    f'<hp:p id="{cell_para_id}" paraPrIDRef="0" '
                    f'styleIDRef="{style_id}" pageBreak="0" columnBreak="0" merged="0">'
                    f'{cell_runs}'
                    f'{LINESEG}'
                    f'</hp:p>'
                    f'</hp:subList>'
                    f'<hp:cellAddr colAddr="{c_idx}" rowAddr="{r_idx}"/>'
                    f'<hp:cellSpan colSpan="1" rowSpan="1"/>'
                    f'<hp:cellSz width="{col_width}" height="{row_height}"/>'
                    f'<hp:cellMargin left="{TABLE_CELL_MARGIN_LEFT_RIGHT}" '
                    f'right="{TABLE_CELL_MARGIN_LEFT_RIGHT}" '
                    f'top="{TABLE_CELL_MARGIN_TOP_BOTTOM}" '
                    f'bottom="{TABLE_CELL_MARGIN_TOP_BOTTOM}"/>'
                    f'</hp:tc>'
                )
            tr_xml += f'<hp:tr>{tc_xml}</hp:tr>'

        table_xml = (
            f'<hp:tbl id="{self.table_id}" zOrder="0" numberingType="TABLE" '
            f'textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" '
            f'dropcapstyle="None" pageBreak="CELL" repeatHeader="1" '
            f'rowCnt="{num_rows}" colCnt="{num_cols}" cellSpacing="0" '
            f'borderFillIDRef="{self.custom_table_fills["body"]}" noAdjust="0">'
            f'<hp:sz width="{table_width}" widthRelTo="ABSOLUTE" '
            f'height="0" heightRelTo="ABSOLUTE" protect="0"/>'
            f'<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" '
            f'allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" '
            f'horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" '
            f'vertOffset="0" horzOffset="0"/>'
            f'<hp:outMargin left="0" right="0" top="141" bottom="141"/>'
            f'<hp:inMargin left="{TABLE_CELL_MARGIN_LEFT_RIGHT}" '
            f'right="{TABLE_CELL_MARGIN_LEFT_RIGHT}" '
            f'top="{TABLE_CELL_MARGIN_TOP_BOTTOM}" '
            f'bottom="{TABLE_CELL_MARGIN_TOP_BOTTOM}"/>'
            f'{col_sz_xml}'
            f'{tr_xml}'
            f'</hp:tbl>'
        )
        self.table_id += 1

        style_id, para_pr, char_pr = self.styles["body"]
        pid = self.next_para_id()
        return (
            f'<hp:p id="{pid}" paraPrIDRef="{para_pr}" styleIDRef="{style_id}" '
            f'pageBreak="0" columnBreak="0" merged="0">'
            f'<hp:run charPrIDRef="{char_pr}">{table_xml}</hp:run>'
            f'{LINESEG}'
            f'</hp:p>'
        )

    def make_code_block(self, text):
        lines = text.split('\n')
        result = []
        for line in lines:
            result.append(self.make_paragraph(line if line else ' ', "source_code"))
        return ''.join(result)

    def generate_section(self, blocks):
        paragraphs = []
        first = True

        for block in blocks:
            btype = block['type']

            if btype == 'heading':
                level = block['level']
                style_map = {
                    1: "title", 2: "heading2", 3: "heading3",
                    4: "heading4", 5: "heading5", 6: "heading6",
                }
                style_key = style_map.get(level, "heading6")

                if first:
                    paragraphs.append(self.make_paragraph(block['text'], style_key, include_secpr=True))
                    first = False
                else:
                    paragraphs.append(self.make_paragraph(' ', "body"))
                    paragraphs.append(self.make_paragraph(block['text'], style_key))
                self.is_first_para_after_heading = True

            elif btype == 'hr':
                paragraphs.append(self.make_paragraph(' ', "body"))
                self.is_first_para_after_heading = False

            elif btype == 'empty':
                if not first and not self.is_first_para_after_heading:
                    paragraphs.append(self.make_paragraph(' ', "body"))
                self.is_first_para_after_heading = False

            elif btype == 'paragraph':
                if first:
                    paragraphs.append(self.make_paragraph(block['text'], "body", include_secpr=True))
                    first = False
                elif self.is_first_para_after_heading:
                    paragraphs.append(self.make_paragraph(block['text'], "first_para"))
                    self.is_first_para_after_heading = False
                else:
                    paragraphs.append(self.make_paragraph(block['text'], "body"))

            elif btype == 'blockquote':
                paragraphs.append(self.make_paragraph(block['text'], "block_text"))
                self.is_first_para_after_heading = False

            elif btype == 'list_item':
                paragraphs.append(self.make_paragraph(block['prefix'] + block['text'], "bullet"))
                self.is_first_para_after_heading = False

            elif btype == 'code':
                paragraphs.append(self.make_code_block(block['text']))
                self.is_first_para_after_heading = False

            elif btype == 'table':
                paragraphs.append(self.make_table(block['rows']))
                self.is_first_para_after_heading = False

        if not paragraphs:
            paragraphs.append(self.make_paragraph(' ', "body", include_secpr=True))

        content = ''.join(paragraphs)
        return (
            f'<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'
            f'<hs:sec {NS_DECL}>'
            f'{content}'
            f'</hs:sec>'
        )


# ── Content HPF Generator ──────────────────────────────────────────────────

def generate_content_hpf(title=""):
    now = datetime.now()
    created = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    return (
        f'<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'
        f'<opf:package {NS_DECL} version="" unique-identifier="" id="">'
        f'<opf:metadata>'
        f'<opf:title xml:space="preserve">{xml_escape(title)}</opf:title>'
        f'<opf:language>ko</opf:language>'
        f'<opf:meta name="CreatedDate" content="text">{created}</opf:meta>'
        f'<opf:meta name="ModifiedDate" content="text">{created}</opf:meta>'
        f'</opf:metadata>'
        f'<opf:manifest>'
        f'<opf:item id="header" href="Contents/header.xml" media-type="application/xml"/>'
        f'<opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/>'
        f'<opf:item id="settings" href="settings.xml" media-type="application/xml"/>'
        f'</opf:manifest>'
        f'<opf:spine>'
        f'<opf:itemref idref="header" linear="yes"/>'
        f'<opf:itemref idref="section0" linear="yes"/>'
        f'</opf:spine>'
        f'</opf:package>'
    )


# ── Header Patchers ────────────────────────────────────────────────────────

def patch_header_for_tables(header_path, custom_table_fills=None):
    """Keep reference styles intact and only add explicit table border fills."""
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Ensure table border fills are visually explicit.
    border_fill_match = re.search(r'<hh:borderFills\s+itemCnt="(\d+)">(.*?)</hh:borderFills>', content, re.DOTALL)
    if border_fill_match:
        item_cnt = int(border_fill_match.group(1))
        border_fill_body = border_fill_match.group(2)

        def _make_border_fill(fill_id, face_color=None):
            fill_xml = ''
            if face_color:
                fill_xml = (
                    '<hc:fillBrush>'
                    f'<hc:winBrush faceColor="{face_color}" hatchColor="#000000" alpha="0"/>'
                    '</hc:fillBrush>'
                )
            return (
                f'<hh:borderFill id="{fill_id}" threeD="0" shadow="0" '
                'centerLine="NONE" breakCellSeparateLine="0">'
                '<hh:slash type="NONE" Crooked="0" isCounter="0"/>'
                '<hh:backSlash type="NONE" Crooked="0" isCounter="0"/>'
                '<hh:leftBorder type="SOLID" width="0.12 mm" color="#000000"/>'
                '<hh:rightBorder type="SOLID" width="0.12 mm" color="#000000"/>'
                '<hh:topBorder type="SOLID" width="0.12 mm" color="#000000"/>'
                '<hh:bottomBorder type="SOLID" width="0.12 mm" color="#000000"/>'
                '<hh:diagonal type="NONE" width="0.1 mm" color="#000000"/>'
                f'{fill_xml}'
                '</hh:borderFill>'
            )

        custom_fills = []
        if custom_table_fills:
            body_fill_id = custom_table_fills['body']
            header_fill_id = custom_table_fills['header']
            if f'id="{body_fill_id}"' not in border_fill_body:
                custom_fills.append(_make_border_fill(body_fill_id))
            if f'id="{header_fill_id}"' not in border_fill_body:
                custom_fills.append(_make_border_fill(header_fill_id, face_color="#D9D9D9"))

        if custom_fills:
            new_border_fills = (
                f'<hh:borderFills itemCnt="{item_cnt + len(custom_fills)}">'
                f'{border_fill_body}{"".join(custom_fills)}'
                '</hh:borderFills>'
            )
            content = (
                content[:border_fill_match.start()]
                + new_border_fills
                + content[border_fill_match.end():]
            )

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)


# ── Main Converter ─────────────────────────────────────────────────────────

def convert_md_to_hwpx(md_path, reference_hwpx_path, output_hwpx_path):
    """Convert a markdown file to hwpx using the reference template's styles."""

    # Read styles from reference
    styles, inline_chars, sec_pr, table_bf, cell_bf, custom_table_fills = extract_styles_from_reference(reference_hwpx_path)

    # Read markdown
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    blocks = parse_markdown(md_text)

    title = ""
    for block in blocks:
        if block['type'] == 'heading':
            title = block['text']
            break

    # Generate section0.xml
    gen = HwpxGenerator(styles, inline_chars, sec_pr, table_bf, cell_bf, custom_table_fills)
    section_xml = gen.generate_section(blocks)

    content_hpf = generate_content_hpf(title)

    with tempfile.TemporaryDirectory() as tmpdir:
        extract_dir = os.path.join(tmpdir, 'extracted')
        with zipfile.ZipFile(reference_hwpx_path, 'r') as zf:
            zf.extractall(extract_dir)

        # Replace section0.xml
        with open(os.path.join(extract_dir, 'Contents', 'section0.xml'), 'w', encoding='utf-8') as f:
            f.write(section_xml)

        # Replace content.hpf
        with open(os.path.join(extract_dir, 'Contents', 'content.hpf'), 'w', encoding='utf-8') as f:
            f.write(content_hpf)

        # Keep reference styles and only add explicit table border fills
        header_path = os.path.join(extract_dir, 'Contents', 'header.xml')
        patch_header_for_tables(header_path, custom_table_fills=custom_table_fills)

        # Remove preview files (regenerated by Hancom on open)
        preview_dir = os.path.join(extract_dir, 'Preview')
        if os.path.exists(preview_dir):
            shutil.rmtree(preview_dir)

        # Create hwpx (zip); mimetype must be first entry, uncompressed
        with zipfile.ZipFile(output_hwpx_path, 'w', zipfile.ZIP_DEFLATED) as zf:
            mimetype_path = os.path.join(extract_dir, 'mimetype')
            zf.write(mimetype_path, 'mimetype', compress_type=zipfile.ZIP_STORED)

            for root, dirs, files in os.walk(extract_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    arc_name = os.path.relpath(full_path, extract_dir)
                    if arc_name == 'mimetype':
                        continue
                    zf.write(full_path, arc_name)

    print(f"Created: {output_hwpx_path}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 md2hwpx.py <markdown_file> [output.hwpx] [reference.hwpx]")
        print()
        print("Converts a markdown file to hwpx format using styles from the reference template.")
        print()
        print("Arguments:")
        print("  markdown_file    Input markdown file to convert")
        print("  output.hwpx      Output file path (default: <input_name>.hwpx)")
        print("  reference.hwpx   Reference template (default: new_reference.hwpx in same dir)")
        sys.exit(1)

    md_path = sys.argv[1]
    if not os.path.exists(md_path):
        print(f"Error: Markdown file not found: {md_path}")
        sys.exit(1)

    script_dir = os.path.dirname(os.path.abspath(__file__))

    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        base = os.path.splitext(os.path.basename(md_path))[0]
        output_path = os.path.join(os.path.dirname(md_path) or '.', f"{base}.hwpx")

    if len(sys.argv) >= 4:
        ref_path = sys.argv[3]
    else:
        ref_path = os.path.join(script_dir, 'new_reference.hwpx')

    temp_ref_dir = None
    if len(sys.argv) < 4 and not os.path.exists(ref_path):
        import tempfile
        import base64
        import atexit
        
        # fallback to embedded template
        temp_ref_dir = tempfile.mkdtemp()
        ref_path = os.path.join(temp_ref_dir, 'embedded_reference.hwpx')
        
        with open(ref_path, "wb") as fb:
            fb.write(base64.b64decode(EMBEDDED_TEMPLATE_B64))
            
        def _cleanup():
            import shutil
            shutil.rmtree(temp_ref_dir, ignore_errors=True)
        atexit.register(_cleanup)
        
    elif not os.path.exists(ref_path):
        print(f"Error: Reference hwpx not found: {ref_path}")
        sys.exit(1)

    convert_md_to_hwpx(md_path, ref_path, output_path)





# Embedded Reference Template (Base64)
EMBEDDED_TEMPLATE_B64 = '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IECAAAECBAgQEKh9BwgQIECAAAECBAhUISBQV4HnUAIECBAgQIAAAQICte8AAQIECBAgQIAAgSoEBOoq8BxKgAABAgQIECBAQKD2HSBAgAABAgQIECBQhYBAXQWeQwkQIECAAAECBAgI1L4DBAgQIECAAAECBKoQEKirwHMoAQIECBAgQIAAAYHad4AAAQIECBAgQIBAFQICdRV4DiVAgAABAgQIECAgUPsOECBAgAABAgQIEKhCQKCuAs+hBAgQIECAAAECBARq3wECBAgQIECAAAECVQgI1FXgOZQAAQIECBAgQICAQO07QIAAAQIECBAgQKAKAYG6CjyHEiBAgAABAgQIEBCofQcIECBAgAABAgQIVCEgUFeB51ACBAgQIECAAAECArXvAAECBAgQIECAAIEqBATqKvAcSoAAAQIECBAgQECg9h0gQIAAAQIECBAgUIWAQF0FnkMJECBAgAABAgQICNS+AwQIECBAgAABAgSqEBCoq8BzKAECBAgQIECAAAGB2neAAAECBAgQIECAQBUCAnUVeA4lQIAAAQIECBAgIFD7DhAgQIAAAQIECBCoQkCgrgLPoQQIECBAgAABAgQEat8BAgQIECBAgAABAlUICNRV4DmUAAECBAgQIECAgEDtO0CAAAECBAgQIECgCgGBugo8hxIgQIAAAQIECBAQqH0HCBAgQIAAAQIECFQhIFBXgedQAgQIECBAgAABAgK17wABAgQIECBAgACBKgQE6irwHEqAAAECBAgQIEBAoPYdIECAAAECBAgQIFCFgEBdBZ5DCRAgQIAAAQIECAjUvgMECBAgQIAAAQIEqhAQqKvAcygBAgQIECBAgAABgdp3gAABAgQIECBAgEAVAgJ1FXgOJUCAAAECBAgQICBQ+w4QIECAAAECBAgQqEJAoK4Cz6EECBAgQIAAAQIEBGrfAQIECBAgQIAAAQJVCAjUVeA5lAABAgQIECBAgIBA7TtAgAABAgQIECBAoAoBgboKPIcSIECAAAECBAgQEKh9BwgQIECAAAECBAhUISBQV4HnUAIECBAgQIAAAQICte8AAQIECBAgQIAAgSoEBOoq8BxKgAABAgQIECBAQKD2HSBAgAABAgQIECBQhYBAXQWeQwkQIECAAAECBAgI1L4DBAgQIECAAAECBKoQEKirwHMoAQIECBAgQIAAAYHad4AAAQIECBAgQIBAFQICdRV4DiVAgAABAgQIECAgUPsOECBAgAABAgQIEKhCQKCuAs+hBAgQIECAAAECBARq3wECBAgQIECAAAECVQgI1FXgOZQAAQIECBAgQICAQO07QIAAAQIECBAgQKAKAYG6CjyHEiBAgAABAgQIEBCofQcIECBAgAABAgQIVCEgUFeB51ACBAgQIECAAAECArXvAAECBAgQIECAAIEqBATqKvAcSoAAAQIECBAgQECg9h0gQIAAAQIECBAgUIWAQF0FnkMJECBAgAABAgQICNS+AwQIECBAgAABAgSqEBCoq8BzKAECBAgQIECAAAGB2neAAAECBAgQIECAQBUCAnUVeA4lQIAAAQIECBAgIFD7DhAgQIAAAQIECBCoQkCgrgLPoQQIECBAgAABAgQEat8BAgQIECBAgAABAlUICNRV4DmUAAECBAgQIECAgEDtO0CAAAECBAgQIECgCgGBugo8hxIgQIAAAQIECBAQqH0HCBAgQIAAAQIECFQhIFBXgedQAgQIECBAgAABAgK17wABAgQIECBAgACBKgQE6irwHEqAAAECBAgQIEBAoG6S78CgQYPq7kq///77+OGHH+quXzpEgAABAgQIEBgeAYF6eLSG2vf000+PVVZZJfr27dv2t/jii8f2228fzz33XGy55ZZt6yv7rLXWWnHdddcN1VJtPu64445DnO/ll18uDZ955pkx8cQTxyKLLBLfffddbU5WRSuffvpp/O1vf4vpppsubrzxxipacigBAgQIECBAYNQL9GppXUZ9N3puDz744IOYaqqp2i7giCOOiL333rvt87bbbhvnnHNO+Tz11FPHa6+9Fr17927bXus3K6ywQtx9992l2ccffzwWWGCBWHHFFeOuu+4q6x566KFYbLHFan3aLrX3xhtvxHHHHRcZ8L/66qtyzLXXXhu//OUvu3S8nQgQIECAAAEC9ShghrrKUZlyyilj3HHHbWtlttlma3ufb37xi1+0fZ5++um7NUzniaaddtq281Xe7LbbbiX0r7322mUGu7J+ZL9eeumlMfvss8cEE0wwsk/tfAQIECBAgACBbhMQqGtAO8YYY7S1Mvroo7e9zzc/t639jm+99VZ8++237Ve1vf/www/j888/b/s89Jsff/wx8vhc2p+/V69eZd2GG24Y7733XlxzzTUx2midD/n777/faUlI1mC//vrrkeca0SVn7nfZZZdYfvnlR7QJxxEgQIAAAQIE6k6g83RVd11tzA5lHfZkk00Wq666apm5PfjggyOrcAYOHBh77rlnqTNeaKGFYtJJJ40lllgiHnnkkSEg9t9//zL7PMMMM5TZ8KeeemqI7X/9618jZ8Zz5jr/MnhnDffMM8/ctu6EE06I+eabL7IkJWfczz///LY2XnnllVh99dVjvPHGi5VXXrnUYmd/smwk/5544om2fbv6Zuyxx+7qrvYjQIAAAQIECNS9gEBd4yH67LPP4qOPPmr7+/LLLzs9wz/+8Y/IGwnnnHPOeP7552O11VaLgw46KM4777zYZJNN4u9//3scddRR8eabb8Ycc8wRWf+83nrrRT4dI5cMwocffnh88skn8eCDD8ahhx4aTz755BDnO+CAA0pIfvfddyP/chY8a5ZzlriyLmeOt9hii5hiiikibxjMEpGckc465+zTzTffXF4zXOcMc9ZmP/roo5Ez33mMhQABAgQIECDQzAICdY1H/7e//W3MMsssbX9HHnlkh2fIsPo///M/ZdtKK61UXpdddtnymiH61ltvLe+vvPLKUsaRbebyzjvvRJaA5OPm9ttvv7Ju6aWXLrPXv/71r2ODDTYo6/Kfyv2mOUM99DLNNNO0rTrllFNin332iWwnly+++KLMZN92223x6quvlnVLLrlkea3c0JilH3PPPXeZ1S4b/EOAAAECBAgQaFIBgbrGA3/55ZdHzkpX/g455JAOz/DMM8+UmeXcmLPTud8dd9xR9n3xxRfj6KOPLqUWO++8c6l9bj/znI++e+GFF+Lrr78u+7e/EbFPnz5lXf5TqaGuvLZf17ZT65ss88il/c2V33zzTYw55phlff5TKdNo/4SSDN4WAgQIECBAgECzC/z/u+maXWIkX39l5jdPm7PV+TSQ/MtnV2cA3mijjWLhhReOPfbYo5RmjDPOOG09zJnnp59+uu1zPmO6Fkv74J3tZc10PpEjg3M+7i+XymvebLnGGmuUdf4hQIAAAQIECDSzgEA9ikY/66YrSz7LerPNNqt8LK9nnXVW7LDDDuWGw/79+8fuu+8eWcNcWWadddbK27ZnOretqNGbnI1+4IEHYquttopzzz23tJolKFk3ffHFF8ckk0xSozNphgABAgQIECDQcwUE6hqMXftHyVXqlivNdrYtf3Bl8sknLzcv5g1+WcKRNx7m/nmj4r///e/yPm8ezF8UrJR3ZLt5jgUXXLA8+ePjjz8uNwlWztf+Jsj2565sH7p/lfVDv1b2Gzx4cHmUXtZr55NENt1008hfg6yUgAx9XFc+t+9X+/ddOdY+BAgQIECAAIF6E1BDXeWI5NMw8hF3lSVvGGy/tP+cT/+oLFlekY+jqyyLLrpo/P73v4/8afIMzwMGDCibckY4b/7LJ21UlvzZ7iy9yCdw5JKPrjvjjDMinxqSQbyy5CP2Mhi370M+azqXSvv5PmfIc2m/rnJM/tJj/oz6vPPOG/PMM0+ps842ssZ6RJd8ukhlqfSn8tkrAQIECBAgQKDHCbQGLssICpx22mktffv2zZ9ub/trfaZ0y3bbbdfy7LPPtrSWcbS03iTYti33W2WVVVpaf267nLF1NrmltQ65bXvrs55bWss8Wlofbdey/vrrt7SG7pbWGwZbjj322Jbrr7++Zfzxx29prV1uaZ3Bbmmd2W1pfVxey1JLLdV2fOuzpEv7eZ7WJ3u0rLPOOi2tpSLlmEofW4NxS+tPoZe2Kutan0ndcvLJJ7e03oTY1lZreG55++23W1p/CKZtXWX/fM19DzzwwOGSa/3J8ZZ+/foN0d5EE03U0vrIvpbWMD9cbdmZAAECBAgQIFAvAr2yI60ByTIKBbJs4+WXX478wZSxxhqrrSd5M2D7n+nOZ0jnM6jb36CYO+cvGObzr+eff/7yPo/JH4upxbLrrrtGPlavsyXruiuP9OtsH+sJECBAgAABAo0sIFA38uhWeW35gzL5/OnWmfH485//HK2zyaWEJEtE8vna+R8B+cuMWQ5iIUCAAAECBAg0q4BA3awj34Xrzp8oX3vttUutdmvJSeSj8nLJWuvWUpMStPOGSgsBAgQIECBAoJkFBOpmHv1hXHs+geOvf/1r+Sn0vFEyf0Amb8DMkpP8VcX82fOcvbYQIECAAAECBJpZQKBu5tEfjmvPcN16E2R59nTrjYrDcaRdCRAgQIAAAQKNLSBQN/b4ujoCBAgQIECAAIFuFjDV2M3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBurHH19URIECAAAECBAh0s4BA3c3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBurHH19URIECAAAECBAh0s4BA3c3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBurHH19URIECAAAECBAh0s4BA3c3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBurHH19URIECAAAECBAh0s4BA3c3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBurHH19URIECAAAECBAh0s4BA3c3AmidAgAABAgQIEGhsAYG6scfX1REgQIAAAQIECHSzgEDdzcCaJ0CAAAECBAgQaGwBgbqxx9fVESBAgAABAgQIdLOAQN3NwJonQIAAAQIECBBobAGBuhvHt6WlJTr6y1N2tD7X1Xppf55s+7vvvov+/fvHjz/+WOtTDbO9H374IZ555pl49tlnh7mvHQgQIECAAAECPUVAoO7GkTrnnHOib9++Mdpoo5W/0UcfPX7zm9/EE088EX/6059i8sknb9s29dRTx957712Cdq26dM8998S8887bdo4M0uuuu24svvjisfPOO9fqNF1q54UXXogFF1yw9GeeeeaJmWeeuYTrLh1sJwIECBAgQIBAHQsI1N04ONtuu22ceuqpbWdYaKGF4uyzz44FFlggjjnmmNhhhx3atu22225x1FFHRa9evdrWVftmueWWi7/85S9tzeRs9fvvv18+v/fee23ru/vN4MGD45e//OUQM9Ovv/569OvXL3LW2kKAAAECBAgQ6MkCAnU3j97444/fdoYJJpig7X2++bltQ+xYxYdxxhlniKOvu+66uPTSS0uwH2JDN364+uqrY6ONNorPP/+8zErPOeec5WzvvPNOPPXUU914Zk0TIECAAAECBLpfQKDufuMunaH9zHTWOefMcpZrZPjMme4vvviitPPBBx/E9ttvH0svvXRMOumkseKKK0YG1soyaNCg2GWXXWK66aaLGWecMS644ILKpvI+g+3xxx8fRx55ZFl/7bXXxrLLLlva22yzzeKII44o5RhZknHWWWeVfR5//PEymzzNNNPEfPPNF6uttlpssMEG5a8rgXjjjTeOv/3tbzHeeOPF3HPPHdtss01pNz/PNddc5b1/CBAgQIAAAQI9VWCMntrxntjvDMWPPvpoW9fffvvttvft3+y4445lBvnCCy+MGWaYoQTevIkwy0UySOdxH330UVxxxRWlJvvBBx+MrFHOAJ1h+6KLLop11lmnBOdNN920rektttgiLrvssvjwww9jkkkmKevXXnvtEq4feOCByL+c0V500UXj8ssvj1133TVWX331WG+99eKNN94owT23ZVjP/hx00EEx2WSTtbXf1Tcvvvhi2XXNNdeM3r17d/Uw+xEgQIAAAQIE6lJAoB6Jw5J1wwcffHDbGSvBsm1F65vnn38+8mbGXFZaaaWYeOKJy/vzzz8/DjzwwMg2su74oYceKjPJuTFrlF999dWyX4bpXDI8zzTTTLHffvuVQFxWtv4z5ZRTlkBd+ZyveXNkLjkrfeaZZ5YwnYE62z399NNLmM7tCy+8cOTNk1NMMUWpxc4wnJ+HZ8k67ltuuaWc87jjjhueQ+1LgAABAgQIEKhLAYF6JA7L/PPPH9dcc03bGQ8//PDYf//92z7nmyyvqDw+b/PNNy9P6MjSjnxSyDfffFNmkd9888146623hgjn33//fTz22GNtbVWCbvtSkraNQ72p7FOZLa685m6VsJ3vP/7447bZ6fycwXp4l7///e8l0N9www2RJSQWAgQIECBAgEBPF1BDXWcjmKG5svzP//xP3HrrrTFgwIASQrP+OEst/vznP0dHYTxv+qssObtciyVnpfMJHbnkrHXWXGfJSP7HQdZRD8+S9dY5y57trLzyyuXQ++67b3iasC8BAgQIECBAoO4EzFDXyZBUZqUrQTO7dfHFF5ebDvN9lnhMNdVU8atf/Sry6RjXX399uckvt1WWvEGxsuQ+uVTazfcj8mMu+ezsU045JV577bXyhI4sLTn55JNL7fbYY4+dzXZpydntDOZ5Q+PAgQPj3HPPLU/4yP9YWGaZZbrUhp0IECBAgAABAvUoIFB386hUns6Rp2n/fujPX375ZenJ9NNPX5588dxzz5XQ2adPn/K0j3zcXd6sWAnKOUOdYbSy5Ez2HHPMEbPNNlu89NJLpfY5n/N89NFHV3aJd999NyrnaT+bXelXZV1lnzzw008/jXz6x7TTThsnnXRSjDXWWCXID0+YznKUfLpIlqrk35VXXtnWp3ziiIUAAQIECBAg0KMFWmcwLd0k8M9//rOltWQif0+8/LXWKre0PjKupbVOumXPPfdsaa2NbtvWerNgy1577dXSOovc8uSTT7a0Pt2jbVvrkzVaWsNwS+sj8VpafxSmJdvJda1P5Whpfaxe2W+ttdYq2x9++OGW1rrntmNbyzLK+9ancbTMPvvsbetbA3FL62PxWv71r3+1jDvuuG3rW2efW1p/ybDtc+uP0bS9r1xHvk444YQtrTc8dkmutU68wzaynXvvvbdLbdiJAAECBAgQIFCvAr2yY63BxlKHAq+88krkDPXQN+/ljHL7H4nJmeXWgNt2BfkUkJzhzlnlvJkx98+Z7xFdsgzljjvu6PDwvIkyf/nRQoAAAQIECBBoVgGBullHvovXfdddd8Wqq64au+++e2y55ZaRpR5fffVV5CPv8jnZzz77rB9n6aKl3QgQIECAAIHGFPCUj8Yc15pd1bfffhtZA52P6cslH7GXPyyTT+zYZJNNhOmaSWuIAAECBAgQ6KkCZqh76siNxH73798/8rnReUNkhuv8ufAFF1ywPLFjJHbDqQgQIECAAAECdSkgUNflsOgUAQIECBAgQIBATxFQ8tFTRko/CRAgQIAAAQIE6lJAoK7LYdEpAgQIECBAgACBniIgUPeUkdJPAgQIECBAgACBuhQQqOtyWHSKAAECBAgQIECgpwgI1D1lpPSTAAECBAgQIECgLgUE6rocFp0iQIAAAQIECBDoKQICdU8ZKf0kQIAAAQIECBCoSwGBui6HRacIECBAgAABAgR6ioBA3VNGSj8JECBAgAABAgTqUkCgrsth0SkCBAgQIECAAIGeIiBQ95SR0k8CBAgQIECAAIG6FBCo63JYdIoAAQIECBAgQKCnCAjUPWWk9JMAAQIECBAgQKAuBQTquhwWnSJAgAABAgQIEOgpAgJ1Txkp/SRAgAABAgQIEKhLAYG6LodFpwgQIECAAAECBHqKgEDdU0ZKPwkQIECAAAECBOpSQKCuy2HRKQIECBAgQIAAgZ4iIFD3lJHSTwIECBAgQIAAgboUEKjrclh0igABAgQIECBAoKcICNQ9ZaT0kwABAgQIECBAoC4FBOq6HBadIkCAAAECBAgQ6CkCAnVPGSn9JECAAAECBAgQqEsBgbouh0WnCBAgQIAAAQIEeoqAQN1TRko/CRAgQIAAAQIE6lJAoK7LYdEpAgQIECBAgACBniIgUPeUkdJPAgQIECBAgACBuhQQqOtyWHSKAAECBAgQIECgpwgI1D1lpPSTAAECBAgQIECgLgUE6rocFp0iQIAAAQIECBDoKQICdU8ZKf0kQIAAAQIECBCoSwGBui6HpfpOffnll/Hmm29W31AXWnj99ddj0KBBXdjTLgQIECBAgACBxhMQqLtpTC+88MKYf/75o1evXuVv5ZVXjttvvz1OOeWUmHnmmdvWr7/++vHwww9X3Ytdd921rc0777yznHummWaKRx55pOq2O2vg0UcfjUUWWaRcz1RTTRWHH354Z7taT4AAAQIECBBoWIFeLa1Lw17dKL6wU089NXbeeefSiwceeCCWXHLJ8v6AAw6IQw45pLx/4403YoYZZqi6pz/++GOMOeaYka8Z3LfffvvItjOsL7zwwlW3P3QDAwcOjHXWWScWWmihuOGGG+L555+P3r17l3NOOeWUQ+/uMwECBAgQIECgYQXGaNgrq4ML69OnT1sv2r8fe+yxO1zftnIE3ow22mgxxhhjxLfffhv5/oknnogBAwaU2eMRaG6Yh/z3v/+N008/PWadddbYbbfdYpZZZonBgwfHF198EQL1MPnsQIAAAQIECDSQgJKPOhnMV155JVZbbbVYdtllY955542c0c7ljjvuiDXXXLOsz5nsffbZJyr/U+HJJ5+MFVdcMSaZZJLYYIMNSpjOYy677LKyfqONNioz1Ndcc00suuii0bdv3/jLX/5SyjQmmGCC0lbuf9VVV8Xaa68dSy21VNm2+uqrR/79XClK9jPDdPtl6623jtlmm639Ku8JECBAgAABAg0vIFCPpCG+6KKL4sQTTyx/lbBcOfU333xTwvTTTz8d9957b0wxxRSx++67xzvvvBP9+vWL77//vqwfffTR48gjj4zrrruuzARnycXdd98d999/f2y33XaV5iLrsh9//PHIGufPP/+8lGZ88MEH5fPNN98chx56aORN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xqq8jUknnTRefPHFmHjiidvWtX/TUdvtt3f1/UknnRTXX399V3e3HwECBAgQIECg4QXMUNfBEF900UWxxBJLxDrrrFPKQH788cc49NBDy6z23HPPHausskp88MEHpadnnHFGzDjjjLHMMsvEww8/3Nb7Y445ppSAbLnllmXdFVdcEfPNN18sssgisfXWW8d4440X6623XplVPuCAA2LZZZeN1VdfPXKmO9vKmfRhLU8++WRcffXVsemmm5Zdhw7/wzredgIECBAgQIBAIwoI1CNhVO++++4SQjOIXnzxxUOc8YknnoitttoqNtxww/j9738fu+22W1x22WXxl7/8JRZbbLH44x//GLfffnv84x//iEcffTR22mmnWHrppUv9cs5KV5YsMXn66afjpZdeKqsyPD/zzDOlBGSTTTYpx2QYzqB+yCGHxGqrrRYHHXRQPPjggzHHHHOU7ZW2OnrNGu3f/e53cfbZZ8cYY/gfGx0ZWUeAAAECBAg0p4BAPRLGPW9MzJsS82/jjTce4ozXXXdd/PDDD3HffffFBRdcUEo38qa/ww47LCaZZJI477zzyv5ffPFF3HnnnZGz1zlrPdpoo8Uss8zS1taYY47Z9j7fZOjNGeRxxhmnzFxPPvnkZftbb71VXrM0pFIe8vnnn5f2yoZO/tl3331jgQUWKKH9nXfeKXvlzZDZHwsBAgQIECBAoJkFTDWOhNHPYDv66KOXM1VeK6fN2uZccpb4yCOPLO8zYG+22WZxySWXlLKPLMfI/XKWOJdvv/22vI7IPzkznaE6y0xyRnu66aaL/fbbb5hN5Ux6zrSfeOKJbfvmcTmjnuUkFgIECBAgQIBAswqYoe7Gkf/+++9L65XX/FB5MkZlXQbcXHJ2OgNuPopur732KmUfCy20ULz99ttlex6XM925ZOlHzgy/9tpr5XMG7AzhuVTaze0ZwivrK68Z6AcOHBh77713KR/JNrLOeljLlVdeGTkznX9ZnpJLBn5helhythMgQIAAAQKNLiBQd9MI53Oob7vtttJ6zuxmucdNN90UV111VVn3+OOPlxsQ+/btW2qo33vvvZh//vlLjfIGG2xQHomXx0811VSRTwTJ0pBpp502slb6hhtuKOUXWRqSTxLJYHvmmWeWdjMg33HHHWVdBuoMz+eee27cf//9ZXs++/o///lP7L777pE3MK6wwgqlrrps/Jl/sl57mmmmKX/5uL5cKmUkP3OYTQQIECBAgACBhhfo1Rq6/q/moOEvtb4v8OOPPy51zJW65nxOde/evUun830+Iq/yVI0M3+OPP34pAcn9h+cmwXxm9cwzz1yOyfrqTz/9NL766qsy673wwgvXN5LeESBAgAABAgTqUEANdZ0MSvsndmSXKmF66Pf5eeqpp86XESq3OP7448us9/PPP18C+ptvvhlzzjlnuQGyNOofAgQIECBAgACB4RIQqIeLq+fvvOOOO0aWiuRPoE8xxRQluN9yyy0x00wz9fyLcwUECBAgQIAAgVEgoORjFKA7JQECBAgQIECAQOMIuCmxccbSlRAgQIAAAQIECIwCAYF6FKA7JQECBAgQIECAQOMICNSNM5auhAABAgQIECBAYBQICNSjAN0pCRAgQIAAAQIEGkdAoG6csXQlBAgQIECAAAECo0BAoB4F6E5JgAABAgQIECDQOAICdeOMpSshQIAAAQIECBAYBQIC9ShAd0oCBAgQIECAAIHGERCoG2csXQkBAgQIECBAgMAoEBCoRwG6UxIgQIAAAQIECDSOgEDdOGPpSggQIECAAAECBEaBgEA9CtCdkgABAgQIECBAoHEEBOrGGUtXQoAAAQIECBAgMAoEBOpRgO6UBAgQIECAAAECjSMgUDfOWLoSAgQIECBAgACBUSAgUI8CdKckQIAAAQIECBBoHAGBunHG0pUQIECAAAECBAiMAgGBehSgOyUBAgQIECBAgEDjCAjUjTOWroQAAQIECBAgQGAUCAjUowDdKQkQIECAAAECBBpHQKBunLF0JQQIECBAgAABAqNAQKAeBehOSYAAAQIECBAg0DgCAnXjjKUrIUCAAAECBAgQGAUCAvUoQHdKAgQIECBAgACBxhEQqBtnLF0JAQIECBAgQIDAKBAQqEcBulMSIECAAAECBAg0joBA3Thj6UoIECBAgAABAgRGgcAYo+CcTtmBwODBg+OLL75o29K7d+/yPtdXlgkmmCAq6yvruvr6448/xssvvxwtLS0xxxxzxDPPPBO/+MUvYuyxx+5qE8PcL9seMGBA236TTTZZ9OrVq+2zNwQIECBAgACBRhQwQ10no/rhhx/GZpttFlNMMUWssMIK8cQTT8QjjzwSs802W1n3hz/8Id5///0R7u0+++xTgvTNN99cgvW8884bBxxwwAi319GBl112WelrXsNMM80U3377bUe7WUeAAAECBAgQaCgBM9R1MpzTTz99TDrppKU3hx9+eCy77LLx1VdfRc5QTzzxxHH66adHnz59Rri3E000UTl2rbXWihlnnDGOPvro6Nev3wi3N/SB3333XRx//PGRfc9zTTnllCM8mz502z4TIECAAAECBOpZwAx1nYzODz/8ELfccktMMskkscYaa5ReXXfddfHNN9+U4FsJ06eeemr87ne/i6mnnjqefPLJst9nn30WW221Vay//vqx3HLLxeabb17Wf/rpp7H22mvHhhtuGMcdd1zMPvvsMWjQoFh++eVL8M02c/vkk08e9957b6y66qox//zzl7KQc889NxZddNHYdtttY8UVV4ztt98+XnvttU61TjvttHjwwQdj//33L2Ue2RcLAQIECBAgQKAZBATqOhnlDKMZgEcbbbTYYIMNStDda6+9Su/WXHPN8nrQQQeVWeD8nOUfAwcOLOt33XXX+Prrr2PHHXcswXjuuecu63/1q1/F6KOPHnvvvXd8/PHHkbPTWeqRwTjDddZQZxjP5eyzz47XX3+9bHv22Wdjm222icUXXzx22WWXuOuuu2K88caLaaaZpuzb0T+bbrppnHzyySVM77HHHso9OkKyjgABAgQIEGhIAYG6Tob1+uuvLz3JmeRrr702rrnmmjKbnDf1rb766nHnnXfGwQcfHDvssENksN5iiy1iqaWWiptuuikuuuiiEqb/85//lDZWXnnl0sYdd9xR1t9///1lfQbxvDHxvffei9wnZ6uzTjtvJNx9991LoF9iiSXKPnnAKqusEvfcc085Nme1f+6GyLwBMcP3nnvuWWbVX3jhhXKcfwgQIECAAAECjS4gUNfJCN9www2lJyuttFJ5zZsSM+j27du3lGRkyM5w/eKLL8a+++4b5513Xtkvg3jOaudscpaITDjhhKVUo7L/YostFmeddVaZYc5ykNtuu60cl4E6yzyypCTDdD4FJGexV1tttRK287zZ9rHHHhu//vWvy+x2OXAY/2TwzieH5Ay4hQABAgQIECDQDAICdR2M8ksvvVTqofNxdpWyigzEueTsdC6PPfZYCao5g501zRdeeGFZ379//8jZ4XPOOSceffTRcjPj3XffXdrLmxzPOOOMyBKODNM5U3377beXmxtzljqf+JFLzirnbHYueSPkrbfeWkpIsm76ueeeKzPgY401Vtne0T+vvPJKaTe35eP4Ntlkk5+dze6oDesIECBAgAABAj1VQKAexSOXATTLOHLJ2eKspc6wfMIJJ5R1eePhRx99FBtvvHG5WXCuueaKnXbaqW3GeJFFFikz2VlPPcYYY0SWWuSj9nL9J598Umavs1QjQ2+uz1nvDMfjjDNOCdE5k5yPuPv8889j/PHHj1lmmSUefvjhEsKz/CODeH7+ueWSSy4p5SH51JB33nmnhPif2982AgQIECBAgEAjCfRq/TGOlka6oEa+li+//DLyaSCVR+BVrjVDcs5Sf/DBB6U8JEtAclizhCPXZyDPp4fkDYpZN52PuMsfiRl6yfU5u51lHnlDY5aEXHzxxWVG/MYbbxx69yE+v/322+UZ1D83kz3EAT4QIECAAAECBBpEwHOoe9BA5gxyR0uG5lzy2c+VJeutK+vzsXiVJR+VV3kEX2Vd5XXMMccsj+7L0J2P2svH72XN9nrrrVfZpdPX6aabrtNtNhAgQIAAAQIEGlnADHUjj+4IXFuWneQsddZmZ4BfZpllYuGFFy6lIyPQnEMIECBAgAABAg0vIFA3/BC7QAIECBAgQIAAge4UcFNid+pqmwABAgQIECBAoOEFBOqGH2IXSIAAAQIECBAg0J0CAnV36mqbAAECBAgQIECg4QUE6oYfYhdIgAABAgQIECDQnQICdXfqapsAAQIECBAgQKDhBQTqhh9iF0iAAAECBAgQINCdAgJ1d+pqmwABAgQIECBAoOEFBOqGH2IXSIAAAQIECBAg0J0CAnV36mqbAAECBAgQIECg4QUE6oYfYhdIgAABAgQIECDQnQICdXfqapsAAQIECBAgQKDhBQTqhh9iF0iAAAECBAgQINCdAgJ1d+pqmwABAgQIECBAoOEFBOqGH2IXSIAAAQIECBAg0J0CAnV36mqbAAECBAgQIECg4QUE6oYfYhdIgAABAgQIECDQnQICdXfqapsAAQIECBAgQKDhBQTqhh9iF0iAAAECBAgQINCdAgJ1d+pqmwABAgQIECBAoOEFBOqGH2IXSIAAAQIECBAg0J0CAnV36mqbAAECBAgQIECg4QUE6oYfYhdIgAABAgQIECDQnQICdXfqapsAAQIECBAgQKDhBQTqhh9iF0iAAAECBAgQINCdAgJ1d+pqmwABAgQIECBAoOEFBOqGH2IXSIAAAQIECBAg0J0CY3Rn49ruWOCFF16IE044IV599dWYbbbZYo899ohZZpml452HY+2nn34a33//fdsR44wzTnz99ddtn/PNJJNMEqOPPvoQ64b14bPPPovvvvsuxhxzzJhooonK7s8880zMPPPMkefojiXP984778RMM83UHc1rkwABAgQIECBQMwEz1DWj7FpDDzzwQCy00EJxyimnxE033RQnnnhizD///PHf//63aw38zF5PPPFELLLIIjHFFFPEbrvtFm+99Vb8+9//Lp9z3TnnnBODBg36mRY63nTXXXeVNlZZZZWyQ/4Hwbzzzhu///3vOz6girW33XZbrLfeenHYYYcN8R8HVTTpUAIECBAgQIBAtwr0amlduvUMGh9CYMEFF4wMvkMvyy23XNx9991Drx7uz7/85S/j+uuvjwsuuCA233zzcvwYY4wRP/zwQwwYMCAmnXTS4W4zD8g2su+PPPJIfPvtt3HIIYfEGmusEUsttdQItdfRQeedd17ssssuceONN8ayyy7b0S7WESBAgAABAgTqTsAM9UgcksGDB8dTTz3V4Rn79+8ftfhvm9FG+78hrbzmyXr16lXOWVmXs+L9+vWLX/3qV2VmPMsr/vCHP8R2220Xv/jFL+Lggw8u+//tb38rn9dZZ50SyMvK1n+OOOKI+Ne//hU333xznHvuuWW2OvdZeumlY8oppyzbss0//elPsfrqq8fyyy8fyyyzTGy11VaVJn7y+sEHH8TWW29dSmDefffd+PLLL3+yjxUECBAgQIAAgXoUEKhH4qiMNdZYMe6443Z4xoknnrgt+Ha4w3CuzJKSDLD5176u+sMPPyw123/84x9jhhlmiAMOOCCuvfbaOO6442KbbbYp5SgHHXRQWffnP/85dt555zj++OOH6Nvaa68dWUOdNc4ZmPN9lqwcc8wxke3nuS+99NLyeddddy2zzffff//PlohUZudnnHHGEuizby+++OJwXrXdCRAgQIAAAQIjX0CgHonmOVO86aabdnjGSnlGhxtHYGWG45NPPrn8tb8JMWuqf/zxx7jkkkvioYceKmUmCy+8cOy7777x5ptvlpKOPN2dd95ZzjrnnHOWmw+z5KOy5H8YVJbK+/nmmy+WWGKJUhqSNzE+99xzZZe8CbJSZjJw4MDKYT95zdryXLbddtsy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CBAgQKAuBQTqUTAsd955Z+y7775x2223xYknntgWqE866aRSAvLGG2/EKaecEn369Ck1xf/+979jwIABccQRR5Qgml3ee++94/TTT4999tmn7Pdzl/Hxxx/Hk08+Gf/7v/8bSyyxRAnA1157bZx99tlx6623xvzzzx/TTjttZJ11+/NmYB56n2222SYGDx4cOfOd4Tj3yeCb4TxnmX/u+CmnnDKyTCX/A+Grr74qAXyVVVaJp556KiaffPJyCZdffnkJ2Nnm6quvXv6D4+euzTYCBAgQIECAwKgWUPIxkkcgZ2Ozjnq//fYrM7ULL7xwKcnIbsw777wlNOe6aaaZpgTXnBHOmxUzyB588MGRZR5zzDFHvPvuuyUED6tiJ+unxx577OjXr18stNBCpdykV69eJdi+9dZb8eabb5Zwn6Ugm2222RDnzfA79D5//OMf46GHHiozyJ9++mk5PstV8n3eWNi+3x0dn/3J2efPPvusyM8222wlkOf5p5pqqraSjwkmmCAeeOCBYjKSh8jpCBAgQIAAAQLDJeCmxOHiqs3O4403Xkw99dSx3XbbldnhSquVsofRRvu/YamUh+RNjDnze9hhh8XGG29cZncrx3TlNYP6brvtFksvvXRkmM4lZ4hzljvLPfLGyFyGPm9H++R+GcxzVjvrsrNsI294HGeccbp0fJ6/cp5sa9llly0hOt+3X/I/ArKe2kKAAAECBAgQqHcBgXokj1CGxKyRziVDY9ZEV5Z8ZFz+VWadK/udcMIJscwyy5Qa6izfeOyxx9pCadYwZzlIZ0ueL0s0hl6OO+64MtOdgTbb/O6778oMc+5XOW9n+2T/8j8IVltttfjd734XWSudy9D97uj47O+gQYPaHo+X5R6bbrpp2+dKG9lexSKvt/363GYhQIAAUdPwNgAAOBhJREFUAQIECNSLgEA9Ekcib9jLWuYbb7wxso66/ZKfX3311bj44osja6lzyRngXDIQ58z0+eefH4ssskiZaZ5iiilixhlnLKUcHQXmPC7rn7POOZ8Ecscdd+SqtiVrly+66KJYaaWVSnA966yzSj137lA5b0f75HOy83na2V6Wb+RMdZawXHfddW2P5Pu54zP8f/PNN7HTTjvFgQceWMo/so18BnUup556alxxxRWlhCS9XnnllXLN+WohQIAAAQIECNSjgBrqehyVofqUgTlnaDOM5qPlKkvOKmcJRaVUpLK+q68DBw4spRrZds5K5+P7hl462idvpsw66t13372E66zDzpKU/I+BoZehj8+ngyy//PIlKGffJ5pooqEP+cnnfCpJ/geEhQABAgQIECBQjwKe8lGPozJUnypBt32Yzl3aPxJvqEO69DFruStLpV678rny2tE++SSOnGmfcMIJSw12zlbnj7J0tAx9fD5JJGeoM0hX6rk7Oq79OmG6vYb3BAgQIECAQL0JmKGutxHpAf3JQJwlKnfffXcJ1euvv375RcZhdT2P+/vf/15+Xj1LV7bccsthHWI7AQIECBAgQKDuBQTquh8iHSRAgAABAgQIEKhnATcl1vPo6BsBAgQIECBAgEDdCwjUdT9EOkiAAAECBAgQIFDPAgJ1PY+OvhEgQIAAAQIECNS9gEBd90OkgwQIECBAgAABAvUsIFDX8+joGwECBAgQIECAQN0LCNR1P0Q6SIAAAQIECBAgUM8CftiljkYnf9L7hx9+KD2q/Irg8P4K4rfffhv/+te/YoUVVogpp5xyuK/uyy+/LD+80tGBk08+eUerrSNAgAABAgQINLWAQF1Hw//ggw/GVlttFbPMMkusvvrqce+990YG5OOOOy4WX3zxLvX0sssui2222ab8NPiIBOqdd945vvjii5h11lnjxBNPjDXXXLME8/x1xHfeeaf8VHmXOtK603vvvRdTTz11V3e3HwECBAgQIECgRwoo+aijYVtrrbViwQUXjBVXXDEOOeSQuOuuu2KuueaKrbfeusu93GKLLWLiiSfu8v5D79i3b9+45ppr4thjj42xxhortttuuzj99NNLuM5fOhyeZfvttx+e3e1LgAABAgQIEOiRAmao62zYxhxzzCF6lDPFGXCzFGT00UePZ599Ni6++OL4/PPPY9ttt42FFlqo7P/888/HWWedFZNMMkl89913Zd3hhx9eyjeWW265WHnllePMM8+Mjz/+OPbZZ58hztH+wx577NH+Y9v7DOq5vPvuu+U8GbZ/85vfRM5cf/DBBzH33HPHpJNOWmbV8yfFjzrqqLjhhhvigAMOKPvNNNNM5Xj/ECBAgAABAgQaTUCgrsMRzdKPY445Jl599dU477zz4uyzzy5h+vXXXy8lIXfccUfceeedsfTSS8cLL7wQE000Uay00kqlzGPAgAGx//77l6vKdUsuuWS88sor5fOHH35YZsBH9JI//fTTyJKQSy65JPbdd9/YYYcdSt/yHHmu6aabLqaaaqpSLrL33nuXme0M73369BnRUzqOAAECBAgQIFD3Ako+6nCI5pxzzlhnnXWiX79+JaT+/e9/j++//z4uvPDCMhM8wQQTxLrrrltmoy+99NK4+uqrS1Cefvrpy4z1FFNMUa4q667XW2+9OOmkk6KlpSXuu+++WGONNUb4ivM8gwcPLjXdOUOd/ZhwwgnLjPk///nPeOmll0rgzhNUQvS4444bo43mazbC6A4kQIAAAQIE6l7ADHUdDlHWQM8222zlL2d8Mxhff/318fbbb5cbAytdzhnqnLXOWeosB6ksGWAzQOey3377lZrsxRZbrMwi59NDRnR5+umnS1lHZQY8Z6xzybKUvJHygQceiEGDBrWF6RE9j+MIECBAgAABAj1JwNRhnY1WPtWj/fLwww+XjzPMMEOsvfbapayjcnNglnJkbfSqq65aSkCyPvrHH38ss9mVfRZddNFS9pHlGVlz3dUlA3nOirfvT86aX3vttXHllVdGhum//vWvpbk999wzrrjiinIz5B//+MeyrjIrnY/hyzKUbO+xxx5rC/pd7Yf9CBAgQIAAAQL1LmCGuo5G6Jxzzimh86233op8JnXOSGfdc9ZQ582H8847b3mMXQbrfPrH8ssvH+uvv36ZFc7H7M0+++yxyCKLxMCBA8sNiBmme/fuHRl480bGvGmwK0uG6HzKSL7mjYzzzz9/aXuZZZaJTTfdNDbffPOYdtpp44wzzoislc6Z6yxTWWWVVeLQQw8t5zn44INjxhlnLGUreeNihv/sW5aF5Iy2hQABAgQIECDQKAK9WmcO/682oFGuqAmu46OPPiplFeONN94QV/v+++/HZJNNVmaEs1Skshx22GHlh16yRKQWS4b9vBGyMgvdWZv5tJEsMan8OE3+x0GlvruzY6wnQIAAAQIECPQ0AYG6p43YcPT36KOPjkcffbQ8T/rcc88djiPtSoAAAQIECBAg0FUBJR9dleqB+2WpRtZU77TTTj2w97pMgAABAgQIEOgZAmaoe8Y46SUBAgQIECBAgECdCnjKR50OjG4RIECAAAECBAj0DAGBumeMk14SIECAAAECBAjUqYBAXacDo1sECBAgQIAAAQI9Q0Cg7hnjpJcECBAgQIAAAQJ1KiBQ1+nA6BYBAgQIECBAgEDPEBCoe8Y46SUBAgQIECBAgECdCgjUdTowukWAAAECBAgQINAzBATqnjFOekmAAAECBAgQIFCnAgJ1nQ6MbhEgQIAAAQIECPQMAYG6Z4yTXhIgQIAAAQIECNSpgEBdpwOjWwQIECBAgAABAj1DQKDuGeOklwQIECBAgAABAnUqMEad9ku3hlPg5Zdfjttuuy1aWlqiT58+sdhii8Xcc89dWrn//vvj1FNPjT/96U+xwAILdKnl66+/Ps4999w44YQTYqqppur0mIcffjgeeeSRn2zfdNNNY+KJJ/7JeisIECBAgAABAo0mYIa6QUZ01llnjXvuuSdef/31mG222WK11VaLDMW5LL744nHzzTeX9V293AzeDz300M+G6WzrjDPOiMkmmyyef/75uOWWW2LRRReNyy67LMYbb7yunipefPHFLu9rRwIECBAgQIBAvQkI1PU2IlX05z//+U9svPHGsfTSS8ekk07aFlQffPDBWHjhhWOcccbpcus33XRTrLnmmsPcf5NNNomNNtoonn766dhggw2ib9++ccABB8SYY445zGNzhyeffDL+8pe/dGlfOxEgQIAAAQIE6lFAyUc9jsoI9OnZZ5+NAQMGxPvvvx/bb799KfvYaqutSks33HBDWzh+6qmn4oILLijh+rvvvotDDz00XnjhhVLeMf7448fXX38dhxxySJnd3nzzzePXv/51Cee///3vO5zhXnnlleOLL76ILCu55JJLyvlWXHHFMlN+4oknls/ffPNNbLHFFrHTTjvF4YcfHnfeeWc88cQTcdppp5UwPtdcc0WWrOQsu4UAAQIECBAg0NMEBOqeNmKd9DfLO5ZffvkSVLOW+qijjipBOHfPQH3FFVfEq6++WgLsvffeW7ZNNNFEkTPMO+64Y1x99dXx5ptvljKPb7/9Nu67775Ye+21Y4011ohKMO/k1KV2e/7554/JJ5+87PLhhx/GuuuuW0pAsnY7Z6uXXHLJMhOd57rqqqtK/3Ln0UYbLY444ghhujNc6wkQIECAAIG6FxCo636IutbB6667Lvbcc89Yb731YvDgwXHggQeW8Pz222+XWeesq85SjCz9yODbv3//0nDWO+eMcq7Lv0UWWaQE5AzVWYpx9913D7MDGeYzeFeWCy+8sLw96aSTYsYZZ4xtt922fM6Z6JwVzzrrXLLeOz/PMccc5bN/CBAgQIAAAQI9UUCg7omjNlSfs9Qjn7SxyiqrlC1Z/zzPPPOU9zfeeGP069cvXnrppXjuuedirbXWKutzxnrLLbeMxx9/PDbccMOy7t13340ff/yxzGhnIH/jjTdKuM6NnZVj/PDDD5Fh/sorryxt5D95M+PWW28df/jDH+LTTz+N1157rRyf55xgggnKDYyjjz563H777SWIZ99mnnnmMludM9YWAgQIECBAgEBPEhCoe9JoddDXrJnee++9Y+yxx4799tuvhNnpppsu/vGPf5S9MzBnfXU+dSNrqy+66KIYOHBgfPXVV+WReJdffnmpo8598rjf/e53kSH83//+dwnUu+yyS5ll7ihQZ2lH1kTna974uNRSS5VQnPXSu+22Wzlvzj7PMMMMke0ceeSR8eWXX5ZtOTOetdvPPPNM9OrVK3beeefyHwF77LFHB1dpFQECBAgQIECgfgV6tT63uKV+u6dn1QrkTYZZw1x56kaWg+SQZwCvLLlPzhj37t27sqrtNQNw3qw4vMugQYNKuM42cxY7b0wcd9xxy/ss88jz57pcKu/HGGOMyD8LAQIECBAgQKAnCQjUPWm09JUAAQIECBAgQKDuBBSs1t2Q6BABAgQIECBAgEBPEhCoe9Jo6SsBAgQIECBAgEDdCQjUdTckOkSAAAECBAgQINCTBATqnjRa+kqAAAECBAgQIFB3AgJ13Q2JDhEgQIAAAQIECPQkAYG6J42WvhIgQIAAAQIECNSdgEBdd0OiQwQIECBAgAABAj1JQKDuSaOlrwQIECBAgAABAnUnIFDX3ZDoEAECBAgQIECAQE8SEKh70mjpKwECBAgQIECAQN0JCNR1NyQ6RIAAAQIECBAg0JMEBOqeNFr6SoAAAQIECBAgUHcCAnXdDYkOESBAgAABAgQI9CQBgbonjZa+EiBAgAABAgQI1J2AQF1HQ/Lll1/GRx991OFfZ93M/c8555yfbP7hhx/i6quvjldfffUn20bFiiuvvDLef//9UXFq5yRAgAABAgQIdKuAQN2tvMPX+M477xzbbbddHH744THNNNPE9ttvH3/+859j9tlnj6+//vonjQ0ePDj222+/2HvvvX+y7frrr48tttginn/++Z9sG1kr3nvvvbZTXXjhhfHiiy+2ffaGAAECBAgQINAoAgJ1HY1k375945prroljjz02xhprrBKuTz/99DjxxBPjm2+++UlPe/fuHTvuuONP1ueKddZZJ6affvoOt42slfkfBJXlqquuiuWWW67y0SsBAgQIECBAoGEEBOo6Gso99tijw97kTPMkk0xStl1wwQWx5557xmGHHRbffvttjDnmmGX9bbfdFjnD/eCDD7a1McYYY7S9f/fdd+OQQw6JI444opSUtG3o5E2Wkhx55JHxl7/8Jd58882y19Dnfvjhh8sMeZ5zp512ittvv72ttQz6N9xwQxxwwAGlTwcddFD897//LdufffbZ0u7uu+/etq5///6x6667xjPPPBO77LJLnH/++W1teUOAAAECBAgQqGcBgbqeR2eovl177bVx9tlnxzHHHBMXX3xxXHTRRWWPjz/+OO66667IAL3MMsvEE088McSRn376aQnbf/rTnyKD9Q477DDE9qE/fPLJJ7HaaquVkpMM7b/97W9j6HOfd955cdNNN5XQnX3J2fJVVlklnn766dJcpQxln332iZaWljjppJPKuV9//fXYaqutYq+99oqVV145ll566XjrrbciA/Upp5wSRx11VCywwAKxzTbbdCn4D913nwkQIECAAAECI1tAoB7Z4lWcL0tCsr46yyeyBCSDdC6TTjppHHrooaU0ZPHFF49//etfQ5wlb07MeuvjjjuulJJMMMEEJeQOsVO7D5dddlkJuzkrfuCBB8YJJ5wQQ5/7888/j3XXXTfGH3/8sv3444+PWWedNa644orSUp8+fcrruOOOG0sttVRMNdVU5XPWUs8999yRfcjj8xyXXnpprLfeemX7P//5z1LGku2+8847ZZ1/CBAgQIAAAQL1LPD/awLquZf6VgS++uqrcgNilk8suuiiHark7O6AAQOG2Jazxhm6999//7I+Z6x/bsn9K22MM844MeGEE8bAgQN/cu5evXrFaKP9//8mW3bZZUsZSkdtV8pP3n777SGCcs5Q56x1ZXvl2LHHHjt+/PHHykevBAgQIECAAIG6Ffj/aahuu9h8HcsSie+///4n4TRnmOeYY47I4Jqz0999913ko/baL/fff38p18h1GUjzL29QzJKNfHRdhum//vWv7Q/5yfvcP8s5br755vjwww9LKUZn5x40aFBb8H3qqadi0003Le1Vgnb2L8N5pS9rr712PPTQQ203Wb7yyitlNjwf85dLXnvlNY/Jz4899ljb+rLRPwQIECBAgACBOhIwQ11Hg5FdyZrlvHkwX88888yYf/75y2PzclvWKGf9cT4KL29GPOuss0o5xRRTTBFbb711TDTRRGV7BuK77767zPxmnXXWJmfQ3XzzzWPaaaeNM844I3J2ubNlpZVWKiUYv/zlL0sZxyWXXFKeZz30ubN0I0tP8obEqaeeujzFI/ubS/ZpxhlnjH79+kXebJnPw85a61NPPTXWXHPNyGA911xzxfLLLx/rr79+uXkxj8vtU045ZWQdd5Z/5Oz4IossEi+99FLpS+5jIUCAAAECBAjUk0Cv1hnA/5sSrKde6UunAll6kWUYOWw5i503A+aSpRRZpzx06UT7hjKkZuiuzB6339bR+5xZzlKRSvge+tz5XOkMxDnLnPtk2+2XnEHP9R31KZ8iknXW4403XvtDOnyfs+QZ0C0ECBAgQIAAgXoUEKjrcVR6SJ+ydGPFFVeMrO2uhO4e0nXdJECAAAECBAjUTEANdc0om6uhLPW48847yyP48vnUFgIECBAgQIBAswqYoW7WkXfdBAgQIECAAAECNREwQ10TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI++6CRAgQIAAAQIEaiIgUNeEUSMECBAgQIAAAQLNKiBQN+vIu24CBAgQIECAAIGaCAjUNWHUCAECBAgQIECAQLMKCNTNOvKumwABAgQIECBAoCYCAnVNGDVCgAABAgQIECDQrAICdbOOvOsmQIAAAQIECBCoiYBAXRNGjRAgQIAAAQIECDSrgEDdrCPvugkQIECAAAECBGoiIFDXhFEjBAgQIECAAAECzSogUDfryLtuAgQIECBAgACBmggI1DVh1AgBAgQIECBAgECzCgjUzTryrpsAAQIECBAgQKAmAgJ1TRg1QoAAAQIECBAg0KwCAnWzjrzrJkCAAAECBAgQqImAQF0TRo0QIECAAAECBAg0q4BA3awj77oJECBAgAABAgRqIiBQ14RRIwQIECBAgAABAs0qIFA368i7bgIECBAgQIAAgZoICNQ1YdQIAQIECBAgQIBAswoI1M068q6bAAECBAgQIECgJgICdU0YNUKAAAECBAgQINCsAgJ1s4686yZAgAABAgQIEKiJgEBdE0aNECBAgAABAgQINKuAQN2sI///2q1jGgAAAIRh/l1jYh81QEJ50JsAAQIECBAgQCARcKgTRiEECBAgQIAAAQKvAg716/J6EyBAgAABAgQIJAIOdcIohAABAgQIECBA4FXAoX5dXm8CBAgQIECAAIFEwKFOGIUQIECAAAECBAi8CjjUr8vrTYAAAQIECBAgkAg41AmjEAIECBAgQIAAgVcBh/p1eb0JECBAgAABAgQSAYc6YRRCgAABAgQIECDwKuBQvy6vNwECBAgQIECAQCLgUCeMQggQIECAAAECBF4FHOrX5fUmQIAAAQIECBBIBBzqhFEIAQIECBAgQIDAq4BD/bq83gQIECBAgAABAomAQ50wCiFAgAABAgQIEHgVcKhfl9ebAAECBAgQIEAgEXCoE0YhBAgQIECAAAECrwIO9evyehMgQIAAAQIECCQCDnXCKIQAAQIECBAgQOBVwKF+XV5vAgQIECBAgACBRMChThiFECBAgAABAgQIvAo41K/L602AAAECBAgQIJAIONQJoxACBAgQIECAAIFXAYf6dXm9CRAgQIAAAQIEEgGHOmEUQoAAAQIECBAg8CrgUL8urzcBAgQIECBAgEAi4FAnjEIIECBAgAABAgReBRzq1+X1JkCAAAECBAgQSAQc6oRRCAECBAgQIECAwKuAQ/26vN4ECBAgQIAAAQKJgEOd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'


if __name__ == '__main__':
    main()
