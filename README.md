<div align="center">

# Gutter

**개발 블로그를 위한 티스토리 스킨**

코드 라인 넘버 거터 | 문법 강조 팔레트 | 다크모드 | 자동 목차 | 댓글·방명록

[![License: MIT](https://img.shields.io/badge/License-MIT-a626a4.svg)](LICENSE)
[![Platform: Tistory](https://img.shields.io/badge/Platform-Tistory-FF5A4A.svg)](https://www.tistory.com/)

</div>

| 라이트 | 다크 |
|:---:|:---:|
| ![라이트 모드](screenshots/light.png) | ![다크 모드](screenshots/dark.png) |

---

## Why Gutter?

개발 블로그의 본문은 절반이 코드입니다. 그런데 대부분의 티스토리 스킨은 코드블록을
회색 박스 하나로 처리합니다. 줄 번호가 없어 "12번째 줄 보세요"라고 쓸 수 없고,
있더라도 복사하면 번호가 같이 딸려옵니다.

**Gutter** 는 그 지점만 집요하게 봅니다. 줄 번호 거터를 `<pre>` 바깥의 독립
요소로 두어 복사에 섞이지 않게 하고, 문법 강조에 쓰는 색을 사이트 UI 색으로
승격해 글 전체가 에디터와 같은 색 규칙으로 읽히게 했습니다.

IDE 크롬(탭바·파일트리·상태바)은 일부러 그리지 않습니다. 흉내로 읽히는 데다
모바일에서 전부 버려야 해서 데스크톱과 인상이 갈리기 때문입니다.

## Features

### 코드

| 기능 | 설명 |
|------|------|
| **라인 넘버 거터** | `<pre>` 바깥의 독립 요소. 복사할 때 번호가 딸려오지 않고, 가로 스크롤 시 제자리에 남습니다 |
| **언어 배지 + 색** | 상단에 언어명 표시. 좌측 테두리 색은 GitHub 언어 색 관례를 따라 23개 언어 지정 |
| **코드 복사 버튼** | 원클릭 복사. 성공 시 버튼 라벨이 바뀝니다 |
| **에디터 언어 인식** | 티스토리는 언어를 `<pre>` 에 넣지만 highlight.js 는 `<code>` 에서 읽습니다. `data-ke-language` 를 옮겨주고 별칭 17개를 정규화합니다 |
| **평문 블록 구분** | 언어가 없는 블록은 배지·복사·거터를 달지 않습니다. 콘솔 출력이나 로그를 붙여넣은 자리이지 소스가 아니기 때문입니다 |
| **자동 감지 안 함** | 언어가 지정된 블록만 색을 입힙니다. 자동 감지는 평문에 엉뚱한 키워드 색을 칠합니다 |

### 읽기

| 기능 | 설명 |
|------|------|
| **자동 목차** | H2/H3 기반. IntersectionObserver 스크롤 스파이로 현재 섹션 하이라이팅 |
| **다크모드** | OS 설정 자동 감지 + 수동 토글 + `localStorage` 저장. 렌더 전 인라인 스크립트로 FOUC 방지 |
| **읽기 진행률 바** | 헤더 하단에 스크롤 진행도 표시 |
| **읽는 시간 · 글자수** | 한국어 기술 문서 기준 분당 500자로 계산 |
| **헤딩 앵커** | 제목에 `#` 링크 자동 삽입 |
| **이미지 라이트박스** | 본문 이미지 클릭 시 전체화면 |
| **표 가로 스크롤** | 넓은 표를 스크롤 래퍼로 감쌉니다. 테이블 레이아웃은 그대로 유지됩니다 |
| **댓글 · 방명록** | 티스토리 기본 치환자 사용. 플랫폼이 기능을 추가하면 스킨 수정 없이 따라옵니다 |

### 개발자 취향

| 기능 | 설명 |
|------|------|
| **경로형 브레드크럼** | 카테고리를 경로처럼 표기. 하단 이동 링크는 `cd ../` |
| **모노스페이스 메타** | 날짜·카테고리·태그 등 메타 정보 전체가 고정폭. 주석 스타일 날짜 표기 |
| **카테고리 글 수** | `(12 files)` 형태로 표시. 글 상세에는 이 치환자가 없어 카테고리 트리 출력에서 읽어옵니다 |
| **검색 단축키** | `Ctrl`/`Cmd` + `K` 또는 `/` 로 검색 오버레이, `Esc` 로 닫기 |
| **구조화 데이터 보강** | 플랫폼이 `BlogPosting` 만 넣어주므로 `WebSite`(작성자 귀속)와 `BreadcrumbList` 를 추가합니다 |

### 커스터마이징

티스토리 관리자 패널에서 조정할 수 있는 스킨 옵션 11개입니다.

| 변수 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `accent` | COLOR | `#a626a4` | 강조 색상 (카테고리·경로) |
| `link_color` | COLOR | `#4078f2` | 링크·활성 항목 색상 |
| `line_numbers` | BOOL | `true` | 코드블록 라인 넘버 거터 |
| `dark_mode_default` | BOOL | `false` | 기본 다크모드 |
| `show_toc` | BOOL | `true` | 글 상세 좌측 목차 |
| `show_categories` | BOOL | `true` | 우측 카테고리 목록 |
| `subtitle` | STRING | 개발과 일상을 기록합니다 | 블로그 부제 |
| `author_name` | STRING | - | 구조화 데이터의 작성자 이름. 비우면 `author` 를 넣지 않습니다 |
| `author_url` | STRING | - | 작성자 프로필 주소 |
| `adsense_client` | STRING | - | 애드센스 게시자 ID (`ca-pub-...`) |
| `adsense_slot` | STRING | - | 본문 상단 광고 슬롯 ID |

기본 색은 Atom One Light 팔레트입니다. 카테고리는 keyword 보라, 링크는 function
파랑, 메타 정보는 comment 회색을 씁니다.

다크모드에서는 `accent` 와 `link_color` 옵션을 쓰지 않습니다. 라이트 배경 기준으로
고른 색이라 어두운 배경에서 대비가 무너지는 경우가 많기 때문입니다.

## Installation

### 1. 파일 다운로드

```bash
git clone https://github.com/zziaho/tistory-gutter-skin.git
```

### 2. 스킨 등록

`블로그 관리 > 꾸미기 > 스킨 등록` 에서 `skin/` 아래 파일을 모두 올린 뒤 적용합니다.

| 파일 | 올릴 위치 |
|------|-----------|
| `index.xml` | 루트 |
| `skin.html` | 루트 |
| `style.css` | 루트 |
| `preview.gif`, `preview256.jpg`, `preview560.jpg`, `preview1600.jpg` | 루트 |
| `images/script.js` | **`images/` 아래** |

`script.js` 의 경로가 중요합니다. `skin.html` 이 `./images/script.js` 로
참조하고, 티스토리는 필수 3개 파일 외에는 `images/` 아래만 받습니다.

### 3. 스킨 옵션 설정

`블로그 관리 > 꾸미기 > 스킨 편집 > 스킨 설정` 에서 위 표의 11개 옵션을 조정합니다.

`index.xml` 은 스킨 편집기에서 열리지 않습니다. 옵션 **값**은 이 화면에서 바꾸지만,
옵션 **선언** 자체를 바꿨다면 스킨 등록 경로로 파일을 다시 올려야 반영됩니다.

### 4. 광고 (선택)

게시자 ID 는 하드코딩되어 있지 않습니다. 광고를 넣으려면 스킨 설정에서
`애드센스 게시자 ID` 와 `본문 광고 슬롯 ID` 를 채우세요. 비워두면 광고 스크립트
자체가 출력되지 않습니다.

## Usage

### 코드블록 언어 지정

티스토리 에디터에서 코드블록의 언어를 지정하면 그대로 인식합니다. 별칭은
정규화되므로 `js`, `py`, `kt`, `c++` 처럼 적어도 됩니다.

색이 지정된 언어는 다음 23개입니다. 나머지는 회색으로 떨어집니다.

```
java  kotlin  javascript  typescript  python  go      sql     bash
html  css     scss        vue         json    yaml    xml     markdown
cpp   csharp  php         ruby        swift   rust    dart
```

### 평문 블록

언어를 지정하지 않은 코드블록은 배지·복사 버튼·라인 넘버 없이 출력됩니다.
콘솔 출력이나 로그를 붙여넣을 때 이쪽을 쓰면 됩니다.

### 목차

본문에 H2/H3 제목이 **2개 이상** 있으면 좌측에 목차가 붙고 3단 레이아웃이 됩니다.
제목이 0~1개인 글은 목차 없이 2단으로 나옵니다.

### 카테고리 형식

우측 카테고리 목록은 **리스트형**으로 설정해야 합니다.
`블로그 관리 > 메뉴 > 카테고리 관리` 에서 확인하세요.

폴더형은 `table` 과 `gif` 로 출력되어 진짜 링크가 아니고, 크롤링도 스타일링도
되지 않습니다.

### 키보드

| 키 | 동작 |
|----|------|
| `Ctrl`/`Cmd` + `K` | 검색 열기 |
| `/` | 검색 열기 (입력란에 포커스가 없을 때) |
| `Esc` | 검색 닫기 |

## File Structure

```
skin/
├── index.xml          # 스킨 정보 + 스킨 옵션 11개
├── skin.html          # 전 페이지 공용 템플릿
├── style.css          # 전체 스타일시트 (CSS 커스텀 프로퍼티)
├── preview.gif        # 112x84   관리자 화면 폴백
├── preview256.jpg     # 256x192  적용 중인 스킨 표시
├── preview560.jpg     # 560x420  스킨 목록 카드
├── preview1600.jpg    # 1600x1200 스킨 상세
└── images/
    └── script.js      # 메인 JavaScript (11개 모듈)
```

`preview*` 는 티스토리 관리자 화면에서만 쓰입니다. 블로그 방문자에게는 보이지
않고, 파일명과 크기가 플랫폼 규약으로 고정되어 있습니다.

`skin.html` 하나가 홈·목록·글·카테고리·검색·태그·방명록을 전부 렌더링합니다.
페이지 종류별로 파일이 나뉘지 않고, URL 에 따라 그룹 치환자 블록이 켜지고 꺼집니다.

레이아웃은 `<html>` 의 클래스 두 개로 갈립니다. 둘 다 퍼머링크 블록 안의 인라인
스크립트가 붙이므로 첫 페인트 전에 결정됩니다.

| 클래스 | 붙는 시점 | 결과 |
|--------|-----------|------|
| `is-post` | 퍼머링크 블록 진입 시 | 글 상세로 판별 |
| `has-toc` | 본문 직후, 제목 2개 이상일 때 | 목차 레일 + 3단 그리드 |

목록 머리말 `h1` 은 페이지 종류와 무관하게 출력되고, 자체 `h1` 을 이미 가진
페이지에서만 CSS 가 숨깁니다. 판별은 `[##_body_id_##]` 가 채우는 `<body id>` 로
합니다.

| `body id` | 페이지 | 머리말 h1 |
|---|---|---|
| `tt-body-index` / `-category` / `-search` / `-archive` | 목록 | 표시 |
| `tt-body-page` | 글 · 페이지 · 보호글 | 숨김 (글 제목이 h1) |
| `tt-body-guestbook` / `-tag` | 방명록 · 태그 | 숨김 (자체 h1 있음) |

어느 페이지에서도 보이는 `h1` 은 하나입니다.

## Tech Stack

| 항목 | 선택 | 이유 |
|------|------|------|
| CSS | 커스텀 프로퍼티 | 빌드 없이 다크모드 테마 전환 |
| JS | Vanilla ES5 (IIFE) | 의존성 0, 빌드 불필요 |
| 레이아웃 | CSS Grid | 목차 유무에 따른 2단/3단 전환을 칼럼 정의 한 줄로 처리 |
| 폰트 | Pretendard + JetBrains Mono | 한국어 본문 최적화 + 코드·메타 정보용 고정폭 |
| 코드 | highlight.js CDN | 언어 지정 블록만 하이라이팅 |
| 반응형 | 3단계 | 1180px 카테고리 숨김 / 900px 1단 + 목차 접이식 / 768px 모바일 여백 |

## Known Limitations

- **`index.xml` 에 `<default>` 섹션이 없습니다.** `recentEntries`,
  `contentWidth`, 요약 말줄임 길이 등이 전부 플랫폼 기본값으로 동작합니다.
- **highlight.js CDN 의존.** cdnjs 장애 시 코드블록이 무채색으로 떨어집니다.

## Credits

- [highlight.js](https://github.com/highlightjs/highlight.js) — BSD-3-Clause
- [Pretendard](https://github.com/orioncactus/pretendard) — SIL Open Font License 1.1
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — SIL Open Font License 1.1

위 셋은 CDN 런타임 로드이며 이 저장소에 번들되어 있지 않습니다.
기본 팔레트는 Atom One Light 의 색값을 참고했을 뿐, 코드를 가져오지 않았습니다.

## License

[MIT](LICENSE) — 개인 블로그든 상업 프로젝트든 제약 없이 쓸 수 있습니다.
포크해서 자기 취향대로 고치는 것도, 고친 것을 다시 배포하는 것도 자유입니다.

조건은 하나입니다. 사본과 파생물에 저작권 표시와 라이선스 전문을 남겨주세요.
저장소의 `LICENSE` 파일과 `skin/index.xml` 의 `<license>` 항목이 그 역할을 하므로,
둘을 지우지 않으면 따로 할 일은 없습니다.

---

<div align="center">

Made for developers who blog in Korean.

</div>
