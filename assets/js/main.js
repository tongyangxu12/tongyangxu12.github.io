/**
 * Tongyang Xu — Academic Homepage scripts
 *  - dark / light theme toggle (remembered per browser)
 *  - navbar highlight for the section in view (home page)
 *  - latest blog posts on the home page (from blog/posts/index.json)
 *  - "Last updated" month from the latest commit pushed to GitHub (falls back to the month in the HTML)
 */
(function () {
  'use strict';

  var REPO = 'tongyangxu12/tongyangxu12.github.io';

  // ---------- Theme toggle ----------
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
    });
  }

  // ---------- Navbar highlight (only for in-page anchors) ----------
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (navLinks.length) {
    var sections = navLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var updateActive = function () {
      var offset = window.scrollY + 120;
      var current = sections.length ? sections[0].id : '';
      sections.forEach(function (s) { if (s.offsetTop <= offset) current = s.id; });
      // At the very bottom, highlight the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2 && sections.length) {
        current = sections[sections.length - 1].id;
      }
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  // ---------- Helpers ----------
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str == null ? '' : String(str)));
    return div.innerHTML;
  }

  function formatDate(str) {
    // "2026-05-17" -> "2026.05.17"
    return String(str || '').replace(/-/g, '.');
  }

  // ---------- Latest blog posts on the home page ----------
  var blogList = document.getElementById('blog-posts');
  if (blogList) {
    fetch('blog/posts/index.json')
      .then(function (res) {
        if (!res.ok) throw new Error('index.json not found');
        return res.json();
      })
      .then(function (posts) {
        if (!posts || !posts.length) {
          blogList.innerHTML = '<li class="meta">No posts yet — stay tuned!</li>';
          return;
        }
        blogList.innerHTML = posts.slice(0, 3).map(function (post) {
          var external = !!post.url;
          var href = external ? post.url : 'blog/?post=' + encodeURIComponent(post.slug);
          return '<li><a href="' + escapeHtml(href) + '"' +
            (external ? ' target="_blank" rel="noopener"' : '') + '>' +
            escapeHtml(post.title) + (external ? ' <span class="ext">&#x2197;</span>' : '') +
            '</a> <span class="meta">' + escapeHtml(formatDate(post.date)) + '</span></li>';
        }).join('');
      })
      .catch(function () { /* keep the static list in the HTML */ });
  }

  // ---------- Last updated (latest commit on GitHub) ----------
  var updated = document.getElementById('last-updated');
  if (updated && window.fetch) {
    fetch('https://api.github.com/repos/' + REPO + '/commits?per_page=1')
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then(function (commits) {
        var iso = commits && commits[0] && commits[0].commit && commits[0].commit.committer && commits[0].commit.committer.date;
        if (!iso) return;
        // Show year.month in China Standard Time (UTC+8), e.g. "2026.11".
        var d = new Date(new Date(iso).getTime() + 8 * 3600 * 1000);
        updated.textContent = d.toISOString().slice(0, 7).replace('-', '.');
      })
      .catch(function () { /* keep the date written in the HTML */ });
  }
})();
