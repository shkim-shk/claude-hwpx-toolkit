---
name: hwpx
description: "한글(HWPX) 문서의 모든 작업을 처리하는 통합 스킬. Markdown→HWPX 변환, DOCX→HWPX 변환, 기존 HWPX 편집(텍스트 치환/표 수정/서식 변경), 레퍼런스 HWPX 분석 후 구조 복원, 템플릿 기반 공문/보고서/회의록/제안서 생성, XML 직접 작성, 텍스트 추출, 검증을 모두 지원합니다. 사용자가 hwpx, 한글 문서, 한글 파일, .hwpx와 관련된 어떤 요청이든 반드시 이 스킬을 사용하세요. 'hwpx로 변환해줘', '한글 문서 만들어줘', '한글 파일 수정해줘', 'hwpx 분석해줘', '공문 작성해줘', '보고서 hwpx로', 'docx를 hwpx로', 'markdown을 한글로', 'hwpx 텍스트 뽑아줘', 'hwpx에서 바꿔줘' 같은 표현이 나오면 트리거합니다. .hwpx 파일이 첨부되거나, 한글 문서 생성/편집/변환/읽기가 필요한 모든 상황에서 이 스킬을 사용합니다."
---

# HWPX 통합 스킬

한컴오피스 한글(HWPX) 문서의 **생성 · 변환 · 편집 · 분석 · 검증**을 하나로 통합한 스킬.

이 스킬은 작업 유형에 따라 4가지 모드로 동작한다. 사용자의 요청을 파악하여 적합한 모드를 선택하면 된다.

---

## 모드 선택 가이드

| 사용자 요청 | 모드 | 핵심 도구 |
|-------------|------|-----------|
| "이 Markdown을 한글 파일로 만들어줘" | **A. Markdown → HWPX 변환** | `md2hwpx_improved.py` |
| "이 Word 파일을 hwpx로 변환해줘" | **B. DOCX → HWPX 변환** | `docx2hwpx.py` |
| "이 hwpx 파일에서 텍스트 바꿔줘" / "표 수정해줘" | **C. 기존 HWPX 편집** | `hwpx-cli.js` 또는 unpack/pack |
| "공문 작성해줘" / "보고서를 한글로" / hwpx 첨부 후 "이걸 기반으로 새로 만들어줘" | **D. XML 직접 생성** | `build_hwpx.py` + 템플릿 |
| "이 hwpx 분석해줘" / "텍스트 뽑아줘" / "검증해줘" | **E. 분석/추출/검증** | `analyze_template.py`, `text_extract.py`, `validate.py` |

---

## 환경 설정 (Claude가 자동 수행)

모든 스크립트 실행 전에 아래 블록을 먼저 실행할 것. 사용자에게 별도 안내 없이 투명하게 처리한다.

```bash
# SKILL_DIR 자동 감지
SKILL_DIR="$(find /sessions -path '*/hwpx/SKILL.md' -print -quit 2>/dev/null | xargs dirname)"

# Python 가상환경 (lxml 등 의존성)
if [ ! -f "$SKILL_DIR/.venv/bin/activate" ]; then
  python3 -m venv "$SKILL_DIR/.venv"
  "$SKILL_DIR/.venv/bin/pip" install --quiet lxml 2>/dev/null
fi
source "$SKILL_DIR/.venv/bin/activate" 2>/dev/null || true

# Node.js CLI 경로
HWPX_CLI="$SKILL_DIR/scripts/hwpx-cli.js"
```

`text_extract.py`와 `create_document.py`는 추가로 `python-hwpx`가 필요하므로 해당 스크립트 실행 전에 `pip install --quiet python-hwpx 2>/dev/null`을 자동 실행한다.

`docx2hwpx.py`는 `pypandoc`과 시스템 Pandoc이 필요하다. 없으면 `pip install --quiet pypandoc 2>/dev/null`을 실행하고, Pandoc이 설치되지 않았으면 사용자에게 안내한다.

---

## 모드 A: Markdown → HWPX 변환

Markdown 콘텐츠를 서식이 적용된 HWPX 문서로 변환한다. 명조체와 고딕체 두 가지 스타일을 내장한다.

### 스타일 옵션

| 옵션 | 한글 폰트 | 영문 폰트 | 용도 | 레퍼런스 파일 |
|------|-----------|-----------|------|---------------|
| **명조** (기본) | 나눔명조 | Times New Roman | 연구계획서, 논문, 공식 문서 | `assets/reference_myungjo.hwpx` |
| **고딕** | 나눔고딕 | Arial | 발표자료, 기술문서, 보고서 | `assets/reference_gothic.hwpx` |

### 스타일 선택 기준

- "명조", "나눔명조", "serif" 언급 → 명조 레퍼런스
- "고딕", "나눔고딕", "gothic", "sans-serif" 언급 → 고딕 레퍼런스
- "둘 다", "두 버전" → 명조/고딕 모두 생성
- 스타일 지정 없으면 → 사용자에게 선택 요청

### 공통 서식 사양

- Heading 1: 20pt bold, 문단 전 800, 후 200
- Heading 2: 16pt bold, 문단 전 600, 후 200
- Heading 3: 13pt bold, 문단 전 400, 후 150
- Heading 4: 11.5pt bold, 문단 전 300, 후 100
- Heading 5: 10pt bold italic, 문단 전 200, 후 100
- Heading 6: 10pt bold, 문단 전 200, 후 100
- Body Text: 10.5pt, 줄간격 180%
- Source Code: 9.5pt, 줄간격 130%
- Table Cell: 줄간격 140%
- Block Text (인용문): italic, 줄간격 170%

### 지원 Markdown 요소

`#`~`######` 제목, 본문 문단, `**bold**`/`*italic*`/`***bold italic***`, 파이프 테이블, 펜스드 코드 블록, `>` 인용문, 불릿/번호 리스트, `---` 수평선, `**1. 제목**` 패턴 → heading 자동 변환

### 실행

**중요: 변환 후 반드시 후처리(postprocess_hwpx.py)를 실행할 것.** 후처리 없이는 표 너비 초과, 열 균등 분할, 문단 간격 과대, 셀 여백 부족 등 품질 문제가 발생한다.

```bash
# 명조 변환 + 후처리
python3 "$SKILL_DIR/scripts/md2hwpx_improved.py" \
  input.md output.hwpx "$SKILL_DIR/assets/reference_myungjo.hwpx"
python3 "$SKILL_DIR/scripts/postprocess_hwpx.py" output.hwpx

# 고딕 변환 + 후처리
python3 "$SKILL_DIR/scripts/md2hwpx_improved.py" \
  input.md output.hwpx "$SKILL_DIR/assets/reference_gothic.hwpx"
python3 "$SKILL_DIR/scripts/postprocess_hwpx.py" output.hwpx

# 사용자 커스텀 레퍼런스 + 후처리
python3 "$SKILL_DIR/scripts/md2hwpx_improved.py" \
  input.md output.hwpx user_reference.hwpx
python3 "$SKILL_DIR/scripts/postprocess_hwpx.py" output.hwpx
```

### 후처리 (postprocess_hwpx.py)가 수행하는 작업

| 항목 | 설명 |
|------|------|
| 표 너비 | 본문폭(46489 HWPUNIT)에 맞춤 |
| 열 너비 | 내용 길이 기반 동적 배분 (한글 2, 영문 1 가중치) |
| 빈 문단 | 연속 빈 줄을 최대 1개로 축소 |
| Heading 간격 | 문단 위/아래 1pt로 축소 (spacing + margin prev/next 모두) |
| 표 셀 정렬 | LEFT 정렬 paraPr 자동 생성 + 적용 |
| 표 셀 높이 | 내용 기반 행 높이 확장 → vertAlign=CENTER로 위아래 여백 확보 |

---

## 모드 B: DOCX → HWPX 변환

Word(.docx) 문서를 Pandoc AST를 거쳐 HWPX로 변환한다.
Pandoc이 DOCX를 JSON AST로 파싱하고, 변환 스크립트가 이를 HWPX XML로 재구성한다.

### 지원 요소

제목(H1~H6), 본문, Bold/Italic/Underline/Superscript/Subscript, 하이퍼링크, 이미지(자동 크기 계산), 테이블(rowspan/colspan), 번호/불릿 목록, 코드 블록, 각주

### 실행

```bash
# 기본 변환 (내장 blank.hwpx 레퍼런스 사용)
python3 "$SKILL_DIR/scripts/docx2hwpx.py" \
  input.docx output.hwpx

# 커스텀 레퍼런스 사용
python3 "$SKILL_DIR/scripts/docx2hwpx.py" \
  input.docx output.hwpx --reference custom.hwpx

# Markdown 파일도 가능 (Pandoc이 파싱)
python3 "$SKILL_DIR/scripts/docx2hwpx.py" \
  input.md output.hwpx
```

### 주의사항

- 시스템에 Pandoc이 설치되어 있어야 한다
- Pandoc API 1.20(구버전)과 1.22+(신버전) 모두 호환
- DOCX 내 이미지는 자동 추출되어 HWPX에 임베드
- 복잡한 레이아웃(다단, 텍스트 박스 등)은 단순화될 수 있음

---

## 모드 C: 기존 HWPX 편집

기존 HWPX 문서를 열어서 텍스트 치환, 표 수정, 서식 변경 등을 수행한다.
두 가지 방식 중 택일:

### 방식 1: CLI 도구 (hwpx-cli.js) — 간단한 편집

```bash
# 문서 열기 → doc_id 반환
DOC=$(node $HWPX_CLI open document.hwpx)
DOC_ID=$(echo $DOC | python3 -c "import sys,json; print(json.load(sys.stdin)['doc_id'])")

# 텍스트 치환
node $HWPX_CLI replace $DOC_ID '{"old_text":"2025년","new_text":"2026년","replace_all":true}'

# 표 셀 수정
node $HWPX_CLI update-cell $DOC_ID '{"section_index":0,"table_index":0,"row":1,"col":2,"text":"수정값"}'

# 저장
node $HWPX_CLI save $DOC_ID output.hwpx
node $HWPX_CLI close $DOC_ID
```

### 방식 2: XML 직접 편집 (unpack/pack) — 정밀한 편집

```bash
# HWPX → XML 디렉토리
python3 "$SKILL_DIR/scripts/office/unpack.py" document.hwpx ./unpacked/

# XML 직접 편집 (Read/Edit 도구 사용)
#   본문: ./unpacked/Contents/section0.xml
#   스타일: ./unpacked/Contents/header.xml

# 다시 HWPX로 패키징
python3 "$SKILL_DIR/scripts/office/pack.py" ./unpacked/ edited.hwpx

# 검증
python3 "$SKILL_DIR/scripts/validate.py" edited.hwpx
```

### CLI 주요 명령어

| 영역 | 명령 | 설명 |
|------|------|------|
| **문서** | `open`, `save`, `close`, `create`, `list` | 열기/저장/닫기/생성 |
| **읽기** | `get-text`, `get-paragraphs`, `get-tables`, `get-structure`, `get-metadata`, `word-count` | 텍스트/구조/메타데이터 추출 |
| **텍스트 편집** | `insert-paragraph`, `update-paragraph`, `delete-paragraph`, `append-text` | 단락 추가/수정/삭제 |
| **검색/치환** | `search`, `replace`, `batch-replace` | 텍스트 찾기/바꾸기/일괄 |
| **테이블** | `get-table`, `insert-table`, `update-cell`, `insert-row`, `delete-row`, `insert-column`, `delete-column`, `merge-cells`, `table-csv`, `set-cell-props` | 표 전체 CRUD |
| **서식** | `set-text-style`, `get-text-style`, `set-para-style`, `get-para-style` | 글꼴/단락 서식 |
| **레이아웃** | `set-page`, `get-page`, `set-header`, `set-footer`, `get-header`, `get-footer` | 페이지/머리글/바닥글 |
| **기타** | `export-text`, `export-html`, `undo`, `redo`, `copy-paragraph`, `move-paragraph`, `get-images`, `set-metadata` | 내보내기/메타/이미지 |

CLI 상세 옵션은 각 명령에 `--help`를 붙이거나, 기존 hwpx-editor 스킬 문서를 참조.

---

## 모드 D: XML 직접 생성 (템플릿 기반)

HWPX의 XML 구조를 직접 작성하여 문서를 생성한다. 레퍼런스 기반 복원이나 공문/보고서 등 정형 문서에 적합하다.

### 사용자가 HWPX를 첨부한 경우 — 레퍼런스 기반 복원

사용자가 `.hwpx`를 첨부하면 이 모드를 기본으로 따른다:

1. `analyze_template.py`로 header.xml, section0.xml 추출
2. 구조 복원: 스타일 ID, 표 구조, 셀 병합, 여백, 문단 흐름을 동일하게 유지
3. 사용자 요청 텍스트/데이터만 교체
4. `build_hwpx.py` + `validate.py`로 빌드 및 검증
5. `page_guard.py`로 쪽수 드리프트 검사 (필수)

```bash
# 1) 레퍼런스 분석
python3 "$SKILL_DIR/scripts/analyze_template.py" reference.hwpx \
  --extract-header /tmp/ref_header.xml \
  --extract-section /tmp/ref_section.xml

# 2) section0.xml 복제 후 텍스트만 수정하여 /tmp/new_section0.xml 작성

# 3) 빌드
python3 "$SKILL_DIR/scripts/build_hwpx.py" \
  --header /tmp/ref_header.xml \
  --section /tmp/new_section0.xml \
  --output result.hwpx

# 4) 검증 + 쪽수 가드
python3 "$SKILL_DIR/scripts/validate.py" result.hwpx
python3 "$SKILL_DIR/scripts/page_guard.py" --reference reference.hwpx --output result.hwpx
```

### 레퍼런스 없이 새 문서 생성 — 템플릿 사용

```bash
# 템플릿 목록: base, gonmun, report, minutes, proposal
python3 "$SKILL_DIR/scripts/build_hwpx.py" --template gonmun --output result.hwpx

# 커스텀 section0.xml 사용
python3 "$SKILL_DIR/scripts/build_hwpx.py" --template report \
  --section my_section0.xml --output result.hwpx

# 메타데이터 설정
python3 "$SKILL_DIR/scripts/build_hwpx.py" --template report --section my.xml \
  --title "제목" --creator "작성자" --output result.hwpx
```

### section0.xml 작성 가이드

첫 문단의 첫 run에 반드시 `<hp:secPr>`과 `<hp:colPr>` 포함. `templates/base/Contents/section0.xml`을 참조.

```xml
<!-- 문단 -->
<hp:p id="고유ID" paraPrIDRef="문단스타일ID" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
  <hp:run charPrIDRef="글자스타일ID"><hp:t>텍스트</hp:t></hp:run>
</hp:p>

<!-- 빈 줄 -->
<hp:p id="고유ID" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
  <hp:run charPrIDRef="0"><hp:t/></hp:run>
</hp:p>

<!-- 서식 혼합 -->
<hp:p id="고유ID" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
  <hp:run charPrIDRef="0"><hp:t>일반 </hp:t></hp:run>
  <hp:run charPrIDRef="7"><hp:t>볼드</hp:t></hp:run>
</hp:p>
```

### 표 크기 계산

- A4 본문폭: 42520 HWPUNIT = 59528(용지) − 8504×2(좌우여백)
- 열 너비 합 = 42520 (예: 3열 균등 → 14173 + 14173 + 14174)
- 행 높이: 셀당 보통 2400~3600 HWPUNIT

### 템플릿별 스타일 ID 맵 (핵심)

상세는 `references/hwpx-format.md` 참조.

**base**: charPr 0 (10pt 함초롬바탕), charPr 1 (10pt 함초롬돋움), paraPr 0 (JUSTIFY 160%)

**gonmun**: charPr 7 (22pt 볼드 기관명), charPr 8 (16pt 볼드), charPr 9 (8pt 하단), charPr 10 (10pt 볼드 표 헤더), paraPr 20 (CENTER), paraPr 21 (CENTER 130%), borderFill 3 (SOLID 테두리), borderFill 4 (배경색)

**report**: charPr 7 (20pt 제목), charPr 8 (14pt 소제목), charPr 13 (12pt 섹션 헤더), paraPr 24~26 (들여쓰기 600/1200/1800), borderFill 5 (상하단 선)

**minutes/proposal**: `references/hwpx-format.md` 참조

---

## 모드 E: 분석 / 추출 / 검증

```bash
# HWPX 구조 분석
python3 "$SKILL_DIR/scripts/analyze_template.py" document.hwpx

# 텍스트 추출
python3 "$SKILL_DIR/scripts/text_extract.py" document.hwpx
python3 "$SKILL_DIR/scripts/text_extract.py" document.hwpx --include-tables
python3 "$SKILL_DIR/scripts/text_extract.py" document.hwpx --format markdown

# 검증
python3 "$SKILL_DIR/scripts/validate.py" document.hwpx

# 대안: unpack으로 XML 직접 읽기
python3 "$SKILL_DIR/scripts/office/unpack.py" document.hwpx ./unpacked/
```

---

## 99% 복원 기준 (레퍼런스 기반 작업 시)

- `charPrIDRef`, `paraPrIDRef`, `borderFillIDRef` 참조 체계 동일
- 표의 `rowCnt`, `colCnt`, `colSpan`, `rowSpan`, `cellSz`, `cellMargin` 동일
- 문단 순서, 문단 수, 빈 줄/구획 위치 동일
- 페이지/여백/섹션(secPr) 동일
- 변경은 사용자 요청 범위로 제한
- 결과 쪽수는 레퍼런스와 동일해야 함
- `validate.py` + `page_guard.py` 모두 통과 필수

---

## 단위 변환

| 값 | HWPUNIT | 의미 |
|----|---------|------|
| 1pt | 100 | 기본 단위 |
| 10pt | 1000 | 기본 글자크기 |
| 1mm | 283.5 | 밀리미터 |
| A4 폭 | 59528 | 210mm |
| A4 높이 | 84186 | 297mm |
| 좌우여백 | 8504 | 30mm |
| 본문폭 | 42520 | 150mm |

---

## 핵심 규칙

1. **HWPX만 지원**: `.hwp`(바이너리)는 읽기 전용. 편집 필요시 HWPX 재저장 안내
2. **secPr 필수**: section0.xml 첫 문단 첫 run에 secPr + colPr 포함
3. **mimetype 순서**: HWPX 패키징 시 mimetype은 첫 번째 ZIP 엔트리, ZIP_STORED
4. **네임스페이스 보존**: XML 편집 시 `hp:`, `hs:`, `hh:`, `hc:` 접두사 유지
5. **itemCnt 정합성**: header.xml의 charProperties/paraProperties/borderFills itemCnt가 실제 자식 수와 일치
6. **ID 참조 정합성**: section0.xml의 charPrIDRef/paraPrIDRef가 header.xml 정의와 일치
7. **검증 필수**: 생성 후 반드시 `validate.py`로 무결성 확인
8. **레퍼런스 우선**: 사용자가 HWPX를 첨부하면 `analyze_template.py` 기반 복원 모드 사용
9. **쪽수 동일**: 레퍼런스 기반 작업에서 `page_guard.py` 필수 통과
10. **구조 변경 제한**: 사용자 요청 없이 문단/표의 추가·삭제·분할·병합 금지
11. **build_hwpx.py 우선**: 새 문서 생성은 build_hwpx.py 사용
12. **빈 줄**: `<hp:t/>` 사용 (self-closing tag)
13. **linesegarray 제거 (필수)**: 텍스트를 프로그래밍으로 삽입/변경할 때 반드시 `hp:linesegarray`를 모두 제거해야 한다. 이것은 한글의 줄 배치 캐시로, 원본 양식의 빈 셀 캐시가 남아있으면 긴 텍스트가 1줄로 렌더링되면서 **글자가 중첩되는 치명적 현상** 발생. 제거하면 한글이 열 때 자동 재계산. 코드: `for lsa in element.findall('.//hp:linesegarray', ns): lsa.getparent().remove(lsa)`
14. **표 pageBreak 설정**: 내용이 많아 페이지를 넘어가는 표는 `pageBreak="CELL"`로 설정. `"TABLE"`이면 표 전체가 한 페이지에 안 들어갈 때 잘리거나 다음 페이지로 통째로 넘어감
15. **표 treatAsChar 설정 (필수)**: 표의 `<hp:pos>` 요소에서 반드시 `treatAsChar="0"`으로 설정해야 함. `treatAsChar="1"`이면 표가 글자처럼 취급되어 **페이지 경계에서 분할되지 않고 표가 잘리는 치명적 현상** 발생. `pageBreak="CELL"`이 설정되어 있어도 `treatAsChar="1"`이면 무시됨. md2hwpx_improved.py에서는 이미 `"0"`으로 설정되어 있으나, XML 직접 생성 시 반드시 확인할 것
16. **공통서식 제안서 제목 표 rowSpan 병합 (필수)**: md2hwpx_improved.py로 공통서식 제안서(Concept Paper)를 생성할 때, 제목 표("제목: 해결하고 싶은 보건의료 분야 난제는?")의 Row0 Cell(0,0)에 반드시 `rowSpan="2"`를 설정하고, Row1의 빈 첫 셀(colAddr=0)을 제거해야 한다. MD 파이프 테이블은 셀 병합을 표현할 수 없어서 3셀×2행으로 변환되지만, 원본 양식은 첫 열이 2행 병합된 3열×2행 구조(열 너비: 9857/5665/30967)이다. 후처리 코드: `cell0.find('hc:cellSpan').set('rowSpan', '2'); row1.remove(row1_cells[0])`

---

## 스크립트 전체 목록

| 스크립트 | 모드 | 용도 |
|----------|------|------|
| `scripts/md2hwpx_improved.py` | A | Markdown → HWPX 변환 |
| `scripts/docx2hwpx.py` | B | DOCX/기타 → HWPX 변환 (Pandoc 경유) |
| `scripts/hwpx-cli.js` | C | HWPX 편집 CLI (Node.js) |
| `scripts/build_hwpx.py` | D | 템플릿 + XML → HWPX 조립 |
| `scripts/analyze_template.py` | D/E | HWPX 심층 분석 |
| `scripts/validate.py` | 공통 | HWPX 구조 검증 |
| `scripts/page_guard.py` | D | 레퍼런스 대비 쪽수 검사 |
| `scripts/text_extract.py` | E | 텍스트 추출 (python-hwpx 필요) |
| `scripts/create_document.py` | D | Markdown/JSON → HWPX 간편 생성 |
| `scripts/postprocess_hwpx.py` | A/B | **HWPX 후처리 (필수)** — 표 너비/열 비율, 문단 간격, 빈 줄, 셀 높이 |
| `scripts/md_to_hwpx_form2.py` | D | **MD → HWPX 서식2(도전적 문제 정의서)** — 양식에서 header/표1/표2만 복사, 본문 표3은 6행×2열 직접 XML 생성 (작성시 고려사항 제거, treatAsChar=0, cellMargin 1.5mm) |
| `scripts/md_to_docx.py` | — | MD → DOCX 서식1(Concept Paper) 변환 |
| `scripts/md_to_docx_form2.py` | — | MD → DOCX 서식2(도전적 문제 정의서) 변환 |
| `scripts/office/unpack.py` | C/E | HWPX → XML 디렉토리 |
| `scripts/office/pack.py` | C | XML 디렉토리 → HWPX |
