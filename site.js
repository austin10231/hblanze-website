(function () {
  var toggle = document.querySelector('.menu-button');
  var nav = document.querySelector('.nav');
  var header = document.querySelector('.header');

  if (!toggle || !nav) return;
  document.documentElement.classList.add('js');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    document.documentElement.classList.toggle('menu-locked', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('click', function (event) {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenu(false);
    }
  });
  header.addEventListener('focusout', function (event) {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (nav.classList.contains('open') && !toggle.getClientRects().length) setMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
}());
