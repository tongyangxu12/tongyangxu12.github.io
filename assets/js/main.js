/**
 * Academic Personal Homepage - Main JavaScript
 */

(function () {
  'use strict';

  // ============================================
  // Sidebar active link highlighting on scroll
  // ============================================
  function updateActiveNav() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    if (!sections.length || !navLinks.length) return;

    const scrollPos = window.scrollY + 100;

    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 60;
      if (scrollPos >= top) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without jump
        history.pushState(null, null, this.getAttribute('href'));
      }
    });
  });

  // ============================================
  // Load blog posts on main page
  // ============================================
  function loadBlogPreview() {
    var container = document.getElementById('blog-posts');
    if (!container) return;

    // Fetch the blog post index
    fetch('blog/posts/index.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Blog index not found');
        return res.json();
      })
      .then(function (posts) {
        if (!posts.length) {
          container.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No blog posts yet. Stay tuned!</p>';
          return;
        }

        // Show latest 3 posts
        var latest = posts.slice(0, 3);
        var html = '<ul class="blog-list">';
        latest.forEach(function (post) {
          var link;
          if (post.url) {
            link = post.url;
          } else {
            link = 'blog/?post=' + encodeURIComponent(post.slug);
          }
          var extIcon = post.url ? ' <span style="font-size:0.7rem;color:var(--text-muted);">&#x2197;</span>' : '';
          html +=
            '<li class="blog-item">' +
            '<span class="blog-date">' + escapeHtml(post.date) + '</span>' +
            '<h3 class="blog-title"><a href="' + link + '"' + (post.url ? ' target="_blank"' : '') + '>' + escapeHtml(post.title) + extIcon + '</a></h3>' +
            '<p class="blog-excerpt">' + escapeHtml(post.excerpt || '') + '</p>' +
            '</li>';
        });
        html += '</ul>';
        container.innerHTML = html;
      })
      .catch(function () {
        container.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No blog posts yet. Stay tuned!</p>';
      });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Initialize
  updateActiveNav();
  loadBlogPreview();
})();
