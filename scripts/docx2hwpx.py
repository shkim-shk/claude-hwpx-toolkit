#!/usr/bin/env python3
"""
docx2hwpx.py - Convert DOCX (or any Pandoc-supported format) to HWPX

Converts input files to HWPX format using Pandoc JSON AST as an intermediate.
Supports both Pandoc API 1.20 (5-element Table) and 1.22+ (6-element Table).

Usage:
    python3 docx2hwpx.py input.docx output.hwpx [--reference ref.hwpx]
"""

import copy
import re
import sys
import os
import io
import shutil
import zipfile
import json
import argparse
import xml.sax.saxutils as saxutils
import xml.etree.ElementTree as ET
import pypandoc
from PIL import Image

class PandocToHwpx:
    def __init__(self, json_ast=None, header_xml_content=None):
        self.ast = json_ast
        self.output = []
        self.header_xml_content = header_xml_content

        # Default Style Mappings (Fallback)
        self.STYLE_MAP = {
            'Normal': 0,
            'Header1': 1,
            'Header2': 2,
            'Header3': 3,
            'Header4': 4,
            'Header5': 5,
            'Header6': 6,
        }

        # Dynamic Style Mappings from header.xml
        self.dynamic_style_map = {}
        self.normal_style_id = 0
        self.normal_para_pr_id = 1

        # XML Tree and CharPr Cache
        self.header_tree = None
        self.header_root = None
        self.namespaces = {
            'hh': 'http://www.hancom.co.kr/hwpml/2011/head',
            'hp': 'http://www.hancom.co.kr/hwpml/2011/paragraph',
            'hc': 'http://www.hancom.co.kr/hwpml/2011/core',
            'hs': 'http://www.hancom.co.kr/hwpml/2011/section'
        }
        # cache key: (base_char_pr_id, frozenset(active_formats)) -> new_char_pr_id
        self.char_pr_cache = {}
        self.max_char_pr_id = 0
        self.max_para_pr_id = 0

        self.images = [] # metadata for images
        self.id_counter = 0  # Deterministic ID generation

        # Metadata extraction
        self.title = None
        self._extract_metadata()

        if self.header_xml_content:
            self._parse_styles_and_init_xml(self.header_xml_content)

    def _extract_metadata(self):
        if not self.ast:
            return
        meta = self.ast.get('meta', {})

        # Title
        if 'title' in meta:
             t_obj = meta['title']
             # "title": {"t": "MetaInlines","c": [{"t": "Str","c": "..."}]}
             if t_obj.get('t') == 'MetaInlines':
                 self.title = self._get_plain_text(t_obj.get('c', []))
             elif t_obj.get('t') == 'MetaString': # Sometimes simple string
                 self.title = t_obj.get('c', "")

    def _get_plain_text(self, inlines):
        if not isinstance(inlines, list):
            return ""
        text = []
        for item in inlines:
            t = item.get('t')
            c = item.get('c')
            if t == 'Str':
                text.append(c)
            elif t == 'Space':
                text.append(" ")
            elif t in ['Strong', 'Emph', 'Underline', 'Strikeout', 'Superscript', 'Subscript', 'SmallCaps']:
                 text.append(self._get_plain_text(c)) # recursive
            elif t == 'Link':
                 # c = [attr, [text], [url, title]]
                 text.append(self._get_plain_text(c[1]))
            elif t == 'Image':
                 # c = [attr, [caption], [url, title]]
                 text.append(self._get_plain_text(c[1]))
            elif t == 'Code':
                 text.append(c[1])
            elif t == 'Quoted':
                 # c = [quoteType, [inlines]]
                 text.append('"' + self._get_plain_text(c[1]) + '"')
        return "".join(text)

    def _get_next_id(self):
        """Generate deterministic ID using counter"""
        self.id_counter += 1
        return self.id_counter

    @staticmethod
    def convert_to_hwpx(input_path, output_path, reference_path):
        if not os.path.exists(reference_path):
             raise FileNotFoundError(f"Reference file not found: {reference_path}")

        # 1. Generate AST
        json_str = pypandoc.convert_file(input_path, 'json')
        json_ast = json.loads(json_str)

        # 2. Read Reference (Header & Section0)
        header_xml_content = ""
        page_setup_xml = None

        with open(reference_path, 'rb') as f:
            ref_doc_bytes = f.read()

        with zipfile.ZipFile(io.BytesIO(ref_doc_bytes)) as z:
            if "Contents/header.xml" in z.namelist():
                header_xml_content = z.read("Contents/header.xml").decode('utf-8')

            # Extract Page Setup from section0
            if "Contents/section0.xml" in z.namelist():
                try:
                    sec_xml = z.read("Contents/section0.xml").decode('utf-8')
                    ns = {
                        'hp': 'http://www.hancom.co.kr/hwpml/2011/paragraph',
                        'hs': 'http://www.hancom.co.kr/hwpml/2011/section',
                        'hc': 'http://www.hancom.co.kr/hwpml/2011/core'
                    }
                    for p, u in ns.items():
                         ET.register_namespace(p, u)

                    sec_root = ET.fromstring(sec_xml)
                    first_para = sec_root.find('.//hp:p', ns)
                    if first_para is not None:
                        first_run = first_para.find('hp:run', ns)
                        if first_run is not None:
                             extracted_nodes = []
                             for child in first_run:
                                 tag = child.tag
                                 if tag.endswith('secPr') or tag.endswith('ctrl'):
                                     extracted_nodes.append(ET.tostring(child, encoding='unicode'))
                             if extracted_nodes:
                                 page_setup_xml = "".join(extracted_nodes)
                except Exception as e:
                    print(f"[Warn] Failed to extract Page Setup: {e}", file=sys.stderr)

        # 3. Convert Logic
        converter = PandocToHwpx(json_ast, header_xml_content)
        xml_body, new_header_xml = converter.convert(page_setup_xml=page_setup_xml)

        # 4. Write Output
        # Prepare Input Zip for reading images if needed (for DOCX)
        input_zip = None
        if zipfile.is_zipfile(input_path):
             input_zip = zipfile.ZipFile(input_path, 'r')

        try:
            with zipfile.ZipFile(io.BytesIO(ref_doc_bytes), 'r') as ref_zip:
                with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as out_zip:
                    # Images
                    for img in converter.images:
                        img_path = img['path'] # e.g. media/image1.png
                        img_id = img['id']
                        ext = img['ext']
                        bindata_name = f"BinData/{img_id}.{ext}"

                        embedded = False

                        # Candidates for image source
                        candidates_to_check = []

                        # 1. As-is (CWD or absolute)
                        candidates_to_check.append(img_path)

                        # 2. Relative to Input File (if local file)
                        # e.g. input="docs/post.md", img="pic.png" -> "docs/pic.png"
                        if not zipfile.is_zipfile(input_path): # If input is zip (docx), we rely on zip extraction mainly
                             input_dir = os.path.dirname(os.path.abspath(input_path))
                             candidates_to_check.append(os.path.join(input_dir, img_path))

                        # Try Local File Candidates
                        for cand_path in candidates_to_check:
                             if os.path.exists(cand_path):
                                  out_zip.write(cand_path, bindata_name)
                                  embedded = True
                                  break

                        if embedded:
                             continue # Skip to next image

                        # 3. Try extracting from Input DOCX (In-Memory)
                        if input_zip is not None:
                            # Pandoc AST: media/image1.png
                            # DOCX Structure: word/media/image1.png
                            # We need to guess the path in zip

                            # Common mapping: media/xxx -> word/media/xxx
                            zip_candidates = [
                                img_path,
                                f"word/{img_path}",
                                img_path.replace("media/", "word/media/")
                            ]

                            for cand in zip_candidates:
                                if cand in input_zip.namelist():
                                    image_data = input_zip.read(cand)
                                    out_zip.writestr(bindata_name, image_data)
                                    embedded = True
                                    break

                        if not embedded:
                             print(f"[Warn] Image not found: {img_path}", file=sys.stderr)


                    # Copy/Modify Files
                    for item in ref_zip.infolist():
                        fname = item.filename

                        if fname == "Contents/section0.xml":
                            original_xml = ref_zip.read(fname).decode('utf-8')

                            # Replace body
                            sec_start = original_xml.find('<hs:sec')
                            tag_close = original_xml.find('>', sec_start)
                            prefix = original_xml[:tag_close+1]

                            # Ensure Namespaces
                            if 'xmlns:hc=' not in prefix:
                                 prefix = prefix[:-1] + ' xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core">'
                            if 'xmlns:hp=' not in prefix:
                                 prefix = prefix[:-1] + ' xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">'

                            sec_end = original_xml.rfind('</hs:sec>')
                            suffix = original_xml[sec_end:] if sec_end != -1 else ""

                            out_zip.writestr(fname, prefix + "\n" + xml_body + "\n" + suffix)

                        elif fname == "Contents/header.xml":
                            if new_header_xml:
                                out_zip.writestr(fname, new_header_xml)
                            else:
                                out_zip.writestr(item, ref_zip.read(fname))

                        elif fname == "Contents/content.hpf":
                            # Manifest Update
                            hpf_xml = ref_zip.read(fname).decode('utf-8')

                            # 1. Update Title if exists
                            if converter.title:
                                # regex replace <opf:title>...</opf:title>
                                hpf_xml = re.sub(r'<opf:title>.*?</opf:title>', f'<opf:title>{converter.title}</opf:title>', hpf_xml)

                            # 2. Update Images
                            if converter.images:
                                new_items = []
                                for img in converter.images:
                                    i_id = img['id']
                                    i_ext = img['ext']
                                    mime = "image/png"
                                    if i_ext == "jpg": mime = "image/jpeg"
                                    elif i_ext == "gif": mime = "image/gif"
                                    item_str = f'<opf:item id="{i_id}" href="BinData/{i_id}.{i_ext}" media-type="{mime}" isEmbeded="1"/>'
                                    new_items.append(item_str)

                                insert_pos = hpf_xml.find("</opf:manifest>")
                                if insert_pos != -1:
                                    hpf_xml = hpf_xml[:insert_pos] + "\n".join(new_items) + "\n" + hpf_xml[insert_pos:]

                            out_zip.writestr(fname, hpf_xml)
                        else:
                            out_zip.writestr(item, ref_zip.read(fname))
        except Exception as e:
             import traceback
             traceback.print_exc()
             print(f"[Error] HWPX creation failed: {e}", file=sys.stderr)
             sys.exit(1)
        finally:
             if input_zip:
                 input_zip.close()

        print(f"Successfully created {output_path}")

    TABLE_BORDER_FILL_XML = """
    <hh:borderFill id="{id}" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core">
        <hh:slash type="NONE" Crooked="0" isCounter="0"/>
        <hh:backSlash type="NONE" Crooked="0" isCounter="0"/>
        <hh:leftBorder type="SOLID" width="0.12 mm" color="#000000"/>
        <hh:rightBorder type="SOLID" width="0.12 mm" color="#000000"/>
        <hh:topBorder type="SOLID" width="0.12 mm" color="#000000"/>
        <hh:bottomBorder type="SOLID" width="0.12 mm" color="#000000"/>
        <hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/>
        <hc:fillBrush>
          <hc:winBrush faceColor="none" hatchColor="#000000" alpha="0"/>
        </hc:fillBrush>
    </hh:borderFill>
    """

    def _ensure_table_border_fill(self, root):
        border_fills = root.find('.//hh:borderFills', self.namespaces)
        if border_fills is None:
             # Should practically always exist in valid hwpx, but if not:
             border_fills = ET.SubElement(root, '{http://www.hancom.co.kr/hwpml/2011/head}borderFills')

        max_id = 0
        for bf in border_fills.findall('hh:borderFill', self.namespaces):
            bid = int(bf.get('id', 0))
            if bid > max_id:
                max_id = bid

        self.table_border_fill_id = str(max_id + 1)

        xml_str = self.TABLE_BORDER_FILL_XML.format(id=self.table_border_fill_id).strip()
        new_node = ET.fromstring(xml_str)
        border_fills.append(new_node)

    def _parse_styles_and_init_xml(self, header_xml):
        try:
            self.header_tree = ET.ElementTree(ET.fromstring(header_xml))
            self.header_root = self.header_tree.getroot()
            root = self.header_root

            # --- 0. Find Max IDs ---
            self.max_char_pr_id = 0
            for char_pr in root.findall('.//hh:charPr', self.namespaces):
                c_id = int(char_pr.get('id', 0))
                if c_id > self.max_char_pr_id:
                    self.max_char_pr_id = c_id

            self.max_para_pr_id = 0
            for para_pr in root.findall('.//hh:paraPr', self.namespaces):
                p_id = int(para_pr.get('id', 0))
                if p_id > self.max_para_pr_id:
                     self.max_para_pr_id = p_id

            # --- Ensure Numbering Definitions ---
            self._init_numbering_structure(root)

            # --- Ensure Table Border Fill ---
            self._ensure_table_border_fill(root)

            # --- 1. Find Normal Style (id="0" or first) ---
            normal_style_node = root.find('.//hh:style[@id="0"]', self.namespaces)
            if normal_style_node is None:
                all_styles = root.findall('.//hh:style', self.namespaces)
                if all_styles:
                    normal_style_node = all_styles[0]

            if normal_style_node is not None:
                self.normal_style_id = normal_style_node.get('id')
                self.normal_para_pr_id = normal_style_node.get('paraPrIDRef')
                print(f"[Debug] Normal Style Detected: StyleID={self.normal_style_id}, ParaPrID={self.normal_para_pr_id}")
            else:
                print(f"[Debug] No Normal Style found, using defaults.")

            # --- 2. Map Outline Levels ---
            level_to_para_pr = {}
            for para_pr in root.findall('.//hh:paraPr', self.namespaces):
                p_id = para_pr.get('id')
                # Recursive search for hh:heading
                headings = para_pr.findall('.//hh:heading', self.namespaces)

                target_level = None
                for heading in headings:
                    if heading.get('type') == 'OUTLINE':
                        level_str = heading.get('level')
                        if level_str is not None:
                            target_level = int(level_str)
                            break

                if target_level is not None:
                    if target_level not in level_to_para_pr:
                        level_to_para_pr[target_level] = p_id

            # Map ParaPrID -> Style Info
            para_pr_to_style_info = {}
            for style in root.findall('.//hh:style', self.namespaces):
                s_id = style.get('id')
                p_ref = style.get('paraPrIDRef')
                c_ref = style.get('charPrIDRef')

                if p_ref not in para_pr_to_style_info:
                    para_pr_to_style_info[p_ref] = {
                        'style_id': s_id,
                        'char_pr_id': c_ref
                    }

            # Combine
            detected_levels = []
            self.outline_style_ids = {} # Initialize for usage in _handle_header

            for level, p_id in level_to_para_pr.items():
                if p_id in para_pr_to_style_info:
                    info = para_pr_to_style_info[p_id]
                    self.dynamic_style_map[level] = {
                        'style_id': info['style_id'],
                        'para_pr_id': p_id,
                        'char_pr_id': info['char_pr_id']
                    }
                    detected_levels.append(level)
                    self.outline_style_ids[level] = info['style_id']

            # --- 3. Validation ---
            detected_levels.sort()

            if detected_levels: # Only validate if found
                 if detected_levels[0] != 0:
                     raise ValueError(f"Outline levels must start from 0. Found start: {detected_levels[0]}")
                 for i in range(len(detected_levels)):
                     if detected_levels[i] != i:
                         raise ValueError(f"Outline levels are missing/gapped. Expected {i}, found {detected_levels[i]}")

            print(f"[Debug] Validated Outline Levels: {detected_levels}")

            # --- 4. Validation: Check Normal Style Cleanliness ---
            normal_char_pr_id = 0
            if normal_style_node is not None:
                normal_char_pr_id = normal_style_node.get('charPrIDRef', '0')

            normal_char_pr = root.find(f'.//hh:charPr[@id="{normal_char_pr_id}"]', self.namespaces)
            if normal_char_pr is not None:
                 forbidden = ['bold', 'italic', 'underline', 'supscript', 'subscript']
                 found_dirty = []
                 for tag in forbidden:
                     if normal_char_pr.find(f'hh:{tag}', self.namespaces) is not None:
                         if tag == 'underline':
                             u_node = normal_char_pr.find(f'hh:{tag}', self.namespaces)
                             if u_node.get('type') == 'NONE':
                                 continue
                         found_dirty.append(tag)
                 if found_dirty:
                     raise ValueError(f"Normal Style (charPrID={normal_char_pr_id}) must be clean. Found forbidden properties: {found_dirty}")

        except Exception as e:
            print(f"[Error] Failed to parse/validate header.xml: {e}", file=sys.stderr)
            raise e

    def convert(self, page_setup_xml=None):
        blocks = self.ast.get('blocks', [])
        # Process blocks to get section XML
        xml_body = self._process_blocks(blocks)

        # Inject page_setup_xml (secPr, ctrl) into the FIRST hp:run of the document
        if page_setup_xml:
            # Find the first hp:run start tag
            # e.g. <hp:run charPrIDRef="...">
            search_pattern = r'(<hp:run [^>]*>)'
            match = re.search(search_pattern, xml_body)
            if match:
                # Insert AFTER the opening tag, so it becomes the first child
                insert_pos = match.end()
                xml_body = xml_body[:insert_pos] + page_setup_xml + xml_body[insert_pos:]
                print("[Debug] Injected Page Setup into first hp:run.")
            else:
                print("[Warn] No hp:run found to inject Page Setup.", file=sys.stderr)

        # Serialize the modified header.xml
        for prefix, uri in self.namespaces.items():
            ET.register_namespace(prefix, uri)

        new_header_xml = ""
        if self.header_root is not None:
             # Update itemCnt for charProperties
             char_props = self.header_root.find('.//hh:charProperties', self.namespaces)
             if char_props is not None:
                 count = len(char_props.findall('hh:charPr', self.namespaces))
                 char_props.set('itemCnt', str(count))

             # Update itemCnt for paraProperties
             para_props = self.header_root.find('.//hh:paraProperties', self.namespaces)
             if para_props is not None:
                 count = len(para_props.findall('hh:paraPr', self.namespaces))
                 para_props.set('itemCnt', str(count))

             # Update itemCnt for numberings
             numberings = self.header_root.find('.//hh:numberings', self.namespaces)
             if numberings is not None:
                 count = len(numberings.findall('hh:numbering', self.namespaces))
                 numberings.set('itemCnt', str(count))

             # Update itemCnt for borderFills
             border_fills = self.header_root.find('.//hh:borderFills', self.namespaces)
             if border_fills is not None:
                 count = len(border_fills.findall('hh:borderFill', self.namespaces))
                 border_fills.set('itemCnt', str(count))

             new_header_xml = ET.tostring(self.header_root, encoding='unicode')

        return xml_body, new_header_xml

    def _process_blocks(self, blocks):
        result = []
        if isinstance(blocks, dict):
            # Single block dict (e.g., Pandoc 1.20 table cell content)
            blocks = [blocks]
        if not isinstance(blocks, list):
             print(f"[Error] _process_blocks expected list, got {type(blocks)}: {blocks}", file=sys.stderr)
             return ""

        for block in blocks:
            if not isinstance(block, dict):
                print(f"[Error] Skipped invalid block: {block}", file=sys.stderr)
                continue

            b_type = block.get('t')
            b_content = block.get('c')

            if b_type == 'Header':
                result.append(self._handle_header(b_content))
            elif b_type == 'Para':
                result.append(self._handle_para(b_content))
            elif b_type == 'Plain':
                result.append(self._handle_plain(b_content))
            elif b_type == 'BulletList':
                result.append(self._handle_bullet_list(b_content))
            elif b_type == 'OrderedList':
                result.append(self._handle_ordered_list(b_content))
            elif b_type == 'CodeBlock':
                result.append(self._handle_code_block(b_content))
            elif b_type == 'Table':
                result.append(self._handle_table(b_content))
            elif b_type == 'BlockQuote':
                result.append(self._handle_block_quote(b_content))
            elif b_type == 'HorizontalRule':
                result.append(self._handle_horizontal_rule())
            else:
                # Unhandled block type, skip silently
                pass

        return "\n".join(result)

    def _escape_text(self, text):
        return saxutils.escape(text)

    def _create_para_start(self, style_id=0, para_pr_id=1, column_break=0, merged=0):
        return f'<hp:p paraPrIDRef="{para_pr_id}" styleIDRef="{style_id}" pageBreak="0" columnBreak="{column_break}" merged="{merged}">'

    def _create_run_start(self, char_pr_id=0):
        return f'<hp:run charPrIDRef="{char_pr_id}">'

    def _create_text_run(self, text, char_pr_id=0):
        run_xml = self._create_run_start(char_pr_id)
        run_xml += f'<hp:t>{self._escape_text(text)}</hp:t>'
        run_xml += '</hp:run>'
        return run_xml

    def _handle_header(self, content):
        level = content[0]
        text_content = content[2]
        hwpx_level = level - 1

        if hwpx_level not in self.dynamic_style_map:
             raise ValueError(f"Requested Header Level {level} (HWPX Level {hwpx_level}) not found in header.xml style map.")

        # content = [level, attr, inlines]
        level = content[0]
        inlines = content[2]

        # Check for LineBreak at start for Column Break
        column_break_val = 0
        if inlines and len(inlines) > 0:
            first_item = inlines[0]
            if first_item.get('t') == 'LineBreak':
                column_break_val = 1
                inlines = inlines[1:] # Remove the LineBreak

        # Map header level to style
        style_id = 0
        if level in self.outline_style_ids:
            style_id = self.outline_style_ids[level]
        else:
             style_id = level

        # Use associated paraPr if available
        para_pr_id = self.normal_para_pr_id
        char_pr_id = 0

        if self.header_root is not None:
             style_node = self.header_root.find(f'.//hh:style[@id="{style_id}"]', self.namespaces)
             if style_node is not None:
                 para_pr_id = style_node.get('paraPrIDRef', 0)
                 char_pr_id = style_node.get('charPrIDRef', 0)

        xml = self._create_para_start(style_id=style_id, para_pr_id=para_pr_id, column_break=column_break_val)
        xml += self._process_inlines(inlines, base_char_pr_id=char_pr_id)
        xml += '</hp:p>'

        return xml

    def _handle_para(self, content):
        normal_char_pr_id = 0
        if self.header_root is not None:
             style_node = self.header_root.find(f'.//hh:style[@id="{self.normal_style_id}"]', self.namespaces)
             if style_node is not None:
                 normal_char_pr_id = style_node.get('charPrIDRef', 0)

        xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id)
        xml += self._process_inlines(content, base_char_pr_id=normal_char_pr_id)
        xml += '</hp:p>'
        return xml

    def _handle_plain(self, content):
        normal_char_pr_id = 0
        if self.header_root is not None:
             style_node = self.header_root.find(f'.//hh:style[@id="{self.normal_style_id}"]', self.namespaces)
             if style_node is not None:
                 normal_char_pr_id = style_node.get('charPrIDRef', 0)

        xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id)
        xml += self._process_inlines(content, base_char_pr_id=normal_char_pr_id)
        xml += '</hp:p>'
        return xml

    def _handle_code_block(self, content):
        # Code formatting
        code = content[1]
        xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id)
        xml += self._create_text_run(code)
        xml += '</hp:p>'
        return xml

    def _handle_block_quote(self, content):
        """Handle BlockQuote by indenting its contents"""
        # content is a list of blocks
        if not isinstance(content, list):
            return ""

        results = []
        for block in content:
            block_xml = self._process_blocks([block])
            results.append(block_xml)

        return "\n".join(results)

    def _handle_horizontal_rule(self):
        """Handle HorizontalRule by creating an empty paragraph"""
        xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id)
        xml += '</hp:p>'
        return xml

    def _detect_table_format(self, content):
        """
        Detect Pandoc Table format version.

        Pandoc API 1.20 (Pandoc 2.9.2):
            Table has 5 elements: [caption, alignments, widths, headers, rows]

        Pandoc API 1.22+:
            Table has 6 elements: [attr, caption, specs, table_head, table_bodies, table_foot]

        Returns: ('v1.20', content_dict) or ('v1.22', content_dict)
        """
        if not isinstance(content, list):
            raise ValueError(f"Table content must be a list, got {type(content)}")

        length = len(content)

        if length == 5:
            # Pandoc 1.20 format
            return 'v1.20', {
                'caption': content[0],
                'alignments': content[1],
                'widths': content[2],
                'headers': content[3],
                'rows': content[4]
            }
        elif length == 6:
            # Pandoc 1.22+ format
            return 'v1.22', {
                'attr': content[0],
                'caption': content[1],
                'specs': content[2],
                'table_head': content[3],
                'table_bodies': content[4],
                'table_foot': content[5]
            }
        else:
            raise ValueError(f"Unsupported Table format with {length} elements")

    def _handle_table(self, content):
        """Handle tables with support for both Pandoc API 1.20 and 1.22+"""
        version, table_data = self._detect_table_format(content)

        if version == 'v1.20':
            return self._handle_table_v1_20(table_data)
        else:
            return self._handle_table_v1_22(table_data)

    def _handle_table_v1_20(self, table_data):
        """
        Handle Pandoc 1.20 Table format (5 elements)
        caption: [short_caption, blocks]
        alignments: [align_type, ...]
        widths: [float, ...]
        headers: [cell, ...]
        rows: [[cell, ...], ...]

        Cell: [attr, align, rowspan, colspan, [blocks]]
        """
        alignments = table_data['alignments']
        headers = table_data['headers']
        rows = table_data['rows']

        # Flatten: header row + data rows
        all_rows = []
        if headers:
            all_rows.append(headers)
        all_rows.extend(rows)

        if not all_rows:
            return ""

        row_cnt = len(all_rows)
        col_cnt = len(alignments)

        # Generate table XML
        TOTAL_TABLE_WIDTH = 45000
        col_widths = [int(TOTAL_TABLE_WIDTH / col_cnt) for _ in range(col_cnt)]

        tbl_id = self._get_next_id()

        xml_parts = []
        xml_parts.append(self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id))
        xml_parts.append(self._create_run_start(char_pr_id=0))

        xml_parts.append(f'<hp:tbl id="{tbl_id}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="{row_cnt}" colCnt="{col_cnt}" cellSpacing="0" borderFillIDRef="3" noAdjust="0">')

        xml_parts.append(f'<hp:sz width="{TOTAL_TABLE_WIDTH}" widthRelTo="ABSOLUTE" height="{row_cnt * 1000}" heightRelTo="ABSOLUTE" protect="0"/>')
        xml_parts.append('<hp:pos treatAsChar="0" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/>')
        xml_parts.append('<hp:outMargin left="0" right="0" top="0" bottom="1417"/>')
        xml_parts.append('<hp:inMargin left="510" right="510" top="141" bottom="141"/>')

        occupied_cells = set()
        curr_row_addr = 0

        for row in all_rows:
            xml_parts.append('<hp:tr>')

            curr_col_addr = 0
            for cell in row:
                # Find next free column
                while (curr_row_addr, curr_col_addr) in occupied_cells:
                    curr_col_addr += 1

                actual_col = curr_col_addr

                # In Pandoc API 1.20, each cell is simply a list of blocks
                # e.g. [{'t': 'Plain', 'c': [...]}]
                # No rowspan/colspan info in this format
                rowspan = 1
                colspan = 1
                cell_blocks = cell  # cell IS the list of blocks

                # Mark occupied cells
                for r in range(rowspan):
                    for c in range(colspan):
                        occupied_cells.add((curr_row_addr + r, actual_col + c))

                cell_width = col_widths[actual_col] if actual_col < len(col_widths) else int(TOTAL_TABLE_WIDTH / col_cnt)

                sublist_id = self._get_next_id()
                cell_content_xml = self._process_blocks(cell_blocks)

                xml_parts.append(f'<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="{self.table_border_fill_id}">')
                xml_parts.append(f'<hp:subList id="{sublist_id}" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="TOP" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">')
                xml_parts.append(cell_content_xml)
                xml_parts.append('</hp:subList>')
                xml_parts.append(f'<hp:cellAddr colAddr="{actual_col}" rowAddr="{curr_row_addr}"/>')
                xml_parts.append(f'<hp:cellSpan colSpan="{colspan}" rowSpan="{rowspan}"/>')
                xml_parts.append(f'<hp:cellSz width="{cell_width}" height="1000"/>')
                xml_parts.append('<hp:cellMargin left="510" right="510" top="141" bottom="141"/>')
                xml_parts.append('</hp:tc>')

                curr_col_addr += colspan

            xml_parts.append('</hp:tr>')
            curr_row_addr += 1

        xml_parts.append('</hp:tbl>')
        xml_parts.append('</hp:run>')
        xml_parts.append('</hp:p>')

        return "".join(xml_parts)

    def _handle_table_v1_22(self, table_data):
        """
        Handle Pandoc 1.22+ Table format (6 elements)
        attr, caption, specs, table_head, table_bodies, table_foot

        specs: [[align, col_width], ...]
        table_head: [attr, [row, ...]]
        table_bodies: [ [attr, row_head_columns, [row, ...], [row, ...]] ]
        table_foot: [attr, [row, ...]]

        Row: [attr, [cell, ...]]
        Cell: [attr, align, rowspan, colspan, [blocks]]
        """
        specs = table_data['specs']
        table_head = table_data['table_head']
        table_bodies = table_data['table_bodies']
        table_foot = table_data['table_foot']

        # Flatten all rows
        all_rows = []

        # Head rows
        if table_head and len(table_head) > 1:
            head_rows = table_head[1]
            for row in head_rows:
                all_rows.append(row)

        # Body rows
        if table_bodies:
            for body in table_bodies:
                if len(body) > 2:
                    inter_headers = body[2]
                    for row in inter_headers:
                        all_rows.append(row)
                if len(body) > 3:
                    main_rows = body[3]
                    for row in main_rows:
                        all_rows.append(row)

        # Foot rows
        if table_foot and len(table_foot) > 1:
            foot_rows = table_foot[1]
            for row in foot_rows:
                all_rows.append(row)

        if not all_rows:
            return ""

        row_cnt = len(all_rows)
        col_cnt = len(specs)

        # Calculate widths
        TOTAL_TABLE_WIDTH = 45000
        col_widths = [int(TOTAL_TABLE_WIDTH / col_cnt) for _ in range(col_cnt)]

        tbl_id = self._get_next_id()

        xml_parts = []
        xml_parts.append(self._create_para_start(style_id=self.normal_style_id, para_pr_id=self.normal_para_pr_id))
        xml_parts.append(self._create_run_start(char_pr_id=0))

        xml_parts.append(f'<hp:tbl id="{tbl_id}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="{row_cnt}" colCnt="{col_cnt}" cellSpacing="0" borderFillIDRef="3" noAdjust="0">')

        xml_parts.append(f'<hp:sz width="{TOTAL_TABLE_WIDTH}" widthRelTo="ABSOLUTE" height="{row_cnt * 1000}" heightRelTo="ABSOLUTE" protect="0"/>')
        xml_parts.append('<hp:pos treatAsChar="0" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/>')
        xml_parts.append('<hp:outMargin left="0" right="0" top="0" bottom="1417"/>')
        xml_parts.append('<hp:inMargin left="510" right="510" top="141" bottom="141"/>')

        occupied_cells = set()
        curr_row_addr = 0

        for row in all_rows:
            # Row = [attr, [cell, ...]]
            cells = row[1] if len(row) > 1 else []

            xml_parts.append('<hp:tr>')

            curr_col_addr = 0
            for cell in cells:
                # Find next free column
                while (curr_row_addr, curr_col_addr) in occupied_cells:
                    curr_col_addr += 1

                actual_col = curr_col_addr

                # Cell = [attr, align, rowspan, colspan, [blocks]]
                rowspan = cell[2] if len(cell) > 2 else 1
                colspan = cell[3] if len(cell) > 3 else 1
                cell_blocks = cell[4] if len(cell) > 4 else []

                # Mark occupied cells
                for r in range(rowspan):
                    for c in range(colspan):
                        occupied_cells.add((curr_row_addr + r, actual_col + c))

                # Calculate cell width
                cell_width = 0
                for i in range(colspan):
                    if actual_col + i < len(col_widths):
                        cell_width += col_widths[actual_col + i]
                    else:
                        cell_width += int(TOTAL_TABLE_WIDTH / col_cnt)

                sublist_id = self._get_next_id()
                cell_content_xml = self._process_blocks(cell_blocks)

                xml_parts.append(f'<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="{self.table_border_fill_id}">')
                xml_parts.append(f'<hp:subList id="{sublist_id}" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="TOP" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">')
                xml_parts.append(cell_content_xml)
                xml_parts.append('</hp:subList>')
                xml_parts.append(f'<hp:cellAddr colAddr="{actual_col}" rowAddr="{curr_row_addr}"/>')
                xml_parts.append(f'<hp:cellSpan colSpan="{colspan}" rowSpan="{rowspan}"/>')
                xml_parts.append(f'<hp:cellSz width="{cell_width}" height="1000"/>')
                xml_parts.append('<hp:cellMargin left="510" right="510" top="141" bottom="141"/>')
                xml_parts.append('</hp:tc>')

                curr_col_addr += colspan

            xml_parts.append('</hp:tr>')
            curr_row_addr += 1

        xml_parts.append('</hp:tbl>')
        xml_parts.append('</hp:run>')
        xml_parts.append('</hp:p>')

        return "".join(xml_parts)

    # --- INLINE PROCESSING & FORMATTING ---

    def _process_inlines(self, inlines, base_char_pr_id=0, active_formats=None):
        if not isinstance(inlines, list):
            return ""

        if active_formats is None:
            active_formats = set()

        # Helper to get current combined ID
        def get_current_id():
            return self._get_char_pr_id(base_char_pr_id, active_formats)

        results = []
        for item in inlines:
            i_type = item.get('t')
            i_content = item.get('c')

            if i_type == 'Str':
                results.append(self._create_text_run(i_content, char_pr_id=get_current_id()))
            elif i_type == 'Space':
                results.append(self._create_text_run(" ", char_pr_id=get_current_id()))
            elif i_type == 'Strong':
                # Add 'BOLD' to formats
                new_formats = active_formats.copy()
                new_formats.add('BOLD')
                results.append(self._process_inlines(i_content, base_char_pr_id, new_formats))
            elif i_type == 'Emph':
                # Add 'ITALIC' to formats
                new_formats = active_formats.copy()
                new_formats.add('ITALIC')
                results.append(self._process_inlines(i_content, base_char_pr_id, new_formats))
            elif i_type == 'Underline':
                # Add 'UNDERLINE'
                new_formats = active_formats.copy()
                new_formats.add('UNDERLINE')
                results.append(self._process_inlines(i_content, base_char_pr_id, new_formats))
            elif i_type == 'Superscript':
                new_formats = active_formats.copy()
                new_formats.add('SUPERSCRIPT')
                results.append(self._process_inlines(i_content, base_char_pr_id, new_formats))
            elif i_type == 'Subscript':
                new_formats = active_formats.copy()
                new_formats.add('SUBSCRIPT')
                results.append(self._process_inlines(i_content, base_char_pr_id, new_formats))

            elif i_type == 'Link':
                # Link = [attr, [text_inlines], [target, title]]
                text_inlines = i_content[1] if len(i_content) > 1 else []
                target_url = i_content[2][0] if len(i_content) > 2 and len(i_content[2]) > 0 else ""

                # 1. Field Begin
                results.append(self._create_field_begin(target_url))

                # 2. Field Content (Styled Blue + Underline)
                new_formats = active_formats.copy()
                new_formats.add('UNDERLINE')
                new_formats.add('COLOR_BLUE')
                results.append(self._process_inlines(text_inlines, base_char_pr_id, new_formats))

                # 3. Field End
                results.append(self._create_field_end())

            elif i_type == 'Note':
                 # Footnote. content is list of blocks.
                 note_blocks = i_content if isinstance(i_content, list) else []
                 results.append(self._create_footnote(note_blocks))

            elif i_type == 'Code':
                 # Code inline
                 code_text = i_content[1] if isinstance(i_content, list) and len(i_content) > 1 else str(i_content)
                 results.append(self._create_text_run(code_text, char_pr_id=get_current_id()))

            elif i_type == 'Image':
                # Image = [attr, [caption], [target, title]]
                results.append(self._handle_image(i_content, char_pr_id=get_current_id()))

            elif i_type == 'SoftBreak':
                # SoftBreak -> Space
                results.append(self._create_text_run(" ", char_pr_id=get_current_id()))

            elif i_type == 'LineBreak':
                 run_xml = self._create_run_start(char_pr_id=get_current_id())
                 run_xml += "<hp:t><hp:lineBreak/></hp:t></hp:run>"
                 results.append(run_xml)

            else:
                # Fallback for unknown inline types
                pass

        return "".join(results)

    def _parse_dimension(self, val_str):
        if not val_str:
            return None

        # Lowercase and remove whitespace
        s = val_str.lower().strip()

        # Regex to split value and unit
        match = re.match(r'^([0-9\.]+)([a-z%]+)?$', s)
        if not match:
            return None

        val = float(match.group(1))
        unit = match.group(2)

        # HWP Unit: 1 mm = 283.465 LUnit
        LUNIT_PER_MM = 283.465

        mm_val = 0

        if not unit or unit == 'px':
            # Default or PX. Pandoc usually 96dpi.
            mm_val = val * (25.4 / 96.0)
        elif unit == 'in':
            mm_val = val * 25.4
        elif unit == 'cm':
            mm_val = val * 10.0
        elif unit == 'mm':
            mm_val = val
        elif unit == 'pt':
            mm_val = val * (25.4 / 72.0)
        elif unit == '%':
             mm_val = val * 1.5
        else:
             mm_val = val * (25.4 / 96.0)

        return int(mm_val * LUNIT_PER_MM)

    def _handle_image(self, content, char_pr_id=0):
        # content = [attr, caption, [target, title]]
        attr = content[0] if len(content) > 0 else [None, [], []]
        caption = content[1] if len(content) > 1 else []
        target = content[2] if len(content) > 2 else ["", ""]

        target_url = target[0] if isinstance(target, list) and len(target) > 0 else str(target)

        # Parse Attributes for Width/Height
        attrs_map = dict(attr[2]) if len(attr) > 2 else {}

        width_attr = attrs_map.get('width')
        height_attr = attrs_map.get('height')

        # Default Size
        width_hwp = 8504 # ~30mm
        height_hwp = 8504

        w_parsed = self._parse_dimension(width_attr)
        h_parsed = self._parse_dimension(height_attr)

        # Try to read file for auto-sizing
        should_read_file = (not w_parsed) or (not h_parsed)

        if w_parsed and h_parsed:
            width_hwp = w_parsed
            height_hwp = h_parsed
        elif w_parsed:
             width_hwp = w_parsed

        if should_read_file:
             image_found = False
             try:
                 candidates = [target_url]

                 for cand in candidates:
                     if os.path.exists(cand):
                         with Image.open(cand) as im:
                             px_width, px_height = im.size
                             image_found = True
                         break
             except Exception as e:
                 pass

             if image_found:
                 LUNIT_PER_PX = (25.4 * 283.465) / 96.0

                 calc_w = int(px_width * LUNIT_PER_PX)
                 calc_h = int(px_height * LUNIT_PER_PX)

                 if not w_parsed and not h_parsed:
                     width_hwp = calc_w
                     height_hwp = calc_h
                 elif w_parsed and not h_parsed:
                     ratio = px_height / px_width
                     height_hwp = int(w_parsed * ratio)
                 elif not w_parsed and h_parsed:
                     ratio = px_width / px_height
                     width_hwp = int(h_parsed * ratio)

        # Max Width Constraint (15cm)
        MAX_WIDTH_HWP = int(150 * 283.465)

        if width_hwp > MAX_WIDTH_HWP:
            ratio = MAX_WIDTH_HWP / width_hwp
            width_hwp = MAX_WIDTH_HWP
            height_hwp = int(height_hwp * ratio)

        width = width_hwp
        height = height_hwp

        # Generate Binary ID (deterministic)
        binary_item_id = f"img_{self._get_next_id()}"

        # Extract Extension
        ext = "png" # default
        lower_url = target_url.lower()
        if lower_url.endswith('.jpg') or lower_url.endswith('.jpeg'):
            ext = "jpg"
        elif lower_url.endswith('.gif'):
            ext = "gif"
        elif lower_url.endswith('.bmp'):
            ext = "bmp"

        # Store for convert.py
        self.images.append({
            'id': binary_item_id,
            'path': target_url,
            'ext': ext
        })

        # Generate XML
        pic_id = self._get_next_id()
        inst_id = self._get_next_id()

        xml_parts = []
        xml_parts.append(f'<hp:run charPrIDRef="{char_pr_id}">')
        xml_parts.append(f'<hp:pic id="{pic_id}" zOrder="0" numberingType="NONE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" href="" groupLevel="0" instid="{inst_id}" reverse="0">')

        xml_parts.append(f'<hp:offset x="0" y="0"/>')
        xml_parts.append(f'<hp:orgSz width="{width}" height="{height}"/>')
        xml_parts.append(f'<hp:curSz width="{width}" height="{height}"/>')
        xml_parts.append('<hp:flip horizontal="0" vertical="0"/>')
        xml_parts.append('<hp:rotationInfo angle="0" centerX="0" centerY="0" rotateimage="1"/>')
        xml_parts.append('<hp:renderingInfo><hc:transMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/><hc:scaMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/><hc:rotMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/></hp:renderingInfo>')

        xml_parts.append(f'<hc:img binaryItemIDRef="{binary_item_id}" bright="0" contrast="0" effect="REAL_PIC" alpha="0"/>')

        xml_parts.append('<hp:imgRect><hc:pt0 x="0" y="0"/><hc:pt1 x="{w}" y="0"/><hc:pt2 x="{w}" y="{h}"/><hc:pt3 x="0" y="{h}"/></hp:imgRect>'.format(w=width, h=height))
        xml_parts.append('<hp:imgClip left="0" right="0" top="0" bottom="0"/>')
        xml_parts.append('<hp:inMargin left="0" right="0" top="0" bottom="0"/>')
        xml_parts.append('<hp:imgDim dimwidth="0" dimheight="0"/>')
        xml_parts.append('<hp:effects/>')

        xml_parts.append(f'<hp:sz width="{width}" widthRelTo="ABSOLUTE" height="{height}" heightRelTo="ABSOLUTE" protect="0"/>')
        xml_parts.append('<hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="1" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/>')
        xml_parts.append('<hp:outMargin left="0" right="0" top="0" bottom="0"/>')
        xml_parts.append('<hp:shapeComment/>')

        xml_parts.append('</hp:pic>')
        xml_parts.append('</hp:run>')

        return "".join(xml_parts)

    def _create_field_begin(self, url):
        fid = str(self._get_next_id())

        self.last_field_id = fid

        # Parameters for Hyperlink
        command_url = url.replace(':', r'\:').replace('?', r'\?')
        command_str = f"{command_url};1;5;-1;"

        xml = f'''<hp:run charPrIDRef="0"><hp:ctrl>
        <hp:fieldBegin id="{fid}" type="HYPERLINK" name="" editable="0" dirty="1" zorder="-1" fieldid="{fid}" metaTag="">
          <hp:parameters cnt="6" name="">
            <hp:integerParam name="Prop">0</hp:integerParam>
            <hp:stringParam name="Command">{command_str}</hp:stringParam>
            <hp:stringParam name="Path">{url}</hp:stringParam>
            <hp:stringParam name="Category">HWPHYPERLINK_TYPE_URL</hp:stringParam>
            <hp:stringParam name="TargetType">HWPHYPERLINK_TARGET_HYPERLINK</hp:stringParam>
            <hp:stringParam name="DocOpenType">HWPHYPERLINK_JUMP_DONTCARE</hp:stringParam>
          </hp:parameters>
        </hp:fieldBegin>
        </hp:ctrl></hp:run>'''
        return xml

    def _create_field_end(self):
        fid = getattr(self, 'last_field_id', '0')
        return f'<hp:run charPrIDRef="0"><hp:ctrl><hp:fieldEnd beginIDRef="{fid}" fieldid="{fid}"/></hp:ctrl></hp:run>'

    def _create_footnote(self, blocks):
        # Footnote Control
        body_xml = self._process_blocks(blocks)

        inst_id = str(self._get_next_id())

        xml = f'''<hp:run charPrIDRef="0"><hp:ctrl>
        <hp:footNote number="0" instId="{inst_id}">
             <hp:autoNum num="0" numType="FOOTNOTE"/>
             <hp:subList id="{inst_id}" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="TOP" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0">
                 {body_xml}
             </hp:subList>
        </hp:footNote>
        </hp:ctrl></hp:run>'''
        return xml

    def _get_char_pr_id(self, base_id, active_formats):
        # If no format updates, return base_id
        if not active_formats:
            return base_id

        base_id = str(base_id)

        # Check Cache
        cache_key = (base_id, frozenset(active_formats))
        if cache_key in self.char_pr_cache:
            return self.char_pr_cache[cache_key]

        # Create New CharPr
        if self.header_root is None:
            return base_id

        base_node = self.header_root.find(f'.//hh:charPr[@id="{base_id}"]', self.namespaces)
        if base_node is None:
            base_node = self.header_root.find('.//hh:charPr[@id="0"]', self.namespaces)
            if base_node is None:
                 return base_id

        new_node = copy.deepcopy(base_node)
        self.max_char_pr_id += 1
        new_id = str(self.max_char_pr_id)
        new_node.set('id', new_id)

        # Modify properties based on formats
        if 'BOLD' in active_formats:
            if new_node.find('hh:bold', self.namespaces) is None:
                ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}bold')

        if 'ITALIC' in active_formats:
            if new_node.find('hh:italic', self.namespaces) is None:
                ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}italic')

        if 'UNDERLINE' in active_formats:
            ul = new_node.find('hh:underline', self.namespaces)
            if ul is None:
                ul = ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}underline')
            ul.set('type', 'BOTTOM')
            ul.set('shape', 'SOLID')
            ul.set('color', '#000000')

        if 'COLOR_BLUE' in active_formats:
            tc = new_node.find('hh:textColor', self.namespaces)
            if tc is None:
                tc = ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}textColor')
            tc.set('value', '#0000FF')

            # Also force underline color to Blue if underline exists
            ul = new_node.find('hh:underline', self.namespaces)
            if ul is not None:
                ul.set('color', '#0000FF')

        if 'SUPERSCRIPT' in active_formats:
             sub = new_node.find('hh:subscript', self.namespaces)
             if sub is not None:
                 new_node.remove(sub)
             if new_node.find('hh:supscript', self.namespaces) is None:
                ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}supscript')

        elif 'SUBSCRIPT' in active_formats:
             sup = new_node.find('hh:supscript', self.namespaces)
             if sup is not None:
                 new_node.remove(sup)
             if new_node.find('hh:subscript', self.namespaces) is None:
                ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}subscript')

        # Add to Header
        char_props = self.header_root.find('.//hh:charProperties', self.namespaces)
        if char_props is not None:
            char_props.append(new_node)

        # Update Cache
        self.char_pr_cache[cache_key] = new_id

        return new_id

    # --- LIST HANDLING ---

    # Standard Numbering Definitions
    ORDERED_NUM_XML = """
    <hh:numbering id="{id}" start="1" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
      <hh:paraHead start="1" level="1" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">^1.</hh:paraHead>
      <hh:paraHead start="1" level="2" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="LATIN_CAPITAL" charPrIDRef="4294967295" checkable="0">^2.</hh:paraHead>
      <hh:paraHead start="1" level="3" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="ROMAN_SMALL" charPrIDRef="4294967295" checkable="0">^3.</hh:paraHead>
      <hh:paraHead start="1" level="4" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">^4.</hh:paraHead>
      <hh:paraHead start="1" level="5" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="LATIN_CAPITAL" charPrIDRef="4294967295" checkable="0">^5.</hh:paraHead>
      <hh:paraHead start="1" level="6" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="ROMAN_SMALL" charPrIDRef="4294967295" checkable="0">^6.</hh:paraHead>
      <hh:paraHead start="1" level="7" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">^7.</hh:paraHead>
    </hh:numbering>
    """

    BULLET_NUM_XML = """
    <hh:numbering id="{id}" start="1" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
      <hh:paraHead start="1" level="1" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">●</hh:paraHead>
      <hh:paraHead start="1" level="2" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">○</hh:paraHead>
      <hh:paraHead start="1" level="3" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">■</hh:paraHead>
      <hh:paraHead start="1" level="4" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">●</hh:paraHead>
      <hh:paraHead start="1" level="5" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">○</hh:paraHead>
      <hh:paraHead start="1" level="6" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">■</hh:paraHead>
      <hh:paraHead start="1" level="7" align="LEFT" useInstWidth="1" autoIndent="0" widthAdjust="0" textOffsetType="PERCENT" textOffset="50" numFormat="DIGIT" charPrIDRef="4294967295" checkable="0">●</hh:paraHead>
    </hh:numbering>
    """

    def _init_numbering_structure(self, root):
        # Ensure hh:numberings exists
        numberings_node = root.find('.//hh:numberings', self.namespaces)
        if numberings_node is None:
            numberings_node = ET.SubElement(root, '{http://www.hancom.co.kr/hwpml/2011/head}numberings')

    def _create_numbering(self, type='ORDERED', start_num=1):
        # Generate New ID
        root = self.header_root
        max_num_id = 0
        for num in root.findall('.//hh:numbering', self.namespaces):
            nid = int(num.get('id', 0))
            if nid > max_num_id:
                max_num_id = nid

        new_id = str(max_num_id + 1)

        # Get Template
        if type == 'ORDERED':
            template = self.ORDERED_NUM_XML
        else:
            template = self.BULLET_NUM_XML

        # Format and Inject
        xml_str = template.format(id=new_id).strip()
        new_node = ET.fromstring(xml_str)

        new_node.set('start', str(start_num))

        numberings_node = root.find('.//hh:numberings', self.namespaces)
        if numberings_node is None:
             self._init_numbering_structure(root)
             numberings_node = root.find('.//hh:numberings', self.namespaces)

        numberings_node.append(new_node)
        return new_id

    def _get_list_para_pr(self, num_id, level):
        base_id = self.normal_para_pr_id
        base_node = self.header_root.find(f'.//hh:paraPr[@id="{base_id}"]', self.namespaces)
        if base_node is None:
            return base_id

        new_node = copy.deepcopy(base_node)
        self.max_para_pr_id += 1
        new_id = str(self.max_para_pr_id)
        new_node.set('id', new_id)

        heading = new_node.find('hh:heading', self.namespaces)
        if heading is None:
            heading = ET.SubElement(new_node, '{http://www.hancom.co.kr/hwpml/2011/head}heading')
        heading.set('type', 'NUMBER')
        heading.set('idRef', str(num_id))
        heading.set('level', str(level))

        indent_per_level = 2000
        current_indent = (level) * indent_per_level

        for margin_node in new_node.findall('.//hc:left', self.namespaces):
            original_val = int(margin_node.get('value', 0))
            new_val = original_val + current_indent
            margin_node.set('value', str(new_val))

        hanging_val = 2000
        for intent_node in new_node.findall('.//hc:intent', self.namespaces):
            intent_node.set('value', str(-hanging_val))

        for left_node in new_node.findall('.//hc:left', self.namespaces):
            val = (level + 1) * hanging_val
            left_node.set('value', str(val))

        para_props = self.header_root.find('.//hh:paraProperties', self.namespaces)
        if para_props is not None:
            para_props.append(new_node)

        return new_id

    def _handle_bullet_list(self, content, level=0):
        num_id = self._create_numbering('BULLET')

        results = []
        for item_blocks in content:
            for i, block in enumerate(item_blocks):
                b_type = block.get('t')
                b_content = block.get('c')

                list_para_pr = self._get_list_para_pr(num_id, level)

                if b_type == 'Para' or b_type == 'Plain':
                     xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=list_para_pr)
                     xml += self._process_inlines(b_content)
                     xml += '</hp:p>'
                     results.append(xml)
                elif b_type == 'BulletList':
                    results.append(self._handle_bullet_list(b_content, level=level+1))
                elif b_type == 'OrderedList':
                    results.append(self._handle_ordered_list(b_content, level=level+1))
                else:
                    results.append(self._process_blocks([block]))

        return "\n".join(results)

    def _handle_ordered_list(self, content, level=0):
        # content = [ [start, style, delim], [items] ]
        attrs = content[0]
        start_num = attrs[0] if isinstance(attrs, list) and len(attrs) > 0 else 1
        items = content[1] if len(content) > 1 else []

        # Create UNIQUE ID for this list block
        num_id = self._create_numbering('ORDERED', start_num=start_num)

        results = []
        for item_blocks in items:
            for block in item_blocks:
                b_type = block.get('t')
                b_content = block.get('c')

                list_para_pr = self._get_list_para_pr(num_id, level)

                if b_type == 'Para' or b_type == 'Plain':
                     xml = self._create_para_start(style_id=self.normal_style_id, para_pr_id=list_para_pr)
                     xml += self._process_inlines(b_content)
                     xml += '</hp:p>'
                     results.append(xml)
                elif b_type == 'BulletList':
                     results.append(self._handle_bullet_list(b_content, level=level+1))
                elif b_type == 'OrderedList':
                     results.append(self._handle_ordered_list(b_content, level=level+1))
                else:
                     results.append(self._process_blocks([block]))

        return "\n".join(results)


def main():
    parser = argparse.ArgumentParser(description='Convert DOCX or other Pandoc-supported formats to HWPX')
    parser.add_argument('input', help='Input file (DOCX, MD, HTML, etc.)')
    parser.add_argument('output', help='Output HWPX file')
    parser.add_argument('--reference', default=None, help='Reference HWPX file (default: assets/reference_myungjo.hwpx)')

    args = parser.parse_args()

    # Determine reference path
    if args.reference:
        reference_path = args.reference
    else:
        # Try to find reference relative to this script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(script_dir)
        reference_path = os.path.join(parent_dir, 'assets', 'reference_myungjo.hwpx')

    # Validate input exists
    if not os.path.exists(args.input):
        print(f"[Error] Input file not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    # Validate reference exists
    if not os.path.exists(reference_path):
        print(f"[Error] Reference file not found: {reference_path}", file=sys.stderr)
        sys.exit(1)

    try:
        PandocToHwpx.convert_to_hwpx(args.input, args.output, reference_path)
    except Exception as e:
        print(f"[Error] Conversion failed: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
