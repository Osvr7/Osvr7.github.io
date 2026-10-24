/* Renders one case study (project.html?p=<slug>) from window.PROJECTS. */
(function () {
  "use strict";
  var P = window.Portfolio, esc = P.esc, icon = P.icon, frame = P.frame;
  var projects = window.PROJECTS || [];
  var mount = document.getElementById("case-study");
  var slug = new URLSearchParams(location.search).get("p");
  var idx = projects.findIndex(function (p) { return p.slug === slug; });

  if (idx < 0) {
    document.title = "Project not found · Osama Abutaha";
    mount.innerHTML = '<section class="cs-hero"><div class="container">' +
      '<a class="back-link" href="index.html#work">' + icon("arrow") + " All work</a>" +
      '<h1>Project not found</h1><p class="cs-tagline">That case study does not exist. <a href="index.html#projects" style="text-decoration:underline">Browse all projects</a>.</p></div></section>';
    return;
  }

  var p = projects[idx];
  document.title = p.title + " · Case study · Osama Abutaha";
  var setMeta = function (sel, val) { var m = document.querySelector(sel); if (m) m.setAttribute("content", val); };
  setMeta('meta[name="description"]', p.tagline);
  setMeta('meta[property="og:title"]', p.title + " · Osama Abutaha");
  setMeta('meta[property="og:description"]', p.tagline);

  var sections = [];
  var add = function (id, label, html) { if (html) sections.push({ id: id, label: label, html: html }); };
  var list = function (arr, cls) { return '<ul class="' + cls + '">' + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; };

  /* Overview: problem and solution */
  add("overview", "Overview",
    '<p class="kicker">Overview</p><h2>The problem, and our answer.</h2>' +
    '<div class="ps-grid">' +
      '<div class="ps-card"><h3>' + icon("target") + " Problem</h3><p>" + esc(p.problem) + "</p></div>" +
      '<div class="ps-card"><h3>' + icon("bulb") + " Solution</h3><p>" + esc(p.solution) + "</p></div>" +
    "</div>");

  if (p.features && p.features.length)
    add("features", "What we built", '<p class="kicker">Features</p><h2>What we built.</h2>' +
      '<ol class="feature-list">' + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ol>");

  if (p.architecture)
    add("architecture", "Architecture", '<p class="kicker">Architecture</p><h2>How it fits together.</h2><div class="arch">' +
      p.architecture.map(function (a) { return '<div class="arch-item"><h3>' + esc(a.name) + "</h3><p>" + esc(a.detail) + "</p></div>"; }).join("") + "</div>");

  var resultsHtml = "";
  if (p.resultsTable) {
    var t = p.resultsTable;
    resultsHtml += '<div class="table-wrap"><table><thead><tr>' + t.head.map(function (h) { return "<th scope=\"col\">" + esc(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + t.rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") +
      '</tbody></table></div><p class="table-caption">' + esc(t.caption) + "</p>";
  }
  if (p.results) resultsHtml += list(p.results, "bullets");
  if (resultsHtml) add("results", "Results", '<p class="kicker">Results</p><h2>Where it landed.</h2>' + resultsHtml);

  if (p.challenges && p.challenges.length)
    add("challenges", "Challenges", '<p class="kicker">Challenges</p><h2>What was hard.</h2>' + list(p.challenges, "bullets"));

  add("role", "My role", '<p class="kicker">Contribution</p><h2>My role.</h2><div class="role-card"><p>' + esc(p.role) + "</p>" +
    '<p class="team"><strong>Team:</strong> ' + esc(p.team.join(", ")) + (p.supervisor ? " &nbsp;·&nbsp; <strong>Supervisor:</strong> " + esc(p.supervisor) : "") + "</p></div>");

  if (p.gallery && p.gallery.length) {
    add("gallery", "Gallery", '<p class="kicker">Gallery</p><h2>Screens &amp; diagrams.</h2><div class="gallery">' +
      p.gallery.map(function (g, i) {
        var wide = (g.frame === "browser" && i === 0) || /topology|container|results|ops-graph/.test(g.src);
        return '<figure class="' + (wide ? "wide" : "") + '"><button type="button" class="zoom" data-src="' + esc(g.src) + '" data-caption="' + esc(g.caption) + '" aria-label="Enlarge: ' + esc(g.caption) + '">' +
          frame(g.src, g.caption, g.frame || "none", { url: p.title, title: p.title }) + "</button><figcaption>" + esc(g.caption) + "</figcaption></figure>";
      }).join("") + "</div>");
  }

  var linkBtns = (p.repo ? '<a class="btn btn-primary" href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">' + icon("github") + " View source on GitHub</a>" : "") +
    (p.links || []).map(function (l) { return '<a class="btn btn-ghost" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + icon("doc") + " " + esc(l.label) + "</a>"; }).join("");
  add("links", "Links", '<p class="kicker">Explore</p><h2>Code &amp; documents.</h2>' +
    (linkBtns ? '<div class="links-list">' + linkBtns + "</div>" : "") +
    (p.repo ? "" : '<p class="pending-note">The source repository for this project is being prepared for GitHub and will be linked here once it is published.</p>'));

  /* Cover */
  var cover;
  if (p.coverFit === "poster") cover = '<div class="cs-cover poster">' + frame(p.cover, p.coverAlt, "none", { eager: true }) + "</div>";
  else if (p.extraCover) cover = '<div class="cs-cover"><div class="cs-cover-pair">' + frame(p.cover, p.coverAlt, p.frame, { eager: true, url: p.title }) + frame(p.extraCover, "", "phone") + "</div></div>";
  else cover = '<div class="cs-cover">' + frame(p.cover, p.coverAlt, p.frame === "none" ? "none" : p.frame, { eager: true, url: p.title, title: p.title }) + "</div>";

  var prev = projects[(idx - 1 + projects.length) % projects.length];
  var next = projects[(idx + 1) % projects.length];

  mount.innerHTML =
    '<section class="cs-hero"><div class="container">' +
      '<a class="back-link" href="index.html#work">' + icon("arrow") + " All work</a>" +
      '<p class="eyebrow">' + esc(p.categoryLabel) + "</p>" +
      "<h1>" + esc(p.title) + "</h1>" +
      '<p class="cs-tagline">' + esc(p.tagline) + "</p>" +
      '<dl class="cs-meta">' +
        "<div><dt>Course</dt><dd>" + esc(p.course) + "</dd></div>" +
        "<div><dt>When</dt><dd>" + esc(p.semester) + "</dd></div>" +
        "<div><dt>Team</dt><dd>" + esc(p.type) + "</dd></div>" +
        '<div><dt>Status</dt><dd><span class="status">' + esc(p.status) + "</span></dd></div>" +
      "</dl>" +
      '<div class="actions cs-actions">' + P.repoButton(p) + '<ul class="tags" style="align-self:center">' + p.stack.map(function (s) { return '<li class="tag">' + esc(s) + "</li>"; }).join("") + "</ul></div>" +
      cover +
    "</div></section>" +
    '<div class="container cs-layout">' +
      '<nav class="toc" aria-label="On this page"><p class="mono" style="color:var(--faint);margin-bottom:.8rem">On this page</p><ol>' +
        sections.map(function (s) { return '<li><a href="#' + s.id + '">' + esc(s.label) + "</a></li>"; }).join("") + "</ol></nav>" +
      '<article class="cs-article">' + sections.map(function (s) { return '<section class="cs-section reveal" id="' + s.id + '">' + s.html + "</section>"; }).join("") + "</article>" +
    "</div>" +
    '<section class="cs-next"><div class="container cs-next-grid">' +
      '<a href="project.html?p=' + prev.slug + '"><small>← Previous project</small><strong>' + esc(prev.title) + "</strong></a>" +
      '<a class="next" href="project.html?p=' + next.slug + '"><small>Next project →</small><strong>' + esc(next.title) + "</strong></a>" +
    "</div></section>";

  P.observeReveal(mount);

  /* Table of contents highlight */
  var tocLinks = Array.prototype.slice.call(mount.querySelectorAll(".toc a"));
  if ("IntersectionObserver" in window && tocLinks.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    mount.querySelectorAll(".cs-section").forEach(function (s) { io.observe(s); });
  }

  /* Lightbox */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var img = box.querySelector("img"), cap = box.querySelector("p");
    mount.addEventListener("click", function (e) {
      var b = e.target.closest(".zoom"); if (!b) return;
      img.src = b.getAttribute("data-src"); img.alt = b.getAttribute("data-caption");
      cap.textContent = b.getAttribute("data-caption");
      box.showModal();
    });
    box.querySelector(".close").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }
})();
