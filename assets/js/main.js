/* =============================================================================
   ABDELLAH ROUIAS — portfolio runtime
   Reads content from data.js, renders the page, wires up the motion.
   No dependencies, no build step.
   ============================================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---- 1. Project glyphs: small technical marks -------------------------- */
  var svg = function (inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  };
  var GLYPHS = {
    /* eBPF Sentinel — pulse rings, probe fan-out */
    kernel: svg(
      '<circle cx="12" cy="12" r="2.2"/>' +
      '<path d="M12 5.2a6.8 6.8 0 0 1 6.8 6.8"/>' +
      '<path d="M12 8.6a3.4 3.4 0 0 1 3.4 3.4"/>' +
      '<path d="M12 12 4.4 17.2M12 12l7.6 5.2"/>' +
      '<circle cx="4.4" cy="17.2" r="1.1"/><circle cx="19.6" cy="17.2" r="1.1"/>'
    ),
    /* ASGuard — shield with traffic passing both ways */
    shield: svg(
      '<path d="M12 2.6 4.6 5.4v6.1c0 4.3 3 8.2 7.4 9.9 4.4-1.7 7.4-5.6 7.4-9.9V5.4Z"/>' +
      '<path d="M8.4 12h7.2M8.4 12l2.2-2.2M8.4 12l2.2 2.2"/>' +
      '<path d="M15.6 12l-2.2-2.2M15.6 12l-2.2 2.2"/>'
    ),
    /* DecisionOS — a decision tree */
    branch: svg(
      '<rect x="9" y="2.6" width="6" height="3.6" rx=".4"/>' +
      '<rect x="2.4" y="17.8" width="6" height="3.6" rx=".4"/>' +
      '<rect x="15.6" y="17.8" width="6" height="3.6" rx=".4"/>' +
      '<path d="M12 6.2v4.4M5.4 17.8v-4.4h13.2v4.4M12 10.6v2.8"/>'
    ),
    /* Malware Detector — feature grid with a flagged cell */
    scatter: svg(
      '<path d="M3.5 3.5h4v4h-4zM10.2 3.5h4v4h-4zM16.9 10.2h4v4h-4z" opacity=".38"/>' +
      '<path d="M16.9 3.5h4v4h-4zM3.5 16.9h4v4h-4zM10.2 10.2h4v4h-4zM10.2 16.9h4v4h-4z" opacity=".38"/>' +
      '<circle cx="18.9" cy="18.9" r="2.6"/>' +
      '<path d="M18.9 17.5v2.8" stroke-width="2"/>'
    ),
    /* Unified AI Agent — three providers around one router */
    orbit: svg(
      '<circle cx="12" cy="12" r="2.4"/>' +
      '<circle cx="12" cy="4.4" r="1.9"/><circle cx="5.4" cy="16.2" r="1.9"/><circle cx="18.6" cy="16.2" r="1.9"/>' +
      '<ellipse cx="12" cy="12" rx="9" ry="4.6" opacity=".45"/>'
    ),
    /* E-Store — stacked layers */
    box: svg(
      '<path d="M3.4 7.6 12 3.4l8.6 4.2v8.8L12 20.6l-8.6-4.2Z"/>' +
      '<path d="M3.4 7.6 12 11.8l8.6-4.2M12 11.8v8.8"/>'
    ),
    /* Cryptography Toolkit — key */
    key: svg('<circle cx="8" cy="8" r="4.2"/><path d="M11 11l8.4 8.4M16.6 16.6l2-2M14 14l2-2"/>'),
  };

  var ARROW = '<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
              '<path d="M2 10 10 2M4.5 2H10v5.5" stroke="currentColor" stroke-width="1.3"/></svg>';

  /* ---- 2. Renderers ------------------------------------------------------ */
  function renderStats() {
    var host = $('[data-stats]');
    if (!host || !window.STATS) return;
    host.innerHTML = window.STATS.map(function (s) {
      return '<div class="stats__item">' +
               '<div class="stats__value">' + esc(s.value) + '</div>' +
               '<div class="stats__label">' + esc(s.label) + '</div>' +
             '</div>';
    }).join('');
  }

  function renderTicker() {
    var host = $('[data-ticker]');
    if (!host || !window.TICKER) return;
    var run = window.TICKER.map(function (t) {
      return '<span class="ticker__item">' + esc(t) + '</span>';
    }).join('');
    host.innerHTML = run + run;   // duplicated so translateX(-50%) loops cleanly
  }

  /* hero headline: data.js wins, the static markup in index.html is the fallback */
  function renderHero() {
    var host = $('[data-bind="title"]');
    if (!host || !window.HERO) return;
    var lines = window.HERO.lines || [];
    host.innerHTML = lines.map(function (line, i) {
      var last = i === lines.length - 1;
      return '<span class="hero__line' + (last ? ' hero__line--accent' : '') +
             '" style="--d:' + (0.10 + i * 0.08).toFixed(2) + 's"><span>' + esc(line) + '</span></span>';
    }).join('');
  }

  function renderProjects() {
    var host = $('[data-projects]');
    if (!host || !window.PROJECTS) return;
    host.innerHTML = window.PROJECTS.map(function (p, i) {
      var chips = (p.stack || []).map(function (s) {
        return '<span class="chip">' + esc(s) + '</span>';
      }).join('');
      return '' +
        '<article class="card reveal" style="--d:' + (i % 2 ? 0.08 : 0) + 's">' +
          '<div class="card__top">' +
            '<span class="card__glyph">' + (GLYPHS[p.glyph] || GLYPHS.kernel) + '</span>' +
            '<div class="card__meta">' +
              '<span>' + esc(p.year) + '</span>' +
              (p.tag ? '<span class="card__tag">' + esc(p.tag) + '</span>' : '') +
            '</div>' +
          '</div>' +
          '<h3 class="card__title">' + esc(p.name) + '</h3>' +
          '<p class="card__blurb">' + esc(p.blurb) + '</p>' +
          (p.detail ? '<p class="card__detail">' + esc(p.detail) + '</p>' : '') +
          '<div class="card__stack">' + chips + '</div>' +
          '<a class="card__link" href="' + esc(p.href) + '" target="_blank" rel="noopener noreferrer">' +
            '<span>View repository ' + ARROW + '</span>' +
            '<span class="sr-only">— ' + esc(p.name) + ' on GitHub</span>' +
          '</a>' +
        '</article>';
    }).join('');
  }

  function renderCapabilities() {
    var host = $('[data-capabilities]');
    if (!host || !window.CAPABILITIES) return;
    host.innerHTML = window.CAPABILITIES.map(function (c, i) {
      var items = (c.items || []).map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('');
      return '' +
        '<div class="cap reveal" style="--d:' + (i % 3) * 0.08 + 's">' +
          '<span class="cap__code">' + esc(c.code) + '</span>' +
          '<h3 class="cap__title">' + esc(c.title) + '</h3>' +
          '<p class="cap__body">' + esc(c.body) + '</p>' +
          '<ul class="cap__list">' + items + '</ul>' +
        '</div>';
    }).join('');
  }

  function renderTimeline() {
    var host = $('[data-timeline]');
    if (!host || !window.TIMELINE) return;
    host.innerHTML = window.TIMELINE.map(function (t, i) {
      return '' +
        '<div class="tl__item reveal" style="--d:' + Math.min(i * 0.05, 0.3).toFixed(2) + 's">' +
          '<span class="tl__date">' + esc(t.date) + '</span>' +
          '<h3 class="tl__title">' + esc(t.title) + '</h3>' +
          '<p class="tl__body">' + esc(t.body) + '</p>' +
        '</div>';
    }).join('');
  }

  var ICONS = {
    github: '<path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z"/>',
    linkedin: '<path d="M4.9 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.2 9.2h3.4V21H3.2zM9.4 9.2h3.3v1.6h.05c.46-.85 1.6-1.75 3.3-1.75 3.5 0 4.15 2.25 4.15 5.2V21h-3.4v-5.2c0-1.25-.02-2.85-1.75-2.85s-2 1.35-2 2.75V21H9.4z"/>',
    twitter: '<path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L4.9 21H1.8l7.3-8.3L1.5 3H8l4.4 5.9zm-1.1 16.1h1.7L6.9 4.8H5.1z"/>',
  };

  function renderSocials() {
    var host = $('[data-socials]');
    if (!host) return;
    var cfg = window.CONFIG || {};
    var links = cfg.links || {};
    var list = [];
    if (links.github)   list.push({ key: 'github',   label: 'github.com/' + (cfg.handle || ''), href: links.github });
    if (links.linkedin) list.push({ key: 'linkedin', label: 'LinkedIn', href: links.linkedin });
    if (links.twitter)  list.push({ key: 'twitter',  label: 'X / Twitter', href: links.twitter });
    if (cfg.email)       list.push({ key: 'mail',     label: cfg.email, href: 'mailto:' + cfg.email });

    host.innerHTML = list.map(function (l) {
      var svgIcon = l.key === 'mail'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="1"/><path d="m3 6 9 6.5L21 6"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + ICONS[l.key] + '</svg>';
      return '<a class="social" href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
               svgIcon + '<span>' + esc(l.label) + '</span></a>';
    }).join('');

    var mailBtn = $('[data-email-link]');
    if (mailBtn && cfg.email) { mailBtn.href = 'mailto:' + cfg.email; mailBtn.hidden = false; }
  }

  /* ---- 3. Bind text values coming from CONFIG --------------------------- */
  function bindConfig() {
    var cfg = window.CONFIG || {};
    var hero = window.HERO || {};
    var c = window.CONTACT || {};

    $$('[data-bind]').forEach(function (el) {
      var key = el.getAttribute('data-bind');
      if (key === 'github') {
        if (cfg.links && cfg.links.github) el.href = cfg.links.github;
        return;
      }
      if (key === 'title') return;                       // renderHero() owns it
      if (key === 'lead' && hero.lead)          { el.textContent = hero.lead; return; }
      if (key === 'contactHeading')              { el.textContent = c.heading || el.textContent; return; }
      if (key === 'contactBody')                 { el.textContent = c.body || ''; return; }
      if (key === 'contactCta')                  { el.textContent = c.cta || 'GitHub'; return; }
      var val = cfg[key];
      if (typeof val === 'string' && val) el.textContent = val;
    });

    if (cfg.status === '') {
      var pill = $('[data-status-pill]');
      if (pill) pill.remove();
    }
  }

  /* ---- 4. Header state, scroll progress, scrollspy ----------------------- */
  function initScrollChrome() {
    var bar = $('#topbar');
    var progress = $('.progress');
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || 0;
      if (bar) bar.setAttribute('data-stuck', y > 24 ? 'true' : 'false');
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--p', max > 0 ? String(Math.min(y / max, 1)) : '0');
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    var links = $$('.nav__link');
    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
      var seen = {};
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
        });
        var best = null, bestVal = 0;
        Object.keys(seen).forEach(function (id) {
          if (seen[id] > bestVal) { bestVal = seen[id]; best = id; }
        });
        links.forEach(function (l) {
          l.setAttribute('data-active', l.getAttribute('href') === '#' + best ? 'true' : 'false');
        });
      }, { threshold: [0, 0.15, 0.35, 0.6], rootMargin: '-20% 0px -55% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---- 5. Mobile menu ---------------------------------------------------- */
  function initMenu() {
    var burger = $('#burger');
    var nav = $('#nav');
    if (!burger || !nav) return;

    function close() {
      nav.setAttribute('data-open', 'false');
      burger.setAttribute('aria-expanded', 'false');
    }
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) close(); });
  }

  /* ---- 6. Scroll reveals -------------------------------------------------- */
  function initReveals() {
    var items = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- 7. Rotating "currently" readout ------------------------------------ */
  var READOUTS = [
    'currently: eBPF probes, deterministic detection, one command to run',
    'currently: Spring Boot 3 + Next.js 14 in a single compose stack',
    'currently: keeping ASGuard model-agnostic and under 10 ms of overhead',
    'currently: reading about system architecture, mostly the boring parts',
  ];

  function initReadout() {
    var el = $('[data-readout]');
    if (!el || reduceMotion) return;
    var i = 0, timer = null;

    el.style.transition = 'opacity .26s ease';
    el.style.opacity = '1';

    function tick() {
      i = (i + 1) % READOUTS.length;
      el.style.opacity = '0';
      window.setTimeout(function () {
        el.textContent = READOUTS[i];
        el.style.opacity = '1';
      }, 260);
    }
    function start() { window.clearInterval(timer); timer = window.setInterval(tick, 4200); }
    function stop()  { window.clearInterval(timer); }

    start();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
  }

  /* ---- 8. Crosshair cursor (fine pointers only) --------------------------- */
  function initCursor() {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var ring = $('.cursor');
    var dot  = $('.cursor-dot');
    if (!ring || !dot) return;

    var tx = 0, ty = 0, rx = 0, ry = 0;
    document.body.setAttribute('data-cursor', 'on');

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
      var hit = e.target.closest && e.target.closest('a, button, .card');
      document.body.setAttribute('data-cursor', hit ? 'hover' : 'on');
    }, { passive: true });

    // the ring trails the pointer with a small lerp — cheap, always running
    (function follow() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      window.requestAnimationFrame(follow);
    })();

    document.addEventListener('mouseleave', function () {
      document.body.setAttribute('data-cursor', 'off');
    });
    document.addEventListener('mouseenter', function () {
      document.body.setAttribute('data-cursor', 'on');
    });
  }

  /* ---- 9. Kernel-topology canvas -----------------------------------------
     Drifting probe nodes joined by syscall edges. Packets travel the edges
     and an occasional node flags as an anomaly. Purely decorative.
     ---------------------------------------------------------------------- */
  function initTopology() {
    var canvas = document.getElementById('topology');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');

    var nodes = [], packets = [], ripples = [];
    var W = 0, H = 0, dpr = 1, raf = 0, acc = 0, visible = true;
    var LINK = 132;
    var AMBER = [240, 168, 48];
    var BONE  = [233, 230, 223];
    var TEAL  = [87, 215, 198];

    function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      var target = Math.max(16, Math.min(46, Math.round((W * H) / 6200)));
      nodes = [];
      for (var i = 0; i < target; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          hot: 0
        });
      }
      packets = []; ripples = [];
    }

    function edges() {
      var out = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) out.push([i, j, Math.sqrt(d2)]);
        }
      }
      return out;
    }

    function spawnPacket(list) {
      if (packets.length > 14 || !list.length) return;
      var pick = list[Math.floor(Math.random() * list.length)];
      packets.push({
        a: pick[0], b: pick[1], t: 0,
        speed: 0.0035 + Math.random() * 0.006,
        color: Math.random() < 0.25 ? AMBER : TEAL
      });
    }

    function spawnRipple() {
      var n = nodes[Math.floor(Math.random() * nodes.length)];
      if (!n) return;
      n.hot = 1;
      ripples.push({ x: n.x, y: n.y, r: 4, life: 1 });
    }

    function step(list) {
      ctx.clearRect(0, 0, W, H);

      // edges
      for (var k = 0; k < list.length; k++) {
        var e = list[k];
        var n1 = nodes[e[0]], n2 = nodes[e[1]];
        var a = (1 - e[2] / LINK) * 0.20 + Math.max(n1.hot, n2.hot) * 0.34;
        ctx.strokeStyle = a > 0.34 ? rgba(AMBER, Math.min(a, 0.6)) : rgba(BONE, a);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }

      // packets riding the edges
      for (var p = packets.length - 1; p >= 0; p--) {
        var pk = packets[p];
        pk.t += pk.speed;
        if (pk.t >= 1) { packets.splice(p, 1); continue; }
        var A = nodes[pk.a], B = nodes[pk.b];
        ctx.fillStyle = rgba(pk.color, 0.9);
        ctx.beginPath();
        ctx.arc(A.x + (B.x - A.x) * pk.t, A.y + (B.y - A.y) * pk.t, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.hot > 0.01) {
          ctx.fillStyle = rgba(AMBER, 0.35 + n.hot * 0.65);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.9 + n.hot * 2.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = rgba(BONE, 0.34);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // expanding anomaly rings
      for (var r = ripples.length - 1; r >= 0; r--) {
        var rp = ripples[r];
        rp.r += 1.5;
        rp.life -= 0.017;
        if (rp.life <= 0) { ripples.splice(r, 1); continue; }
        ctx.strokeStyle = rgba(AMBER, rp.life * 0.5);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function move() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = W + 10; else if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10; else if (n.y > H + 10) n.y = -10;
        if (n.hot > 0) n.hot = Math.max(0, n.hot - 0.022);
      }
    }

    function frame(ts) {
      raf = window.requestAnimationFrame(frame);
      if (!visible) return;
      move();
      if (ts - acc < 33) return;   // ~30 fps is plenty for a decoration
      acc = ts;
      var list = edges();
      step(list);
      if (Math.random() < 0.045) spawnPacket(list);
      if (Math.random() < 0.012) spawnRipple();
    }

    resize();
    if (reduceMotion) {
      step(edges());
    } else {
      raf = window.requestAnimationFrame(frame);
    }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);

    // stop burning frames when scrolled away or the tab is hidden
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(canvas);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (raf) { window.cancelAnimationFrame(raf); raf = 0; }
      } else if (!raf && !reduceMotion && W) {
        acc = 0;
        raf = window.requestAnimationFrame(frame);
      }
    });
  }

  /* ---- 10. Boot ---------------------------------------------------------- */
  function init() {
    bindConfig();
    renderHero();
    renderStats();
    renderTicker();
    renderProjects();
    renderCapabilities();
    renderTimeline();
    renderSocials();

    var year = $('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());

    initScrollChrome();
    initMenu();
    initTopology();
    initReadout();
    initCursor();

    // reveals run last, after the dynamic sections exist in the DOM
    initReveals();

    var hero = $('.hero');
    if (hero) {
      window.requestAnimationFrame(function () {
        window.setTimeout(function () { hero.classList.add('is-ready'); }, reduceMotion ? 0 : 90);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();





