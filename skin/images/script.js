/* ============================================================
   Gutter — 티스토리 스킨 스크립트
   hljs 뒤에 defer 로 실행됩니다 (skin.html 의 로드 순서).
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 1. 다크모드 ---------- */
  function initTheme() {
    var btn = $('[data-action="toggle-theme"]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('gutter-theme', dark ? 'dark' : 'light'); } catch (e) {}
    });
  }

  /* ---------- 2. 모바일 메뉴 ---------- */
  function initDrawer() {
    var btn = $('[data-action="toggle-menu"]');
    var drawer = $('[data-mobile-drawer]');
    if (!btn || !drawer) return;
    btn.addEventListener('click', function () {
      var open = drawer.hasAttribute('hidden');
      if (open) { drawer.removeAttribute('hidden'); } else { drawer.setAttribute('hidden', ''); }
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---------- 3. 검색 ---------- */
  function initSearch() {
    var overlay = $('[data-search-overlay]');
    if (!overlay) return;
    var input = $('[data-search-input]', overlay);

    function open() {
      overlay.removeAttribute('hidden');
      if (input) { input.focus(); input.select(); }
    }
    function close() { overlay.setAttribute('hidden', ''); }

    $$('[data-action="open-search"]').forEach(function (b) { b.addEventListener('click', open); });
    $$('[data-action="close-search"]').forEach(function (b) { b.addEventListener('click', close); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); open(); }
      // 입력 중이 아닐 때 '/' 로도 열기
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); open();
      }
    });
  }

  /* ---------- 4. 읽기 진행률 ---------- */
  function initProgress() {
    var bar = $('[data-progress]');
    if (!bar) return;
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- 5. 예상 읽기 시간 ---------- */
  function initReadTime() {
    var el = $('[data-readtime]');
    var content = $('[data-post-content]');
    if (!el || !content) return;
    var chars = (content.textContent || '').replace(/\s+/g, '').length;
    // 한국어 기술 문서 기준 분당 약 500자
    var min = Math.max(1, Math.round(chars / 500));
    el.textContent = ' · ' + min + ' min · ' + chars.toLocaleString() + ' chars';
  }

  /* ---------- 6. 코드블록 ---------- */
  function initCode() {
    var content = $('[data-post-content]');
    if (!content) return;

    // BOOL 스킨 옵션은 1 / 0 으로 치환됩니다.
    var lineOpt = document.body.getAttribute('data-line-numbers');
    var wantLines = !(lineOpt === '0' || lineOpt === 'false');
    var pres = $$('pre', content);

    pres.forEach(function (pre) {
      if (pre.closest('.codeblock')) return;

      // 티스토리는 언어를 <pre> 에 넣지만 hljs 는 <code> 에서 읽습니다.
      // 이 매핑을 안 하면 hljs 가 자동 감지로 떨어져 짧은 Java 조각을 오인합니다.
      var lang = pre.getAttribute('data-ke-language') || '';
      if (!lang) {
        var m = (pre.className || '').match(/(?:^|\s)(?:language-)?([a-z0-9#+]+)(?:\s|$)/i);
        lang = m ? m[1] : '';
      }
      // 마크다운 모드는 <pre> 에 아무것도 안 붙이고 <code class="language-bash"> 로 변환합니다.
      // 위에서 <pre> 만 보면 마크다운으로 쓴 글이 전부 평문으로 떨어집니다.
      if (!lang) {
        var langCode = pre.querySelector('code');
        var cm = langCode && (langCode.className || '').match(/language-([a-z0-9#+]+)/i);
        lang = cm ? cm[1] : '';
      }
      lang = lang.toLowerCase();
      if (lang === 'plain' || lang === 'codeblock' || lang === 'hljs') lang = '';

      // 별칭 정규화 — 배지 표기와 CSS 의 언어별 색을 하나로 맞춥니다.
      var ALIAS = {
        js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
        py: 'python', sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash',
        yml: 'yaml', 'c++': 'cpp', cs: 'csharp', kt: 'kotlin',
        md: 'markdown', htm: 'html', golang: 'go', 'objective-c': 'objectivec'
      };
      if (ALIAS[lang]) lang = ALIAS[lang];

      var code = pre.querySelector('code');
      if (!code) {
        code = document.createElement('code');
        code.textContent = pre.textContent;
        pre.textContent = '';
        pre.appendChild(code);
      }
      if (lang && !/\blanguage-/.test(code.className)) {
        code.classList.add('language-' + lang);
      }

      // 언어가 지정된 블록만 하이라이팅합니다.
      // 자동 감지를 걸면 평문(콘솔 출력, 로그, 메모)에 엉뚱한 키워드 색이 입혀집니다.
      if (lang && window.hljs) {
        try { window.hljs.highlightElement(code); } catch (e) {}
      }

      // 래핑
      var block = document.createElement('div');
      block.className = 'codeblock';
      // CSS 가 언어별 색을 고를 수 있게 붙입니다.
      block.setAttribute('data-lang', lang || 'plain');

      var body = document.createElement('div');
      body.className = 'codeblock-body';
      pre.parentNode.insertBefore(block, pre);

      // 언어 없는 블록은 코드 크롬(배지·복사·거터)을 달지 않습니다.
      // 출력 결과를 붙여넣은 자리이지 소스가 아니기 때문입니다.
      if (!lang) {
        block.classList.add('is-plain');
        block.appendChild(body);
        body.appendChild(pre);
        return;
      }

      var head = document.createElement('div');
      head.className = 'codeblock-head';
      head.innerHTML =
        '<span class="codeblock-lang">' + lang.toUpperCase() + '</span>' +
        '<button type="button" class="codeblock-copy" aria-label="코드 복사">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<rect x="9" y="9" width="12" height="12" rx="2"></rect>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>' +
        '<span>copy</span></button>';

      block.appendChild(head);
      block.appendChild(body);

      if (wantLines) {
        var text = (code.textContent || '').replace(/\n$/, '');
        var count = text.split('\n').length;
        var nums = [];
        for (var i = 1; i <= count; i++) nums.push(i);
        var gutter = document.createElement('div');
        gutter.className = 'codeblock-gutter';
        gutter.setAttribute('aria-hidden', 'true');
        // 줄바꿈 문자로 채웁니다. CSS 의 white-space: pre 가 없으면 한 줄로 흐릅니다.
        gutter.textContent = nums.join('\n');
        body.appendChild(gutter);
      }

      body.appendChild(pre);

      // 복사 — 거터가 pre 바깥이라 번호는 복사되지 않습니다.
      var btn = head.querySelector('.codeblock-copy');
      var label = btn.querySelector('span');
      btn.addEventListener('click', function () {
        var text = code.textContent || '';
        var done = function () {
          btn.classList.add('done'); label.textContent = 'copied';
          setTimeout(function () { btn.classList.remove('done'); label.textContent = 'copy'; }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });
  }

  /* ---------- 7. 목차 + 스크롤스파이 ---------- */
  function slugify(text, index) {
    var s = (text || '').trim().toLowerCase()
      .replace(/[\s]+/g, '-')
      .replace(/[^\w\-가-힣]/g, '');
    return s ? s : 'section-' + index;
  }

  function initToc() {
    var rail = $('[data-toc-rail]');
    // 레일 안에서 찾습니다. 전역으로 찾으면 body 의 스킨 옵션 속성과 겹칠 수 있습니다.
    var toc = rail ? $('[data-toc]', rail) : null;
    var content = $('[data-post-content]');
    if (!rail || !toc || !content) return;

    // 목차를 낼지는 skin.html 의 인라인 스크립트가 이미 정했습니다.
    // 여기서 다시 판정하면 두 곳의 기준이 어긋날 수 있으므로 클래스만 봅니다.
    if (!document.documentElement.classList.contains('has-toc')) return;

    var heads = $$('h2, h3', content).filter(function (h) {
      return (h.textContent || '').trim().length > 0;
    });
    if (heads.length < 2) return;

    var links = [];
    heads.forEach(function (h, i) {
      if (!h.id) h.id = slugify(h.textContent, i);

      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = (h.textContent || '').trim();
      if (h.tagName === 'H3') a.className = 'lv3';
      toc.appendChild(a);
      links.push(a);

      // 제목 앵커
      var anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = '#' + h.id;
      anchor.textContent = '#';
      anchor.setAttribute('aria-label', '이 섹션 링크');
      h.appendChild(anchor);
    });


    if (!('IntersectionObserver' in window)) return;
    var active = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = heads.indexOf(entry.target);
        if (idx < 0) return;
        if (active) active.classList.remove('is-active');
        active = links[idx];
        active.classList.add('is-active');
      });
    }, { rootMargin: '-88px 0px -70% 0px', threshold: 0 });
    heads.forEach(function (h) { io.observe(h); });

    // 모바일: 라벨 눌러 접기
    var label = $('.rail-label', rail);
    if (label) {
      label.addEventListener('click', function () {
        if (rail.hasAttribute('data-collapsed')) rail.removeAttribute('data-collapsed');
        else rail.setAttribute('data-collapsed', '');
      });
    }
  }

  /* ---------- 8. 카테고리 글 수 ----------
     글 상세 페이지에는 카테고리 글 수를 주는 치환자가 없습니다.
     우측 카테고리 트리가 출력한 숫자(index.xml 의 showValue)를 읽어 씁니다.
     못 찾으면 아무것도 붙이지 않습니다. */
  function initCategoryCount() {
    var up = $('[data-category-up]');
    var tree = $('[data-category-tree]');
    if (!up || !tree) return;

    var href = up.getAttribute('href');
    if (!href) return;
    var target = null;
    $$('a', tree).forEach(function (a) {
      var h = a.getAttribute('href') || '';
      if (h && (h === href || h.replace(/\/$/, '') === href.replace(/\/$/, ''))) target = a;
    });
    if (!target) return;

    var m = (target.textContent || '').match(/\((\d+)\)\s*$/);
    if (!m) return;

    var span = document.createElement('span');
    span.className = 'dim';
    span.textContent = ' (' + m[1] + ' files)';
    up.appendChild(span);
  }

  /* ---------- 9. 이미지 라이트박스 ---------- */
  function initLightbox() {
    var content = $('[data-post-content]');
    if (!content) return;

    var box = null;
    function close() { if (box) { box.remove(); box = null; document.body.style.overflow = ''; } }

    content.addEventListener('click', function (e) {
      var img = e.target.closest ? e.target.closest('img') : null;
      if (!img || img.closest('a')) return;
      e.preventDefault();
      box = document.createElement('div');
      box.style.cssText = 'position:fixed;inset:0;z-index:80;background:rgba(16,16,20,.86);' +
        'display:flex;align-items:center;justify-content:center;padding:5vh 5vw;cursor:zoom-out';
      var big = document.createElement('img');
      big.src = img.currentSrc || img.src;
      big.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain';
      box.appendChild(big);
      box.addEventListener('click', close);
      document.body.appendChild(box);
      document.body.style.overflow = 'hidden';
    });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- 10. 연도 ---------- */
  function initYear() {
    var el = $('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* 태그. [##_tag_label_rep_##] 은 링크 사이에 쉼표를 넣어 출력합니다.
     칩 모양으로 보여주려면 그 텍스트 노드를 걷어내고 # 를 붙여야 합니다. */
  function initTags() {
    var box = $('.post-tags');
    if (!box) return;
    var links = $$('a', box);
    if (!links.length) { box.setAttribute('hidden', ''); return; }

    Array.prototype.slice.call(box.childNodes).forEach(function (n) {
      if (n.nodeType === 3) { box.removeChild(n); }
    });
    links.forEach(function (a) {
      var t = (a.textContent || '').trim();
      if (t.charAt(0) !== '#') { a.textContent = '#' + t; }
    });
  }

  /* 표를 스크롤 래퍼로 감쌉니다. CSS 만으로는 못 합니다 --
     table 에 직접 overflow 를 걸려면 display 를 바꿔야 하는데
     그 순간 테이블 레이아웃이 깨지기 때문입니다. */
  function initTables() {
    var content = $('[data-post-content]');
    if (!content) return;
    $$('table', content).forEach(function (t) {
      var p = t.parentNode;
      if (!p || (p.classList && p.classList.contains('table-scroll'))) return;
      // 티스토리가 주입하는 '카테고리의 다른 글' 표는 본문 표가 아니라 목록이라
      // 가로 스크롤 래퍼를 씌우지 않습니다.
      if (t.closest && t.closest('.another_category')) return;
      var wrap = document.createElement('div');
      wrap.className = 'table-scroll';
      p.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }

  /* ---------- 실행 ---------- */
  function boot() {
    initTheme();
    initDrawer();
    initSearch();
    initProgress();
    initReadTime();
    initCode();
    initToc();
    initCategoryCount();
    initLightbox();
    initTables();
    initTags();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
