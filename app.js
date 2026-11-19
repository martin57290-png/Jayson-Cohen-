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
