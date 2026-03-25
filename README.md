# Claude HWPX Toolkit

한컴오피스 한글(HWPX) 및 Word(DOCX) 문서 생성/변환/편집 도구 모음.
Claude Code의 스킬(skill)로 사용하거나, 독립 스크립트로 실행할 수 있습니다.

## 주요 기능

| 기능 | 스크립트 | 설명 |
|------|----------|------|
| MD → HWPX | `md2hwpx_improved.py` | Markdown을 서식이 적용된 HWPX로 변환 |
| HWPX 후처리 | `postprocess_hwpx.py` | 표 너비/열 비율, 문단 간격, 셀 높이 등 품질 보정 |
| MD → DOCX | `md_to_docx.py` | Markdown을 서식이 적용된 Word로 변환 |
| DOCX → HWPX | `docx2hwpx.py` | Word를 HWPX로 변환 (Pandoc 경유) |
| HWPX 편집 | `hwpx-cli.js` | 텍스트 치환, 표 수정, 서식 변경 |
| HWPX 분석 | `analyze_template.py` | HWPX 구조 심층 분석 |
| HWPX 검증 | `validate.py` | HWPX 무결성 검증 |
| XML 빌드 | `build_hwpx.py` | 템플릿 기반 HWPX 생성 |

## 설치

```bash
# Python 의존성
pip install lxml python-docx

# Pandoc (DOCX→HWPX 변환 시 필요)
brew install pandoc  # macOS
```

## 사용법

### Markdown → HWPX (권장 워크플로)

```bash
# 1단계: 변환
python3 scripts/md2hwpx_improved.py input.md output.hwpx assets/reference_gothic.hwpx

# 2단계: 후처리 (필수!)
python3 scripts/postprocess_hwpx.py output.hwpx
```

> **중요**: 후처리 없이는 표 너비 초과, 문단 간격 과대, 셀 여백 부족 등 품질 문제가 발생합니다.

### Markdown → Word

```bash
python3 scripts/md_to_docx.py input.md output.docx "머리글 텍스트" "바닥글 텍스트"
```

### HWPX 후처리가 수행하는 작업

| 항목 | 설명 |
|------|------|
| 표 너비 | 본문폭에 맞춤 (삐져나감 방지) |
| 열 너비 | 내용 길이 기반 동적 배분 |
| 빈 문단 | 연속 빈 줄을 최대 1개로 축소 |
| Heading 간격 | 문단 위/아래 간격 축소 |
| 표 셀 정렬 | 좌측 정렬 적용 |
| 표 셀 높이 | 내용 기반 행 높이 확장 + 수직 가운데 정렬로 위아래 여백 확보 |

### Word 변환 주요 설정

- 본문: 맑은 고딕 10pt, Justify 정렬 (한국어 문서)
- Heading: 본문 10pt → H4 10.5pt → H3 11pt → H2 12pt → H1 13pt
- 표: 좌측 정렬, 내용 기반 동적 열 너비
- 제목 표: 행 병합(rowSpan) 지원

## Claude Code 스킬로 사용

`~/.claude/skills/hwpx/` 폴더에 이 repo를 클론하면 Claude Code에서 자동으로 인식합니다.

```bash
git clone https://github.com/shkim-shk/claude-hwpx-toolkit.git ~/.claude/skills/hwpx
```

## 레퍼런스 스타일

| 스타일 | 한글 폰트 | 영문 폰트 | 용도 |
|--------|-----------|-----------|------|
| 고딕 | 나눔고딕 | Arial | 발표자료, 기술문서, 보고서 |
| 명조 | 나눔명조 | Times New Roman | 연구계획서, 논문, 공식 문서 |

## 라이선스

MIT License
