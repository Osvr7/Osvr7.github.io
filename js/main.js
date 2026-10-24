/* Shared behaviour for every page, plus rendering for the home page. */
(function () {
  "use strict";

  var projects = window.PROJECTS || [];
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id, cls) { return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }

  /* Wrap an image in a device frame. */
  function frame(src, alt, kind, opts) {
    opts = opts || {};
    var img = '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '"' + (opts.eager ? "" : ' loading="lazy"') + ' decoding="async">';
    if (kind === "browser") return '<div class="frame frame-browser"><div class="frame-bar"><i></i><i></i><i></i>' + (opts.url ? '<span class="url">' + esc(opts.url) + "</span>" : "") + "</div>" + img + "</div>";
    if (kind === "window") return '<div class="frame frame-window"><div class="frame-bar"><i></i><i></i><i></i><span class="title">' + esc(opts.title || "") + "</span></div>" + img + "</div>";
    if (kind === "terminal") return '<div class="frame frame-terminal"><div class="frame-bar"><i></i><i></i><i></i></div>' + img + "</div>";
    if (kind === "phone") return '<div class="frame frame-phone">' + img + "</div>";
    return '<div class="frame frame-none">' + img + "</div>";
  }

  function repoButton(p, small) {
    var cls = "btn btn-ghost" + (small ? " btn-sm" : "");
    if (p.repo) return '<a class="' + cls + '" href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">' + icon("github") + " Source code</a>";
    return '<span class="' + cls + '" aria-disabled="true" title="The repository is being prepared">' + icon("github") + " Repository coming soon</span>";
  }

  window.Portfolio = { esc: esc, icon: icon, frame: frame, repoButton: repoButton };

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  $$(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  /* ---------- Navigation ---------- */
  var nav = $(".nav");
  var onScroll = function () { if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $(".menu-toggle"), links = $("#nav-links");
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    $$("a", links).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) {
      if (links.classList.contains("is-open") && !links.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
  }

  var year = $("#year"); if (year) year.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  function observeReveal(scope) {
    var items = $$(".reveal:not(.is-visible)", scope);
    if (!("IntersectionObserver" in window) || reduceMotion) { items.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }
  window.Portfolio.observeReveal = observeReveal;

  /* ---------- Home page ---------- */
  var featuredList = $("#featured-list");
  if (featuredList) {
    var featured = projects.filter(function (p) { return p.featured; });
    featuredList.innerHTML = featured.map(function (p, i) {
      var href = "project.html?p=" + encodeURIComponent(p.slug);
      var media;
      if (p.coverFit === "poster") {
        media = '<a class="feature-media poster" href="' + href + '" aria-label="Read the ' + esc(p.title) + ' case study">' + frame(p.cover, p.coverAlt, "none") + "</a>";
      } else {
        media = '<a class="feature-media" href="' + href + '" aria-label="Read the ' + esc(p.title) + ' case study">' +
          frame(p.cover, p.coverAlt, p.frame, { url: p.slug === "hajjsim" ? "HajjSim Agent Studio" : "CogMonitor · Clinical Dashboard" }) +
          (p.extraCover ? '<div class="media-phone">' + frame(p.extraCover, "", "phone") + "</div>" : "") + "</a>";
      }
      var stats = (p.stats || []).map(function (s) { return '<div class="stat"><strong>' + esc(s.value) + "</strong><span>" + esc(s.label) + "</span></div>"; }).join("");
      return '<article class="feature reveal">' + media +
        '<div class="feature-body">' +
          '<div class="feature-index"><span class="num">0' + (i + 1) + '</span><span class="eyebrow">' + esc(p.categoryLabel) + "</span></div>" +
          '<h3><a href="' + href + '">' + esc(p.title) + "</a></h3>" +
          '<p class="feature-tagline">' + esc(p.tagline) + "</p>" +
          '<p class="feature-summary">' + esc(p.summary) + "</p>" +
          '<div class="feature-meta"><span>' + esc(p.course) + "</span><span>" + esc(p.semester) + '</span><span class="status">' + esc(p.status) + "</span></div>" +
          (stats ? '<div class="stats">' + stats + "</div>" : "") +
          '<ul class="tags">' + p.stack.slice(0, 6).map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<div class="actions"><a class="btn btn-primary btn-sm" href="' + href + '">Read case study ' + icon("arrow", "icon-arrow") + "</a>" + repoButton(p, true) + "</div>" +
        "</div></article>";
    }).join("");
  }

  var grid = $("#project-grid"), filtersEl = $("#filters"), searchEl = $("#project-search");
  if (grid && filtersEl) {
    var others = projects; // the grid lists every project, featured ones are badged
    var state = { cat: "all", q: "" };
    var cats = (window.CATEGORIES || []).filter(function (c) {
      return c.id === "all" || others.some(function (p) { return p.categories.indexOf(c.id) > -1; });
    });
    filtersEl.innerHTML = cats.map(function (c) {
      var n = c.id === "all" ? others.length : others.filter(function (p) { return p.categories.indexOf(c.id) > -1; }).length;
      return '<button type="button" class="filter" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + esc(c.label) + '<span class="count">' + n + "</span></button>";
    }).join("");

    var card = function (p) {
      var href = "project.html?p=" + encodeURIComponent(p.slug);
      var fit = (p.coverFit === "poster" || p.coverFit === "code" || (p.frame === "none" && p.coverFit !== "cover")) ? " fit-contain" : "";
      return '<article class="card">' +
        (p.featured ? '<span class="card-badge">Featured</span>' : "") +
        '<div class="card-thumb' + fit + '"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt) + '" loading="lazy" decoding="async"></div>' +
        '<div class="card-body">' +
          '<div class="card-kicker"><span>' + esc(p.categoryLabel) + "</span><span>" + esc(p.semester.split(" – ")[0]) + "</span></div>" +
          '<h3><a href="' + href + '">' + esc(p.title) + "</a></h3>" +
          "<p>" + esc(p.tagline) + "</p>" +
          '<ul class="tags">' + p.stack.slice(0, 4).map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul>" +
        "</div></article>";
    };

    var render = function () {
      var q = state.q.trim().toLowerCase();
      var list = others.filter(function (p) {
        var inCat = state.cat === "all" || p.categories.indexOf(state.cat) > -1;
        var hay = [p.title, p.tagline, p.course, p.categoryLabel].concat(p.stack).join(" ").toLowerCase();
        return inCat && (!q || hay.indexOf(q) > -1);
      });
      grid.innerHTML = list.length ? list.map(card).join("") : '<p class="empty">No projects match that search yet.</p>';
    };

    filtersEl.addEventListener("click", function (e) {
      var b = e.target.closest(".filter"); if (!b) return;
      state.cat = b.getAttribute("data-cat");
      $$(".filter", filtersEl).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });
    if (searchEl) searchEl.addEventListener("input", function () { state.q = searchEl.value; render(); });
    render();
  }

  /* Active section in the nav */
  var navAnchors = $$('.nav-links a[href^="#"]');
  if (navAnchors.length && "IntersectionObserver" in window) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) { a.classList.remove("active"); });
        var a = map[en.target.id] || (en.target.id === "projects" ? map.work : null);
        if (a) a.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { secIO.observe(s); });
  }

  /* Gentle depth on the hero screenshots (pointer devices only) */
  var stage = $(".hero-stage");
  if (stage && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var layers = $$("[data-depth]", stage);
    var base = layers.map(function (el) { return getComputedStyle(el).transform === "none" ? "" : getComputedStyle(el).transform; });
    stage.parentElement.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (el, i) {
        var d = +el.getAttribute("data-depth");
        el.style.transform = base[i] + " translate3d(" + (-x * d) + "px," + (-y * d) + "px,0)";
      });
    });
    stage.parentElement.addEventListener("pointerleave", function () { layers.forEach(function (el, i) { el.style.transform = ""; }); });
  }

  /* ---------- Portrait flip (photo <-> Bitmoji) ---------- */
  $$(".flip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Show my photo instead of my Bitmoji" : "Show my Bitmoji instead of my photo");
      var hint = btn.parentElement.querySelector(".flip-hint");
      if (hint) hint.textContent = on ? "Tap again to see my photo" : "Tap the photo to meet my Bitmoji";
    });
  });

  /* ---------- Certificates ---------- */
  var certGrid = $("#cert-grid"), certFilters = $("#cert-filters");
  var certs = window.CERTIFICATES || [];
  if (certGrid && certFilters && certs.length) {
    var LIMIT = 9, cState = { group: "all", all: false };
    var groups = (window.CERT_GROUPS || []).filter(function (g) { return g.id === "all" || certs.some(function (c) { return c.group === g.id; }); });
    certFilters.innerHTML = groups.map(function (g) {
      var n = g.id === "all" ? certs.length : certs.filter(function (c) { return c.group === g.id; }).length;
      return '<button type="button" class="filter" data-group="' + g.id + '" aria-pressed="' + (g.id === "all") + '">' + esc(g.label) + '<span class="count">' + n + "</span></button>";
    }).join("");
    // featured first, then newest first as listed
    var ordered = certs.slice().sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    var certCard = function (c) {
      var thumb = c.image
        ? '<button type="button" class="cert-thumb zoom" data-src="' + esc(c.image) + '" data-caption="' + esc(c.title + " · " + c.issuer) + '" aria-label="View certificate: ' + esc(c.title) + '"><img src="' + esc(c.image) + '" alt="" loading="lazy" decoding="async"></button>'
        : '<div class="cert-thumb noimg" aria-hidden="true"><span>' + esc(c.issuer.charAt(0)) + "</span></div>";
      return '<article class="cert">' + thumb + '<div class="cert-body">' +
        '<div class="cert-meta"><span>' + esc(c.kind) + "</span><span>" + esc(c.date) + "</span></div>" +
        "<h3>" + esc(c.title) + "</h3>" +
        '<p class="issuer">' + esc(c.issuer) + "</p>" +
        (c.verify ? '<a class="verify" href="' + esc(c.verify) + '" target="_blank" rel="noopener noreferrer">Verify ' + icon("external") + "</a>" : "") +
        "</div></article>";
    };
    var renderCerts = function () {
      var list = ordered.filter(function (c) { return cState.group === "all" || c.group === cState.group; });
      var shown = cState.all ? list : list.slice(0, LIMIT);
      certGrid.innerHTML = shown.map(certCard).join("") +
        (list.length > LIMIT ? '<button type="button" class="btn btn-ghost btn-sm cert-more" aria-expanded="' + cState.all + '">' + (cState.all ? "Show fewer" : "Show all " + list.length + " certificates") + "</button>" : "");
    };
    certFilters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter"); if (!b) return;
      cState.group = b.getAttribute("data-group"); cState.all = false;
      $$(".filter", certFilters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      renderCerts();
    });
    certGrid.addEventListener("click", function (e) {
      if (e.target.closest(".cert-more")) { cState.all = !cState.all; renderCerts(); }
    });
    renderCerts();
  }

  /* ---------- Lightbox (home page certificates) ---------- */
  var box = $("#lightbox");
  if (box && certGrid && typeof box.showModal === "function") {
    var bImg = box.querySelector("img"), bCap = box.querySelector("p");
    certGrid.addEventListener("click", function (e) {
      var z = e.target.closest(".zoom"); if (!z) return;
      bImg.src = z.getAttribute("data-src"); bImg.alt = z.getAttribute("data-caption");
      bCap.textContent = z.getAttribute("data-caption"); box.showModal();
    });
    box.querySelector(".close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  observeReveal(document);
})();
