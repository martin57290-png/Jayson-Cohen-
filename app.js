(function () {
  'use strict';
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'), last = null;
  function close() { lb.classList.remove('on'); lbImg.removeAttribute('src'); if (last) last.focus(); }
  Array.prototype.forEach.call(document.querySelectorAll('.docfig button'), function (b) {
    b.addEventListener('click', function () {
      var im = b.querySelector('img');
      last = b; lbImg.src = im.src; lbImg.alt = im.alt; lb.classList.add('on');
      document.getElementById('lbClose').focus();
    });
  });
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('on')) close(); });

  var bars = document.querySelectorAll('.bar');
  function grow() { Array.prototype.forEach.call(bars, function (b) { b.style.width = b.getAttribute('data-w') + '%'; }); }
  var chart = document.getElementById('chart');
  if ('IntersectionObserver' in window && chart) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { grow(); io.disconnect(); } }); }, { threshold: 0.3 });
    io.observe(chart);
  } else { grow(); }
})();

/* Scrolling document: the Statement of Issues, one charge at a time */
(function () {
  'use strict';
  var D = window.SOI, view = document.getElementById('docview'), steps = document.getElementById('steps');
  if (!D || !view || !steps) return;
  var qs = document.querySelectorAll('#qpanel .q'), count = document.getElementById('qcount');
  var pages = D.pages.map(function (p) {
    var el = document.createElement('div'); el.className = 'page';
    var im = document.createElement('img'); im.src = p.src; im.alt = ''; im.width = p.w; im.height = p.h;
    el.appendChild(im); view.appendChild(el); return el;
  });
  var hls = D.steps.map(function (s) {
    return s.rects.map(function (r) {
      var h = document.createElement('div'); h.className = 'hl';
      h.style.left = r[0] + '%'; h.style.top = r[1] + '%'; h.style.width = r[2] + '%'; h.style.height = r[3] + '%';
      pages[s.page].appendChild(h); return h;
    });
  });
  var cur = -1;
  function layout() {
    var vw = view.clientWidth, vh = view.clientHeight, scale = vw < 520 ? 1.75 : 1;
    var s = D.steps[Math.max(cur, 0)];
    pages.forEach(function (el, i) {
      var p = D.pages[i], pw = vw * scale, ph = pw * p.h / p.w;
      el.style.width = pw + 'px';
      var fy = i === s.page ? s.fy : 30, fx = i === s.page ? s.fx : 50;
      var ty = Math.min(0, Math.max(vh - ph, vh / 2 - ph * fy / 100));
      var tx = Math.min(0, Math.max(vw - pw, vw / 2 - pw * fx / 100));
      el.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
    });
  }
  function set(i) {
    if (i === cur) return;
    cur = i;
    var s = D.steps[i];
    pages.forEach(function (el, k) { el.classList.toggle('on', k === s.page); });
    hls.forEach(function (list, k) { list.forEach(function (h) { h.classList.toggle('on', k <= i); }); });
    Array.prototype.forEach.call(qs, function (q, k) { q.classList.toggle('on', k === i); });
    if (count) count.textContent = (i + 1) + ' / ' + D.steps.length;
    layout();
  }
  function onScroll() {
    var r = steps.getBoundingClientRect(), n = D.steps.length;
    var i = Math.floor((window.innerHeight * 0.5 - r.top) / (r.height / n));
    set(Math.min(n - 1, Math.max(0, i)));
  }
  var tick = false;
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; onScroll(); }); } }, { passive: true });
  window.addEventListener('resize', function () { layout(); onScroll(); });
  onScroll();
})();
