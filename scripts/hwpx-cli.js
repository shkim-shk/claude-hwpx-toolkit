#!/usr/bin/env node
/**
 * HWPX CLI - Command-line interface for HWPX/HWP document manipulation
 * Wraps the hwp-extension library for use as a Claude skill.
 *
 * Usage: node hwpx-cli.js <command> [args...]
 *
 * Documents are kept in memory via a state file between invocations.
 * Each open document is stored as a serialized buffer so edits persist.
 */

const path = require('path');
const fs = require('fs');

// Load bundled HwpxDocument (all dependencies included)
const { HwpxDocument } = require(path.join(__dirname, 'HwpxDocument.bundle.js'));

const STATE_DIR = process.env.HWPX_STATE_DIR || '/tmp/hwpx-state';
if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });
const STATE_FILE = path.join(STATE_DIR, 'documents.json');

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function loadRegistry() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function saveRegistry(reg) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(reg, null, 2));
}

// Save document buffer for persistence between CLI calls
function saveDocBuffer(docId, buffer) {
  fs.writeFileSync(path.join(STATE_DIR, `doc-${docId}.buf`), buffer);
}

function loadDocBuffer(docId) {
  const bufPath = path.join(STATE_DIR, `doc-${docId}.buf`);
  if (!fs.existsSync(bufPath)) return null;
  return fs.readFileSync(bufPath);
}

async function getDocument(docId) {
  const reg = loadRegistry();
  if (!reg[docId]) throw new Error(`Document not found: ${docId}. Use 'open' command first.`);

  // Try to load from saved buffer first (preserves edits)
  let buffer = loadDocBuffer(docId);
  if (!buffer) {
    // Fallback to original file
    buffer = fs.readFileSync(reg[docId].filePath);
  }

  const doc = await HwpxDocument.createFromBuffer(docId, reg[docId].filePath, buffer);
  return doc;
}

async function saveDoc(docId, doc, outputPath) {
  const reg = loadRegistry();
  const data = await doc.save();

  // Always save buffer for persistence
  saveDocBuffer(docId, data);

  // Write to file
  const savePath = outputPath ? path.resolve(outputPath) : reg[docId].filePath;
  fs.writeFileSync(savePath, data);

  if (outputPath) {
    reg[docId].filePath = savePath;
    saveRegistry(reg);
  }

  return savePath;
}

function parseJson(str) {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch (e) {
    throw new Error(`Invalid JSON argument: ${str}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help') {
    const help = {
      usage: 'node hwpx-cli.js <command> [args...]',
      document_management: ['open <file_path>', 'save <doc_id> [output_path]', 'close <doc_id>', 'list', 'create \'{"file_path":"path.hwpx"}\''],
      reading: ['get-text <doc_id>', 'get-structure <doc_id>', 'get-metadata <doc_id>', 'get-paragraphs <doc_id> [section]', 'get-tables <doc_id>', 'word-count <doc_id>'],
      editing: ['insert-paragraph <doc_id> \'{"text":"..."}\'', 'update-paragraph <doc_id> \'{"section_index":0,"paragraph_index":0,"text":"..."}\'', 'delete-paragraph <doc_id> \'{"paragraph_index":0}\'', 'replace <doc_id> \'{"old_text":"...","new_text":"..."}\'', 'batch-replace <doc_id> \'{"replacements":[...]}\''],
      tables: ['insert-table <doc_id> \'{"rows":3,"cols":3}\'', 'update-cell <doc_id> \'{"section_index":0,"table_index":0,"row":0,"col":0,"text":"..."}\'', 'insert-row / delete-row / insert-column / delete-column / merge-cells'],
      styling: ['set-text-style <doc_id> <json>', 'set-para-style <doc_id> <json>', 'set-page <doc_id> <json>', 'set-header / set-footer <doc_id> <json>'],
      export: ['export-text <doc_id> <path>', 'export-html <doc_id> <path>']
    };
    console.log(JSON.stringify(help, null, 2));
    return;
  }

  try {
    let result;

    switch (command) {
      case 'open': {
        const filePath = path.resolve(args[1]);
        if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

        const data = fs.readFileSync(filePath);
        const docId = generateId();
        const doc = await HwpxDocument.createFromBuffer(docId, filePath, data);

        const reg = loadRegistry();
        reg[docId] = { filePath, format: doc.format };
        saveRegistry(reg);
        saveDocBuffer(docId, data);

        result = {
          doc_id: docId,
          format: doc.format,
          file_path: filePath,
          structure: doc.getStructure(),
          metadata: doc.getMetadata()
        };
        break;
      }

      case 'save': {
        const doc = await getDocument(args[1]);
        const savePath = await saveDoc(args[1], doc, args[2]);
        result = { saved: savePath };
        break;
      }

      case 'close': {
        const reg = loadRegistry();
        if (reg[args[1]]) {
          delete reg[args[1]];
          saveRegistry(reg);
          try { fs.unlinkSync(path.join(STATE_DIR, `doc-${args[1]}.buf`)); } catch(e) {}
        }
        result = { closed: args[1] };
        break;
      }

      case 'list': {
        const reg = loadRegistry();
        result = Object.entries(reg).map(([id, info]) => ({ doc_id: id, ...info }));
        break;
      }

      case 'create': {
        const opts = parseJson(args[1]);
        const filePath = path.resolve(opts.file_path || 'new_document.hwpx');
        const doc = new HwpxDocument();
        await doc.createNew(filePath, opts);
        const data = await doc.save();

        const docId = generateId();
        const reg = loadRegistry();
        reg[docId] = { filePath, format: 'hwpx' };
        saveRegistry(reg);

        fs.writeFileSync(filePath, data);
        saveDocBuffer(docId, data);

        result = { doc_id: docId, file_path: filePath };
        break;
      }

      case 'get-text': {
        const doc = await getDocument(args[1]);
        result = { text: doc.getAllText() };
        break;
      }

      case 'get-structure': {
        const doc = await getDocument(args[1]);
        result = doc.getStructure();
        break;
      }

      case 'get-metadata': {
        const doc = await getDocument(args[1]);
        result = doc.getMetadata();
        break;
      }

      case 'set-metadata': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setMetadata(opts);
        await saveDoc(args[1], doc);
        result = { updated: true, metadata: doc.getMetadata() };
        break;
      }

      case 'get-paragraphs': {
        const doc = await getDocument(args[1]);
        const sectionIdx = args[2] !== undefined ? parseInt(args[2]) : undefined;
        result = doc.getParagraphs(sectionIdx);
        break;
      }

      case 'get-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.getParagraph(opts.section_index, opts.paragraph_index);
        break;
      }

      case 'insert-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.insertParagraph(opts.text, opts.section_index, opts.after_index);
        await saveDoc(args[1], doc);
        break;
      }

      case 'update-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.updateParagraphText(opts.section_index, opts.paragraph_index, opts.text, opts.run_index);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'delete-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.deleteParagraph(opts.section_index || 0, opts.paragraph_index);
        await saveDoc(args[1], doc);
        result = { deleted: true };
        break;
      }

      case 'append-text': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.appendTextToParagraph(opts.section_index, opts.paragraph_index, opts.text);
        await saveDoc(args[1], doc);
        result = { appended: true };
        break;
      }

      case 'search': {
        const doc = await getDocument(args[1]);
        result = doc.searchText(args[2], { caseSensitive: false });
        break;
      }

      case 'replace': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.replaceText(opts.old_text, opts.new_text, {
          caseSensitive: opts.case_sensitive,
          regex: opts.regex,
          replaceAll: opts.replace_all !== false
        });
        await saveDoc(args[1], doc);
        break;
      }

      case 'batch-replace': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        let total = 0;
        for (const r of opts.replacements) {
          const res = doc.replaceText(r.old_text, r.new_text, { replaceAll: true });
          total += (res.replacements_made || 0);
        }
        await saveDoc(args[1], doc);
        result = { total_replacements: total };
        break;
      }

      case 'get-tables': {
        const doc = await getDocument(args[1]);
        result = doc.getTables();
        break;
      }

      case 'get-table': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.getTable(opts.section_index, opts.table_index);
        break;
      }

      case 'insert-table': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.insertTable(opts.rows, opts.cols, opts.section_index, opts.after_index, opts.width);
        await saveDoc(args[1], doc);
        break;
      }

      case 'update-cell': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.updateTableCell(opts.section_index, opts.table_index, opts.row, opts.col, opts.text);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'insert-row': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.insertTableRow(opts.section_index, opts.table_index, opts.after_row, opts.cell_texts);
        await saveDoc(args[1], doc);
        break;
      }

      case 'delete-row': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.deleteTableRow(opts.section_index, opts.table_index, opts.row_index);
        await saveDoc(args[1], doc);
        result = { deleted: true };
        break;
      }

      case 'insert-column': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.insertTableColumn(opts.section_index, opts.table_index, opts.after_col);
        await saveDoc(args[1], doc);
        result = { inserted: true };
        break;
      }

      case 'delete-column': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.deleteTableColumn(opts.section_index, opts.table_index, opts.col_index);
        await saveDoc(args[1], doc);
        result = { deleted: true };
        break;
      }

      case 'merge-cells': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.mergeCells(opts.section_index, opts.table_index,
          opts.start_row, opts.start_col, opts.end_row, opts.end_col);
        await saveDoc(args[1], doc);
        result = { merged: true };
        break;
      }

      case 'table-csv': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.getTableAsCsv(opts.section_index, opts.table_index, opts.delimiter);
        break;
      }

      case 'set-cell-props': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setCellProperties(opts.section_index, opts.table_index, opts.row, opts.col, {
          width: opts.width, height: opts.height,
          backgroundColor: opts.background_color, verticalAlign: opts.vertical_align
        });
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'set-text-style': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.applyCharacterStyle(opts.section_index, opts.paragraph_index, opts.run_index || 0, {
          bold: opts.bold, italic: opts.italic, underline: opts.underline,
          strikethrough: opts.strikethrough, fontName: opts.font_name,
          fontSize: opts.font_size, fontColor: opts.font_color,
          backgroundColor: opts.background_color
        });
        await saveDoc(args[1], doc);
        result = { styled: true };
        break;
      }

      case 'get-text-style': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.getCharacterStyle(opts.section_index, opts.paragraph_index, opts.run_index);
        break;
      }

      case 'set-para-style': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.applyParagraphStyle(opts.section_index, opts.paragraph_index, {
          align: opts.align, lineSpacing: opts.line_spacing,
          marginLeft: opts.margin_left, marginRight: opts.margin_right,
          marginTop: opts.margin_top, marginBottom: opts.margin_bottom,
          firstLineIndent: opts.first_line_indent
        });
        await saveDoc(args[1], doc);
        result = { styled: true };
        break;
      }

      case 'get-para-style': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.getParagraphStyle(opts.section_index, opts.paragraph_index);
        break;
      }

      case 'set-page': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setPageSettings(opts);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'get-page': {
        const doc = await getDocument(args[1]);
        const sIdx = args[2] !== undefined ? parseInt(args[2]) : 0;
        result = doc.getPageSettings(sIdx);
        break;
      }

      case 'set-header': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setHeader(opts.section_index || 0, opts.text, opts.align);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'get-header': {
        const doc = await getDocument(args[1]);
        result = doc.getHeader(args[2] !== undefined ? parseInt(args[2]) : 0);
        break;
      }

      case 'set-footer': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setFooter(opts.section_index || 0, opts.text, opts.include_page_number, opts.align);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'get-footer': {
        const doc = await getDocument(args[1]);
        result = doc.getFooter(args[2] !== undefined ? parseInt(args[2]) : 0);
        break;
      }

      case 'create-bullet-list': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.createBulletedList(opts.section_index || 0, opts.items, opts.after_element_index, opts.bullet_char);
        await saveDoc(args[1], doc);
        break;
      }

      case 'create-number-list': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.createNumberedList(opts.section_index || 0, opts.items, opts.after_element_index, opts.start_number, opts.format);
        await saveDoc(args[1], doc);
        break;
      }

      case 'set-numbering': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        doc.setParagraphNumbering(opts.section_index, opts.paragraph_index, opts.type, opts.level);
        await saveDoc(args[1], doc);
        result = { updated: true };
        break;
      }

      case 'export-text': {
        const doc = await getDocument(args[1]);
        const outPath = path.resolve(args[2]);
        const text = doc.getAllText();
        fs.writeFileSync(outPath, text);
        result = { exported: outPath };
        break;
      }

      case 'export-html': {
        const doc = await getDocument(args[1]);
        const outPath = path.resolve(args[2]);
        // Build basic HTML from text
        const text = doc.getAllText();
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>HWPX Export</title></head><body><pre>${text}</pre></body></html>`;
        fs.writeFileSync(outPath, html);
        result = { exported: outPath };
        break;
      }

      case 'word-count': {
        const doc = await getDocument(args[1]);
        result = doc.getWordCount();
        break;
      }

      case 'get-images': {
        const doc = await getDocument(args[1]);
        result = doc.getImages();
        break;
      }

      case 'undo': {
        const doc = await getDocument(args[1]);
        result = doc.undo();
        await saveDoc(args[1], doc);
        break;
      }

      case 'redo': {
        const doc = await getDocument(args[1]);
        result = doc.redo();
        await saveDoc(args[1], doc);
        break;
      }

      case 'copy-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.copyParagraph(opts.source_section || 0, opts.source_paragraph,
          opts.target_section || 0, opts.target_after);
        await saveDoc(args[1], doc);
        break;
      }

      case 'move-paragraph': {
        const doc = await getDocument(args[1]);
        const opts = parseJson(args[2]);
        result = doc.moveParagraph(opts.source_section || 0, opts.source_paragraph,
          opts.target_section || 0, opts.target_after);
        await saveDoc(args[1], doc);
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        console.error('Use "node hwpx-cli.js help" for available commands.');
        process.exit(1);
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
