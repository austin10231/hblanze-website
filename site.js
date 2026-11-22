(function () {
  var toggle = document.querySelector('.menu-button');
  var nav = document.querySelector('.nav');

  if (!toggle || !nav) return;
  document.documentElement.classList.add('js');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
}());
