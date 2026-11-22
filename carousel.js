(function () {
  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('[data-slide]');
  var photos = carousel.querySelector('.hero-slides');
  var selectors = carousel.querySelectorAll('[data-slide-to]');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var delay = 2000;
  var current = 0;
  var timer;
  var touchStart;

  function show(index) {
    current = index;
    slides.forEach(function (slide, position) {
      var selected = position === current;
      if (selected) {
        slide.setAttribute('data-active', '');
      } else {
        slide.removeAttribute('data-active');
      }
      slide.setAttribute('aria-hidden', String(!selected));
      selectors[position].setAttribute('aria-pressed', String(selected));
    });
  }

  function schedule() {
    window.clearInterval(timer);
    if (motion.matches) return;
    timer = window.setInterval(function () {
      if (!document.hidden && carousel.getClientRects().length && !motion.matches) {
        show((current + 1) % slides.length);
      }
    }, delay);
  }

  selectors.forEach(function (control, index) {
    control.addEventListener('click', function () {
      show(index);
      schedule();
    });
  });
  photos.addEventListener('touchstart', function (event) {
    touchStart = event.touches.length === 1 ? event.touches[0] : null;
  }, { passive: true });
  photos.addEventListener('touchcancel', function () { touchStart = null; }, { passive: true });
  photos.addEventListener('touchend', function (event) {
    var touchEnd = event.changedTouches[0];
    if (!touchStart || !touchEnd || touchStart.identifier !== touchEnd.identifier) return;

    var deltaX = touchEnd.clientX - touchStart.clientX;
    var deltaY = touchEnd.clientY - touchStart.clientY;
    touchStart = null;
    if (Math.abs(deltaX) < 35 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;

    var direction = deltaX < 0 ? 1 : -1;
    show((current + direction + slides.length) % slides.length);
    schedule();
  }, { passive: true });
  if (motion.addEventListener) motion.addEventListener('change', schedule);

  carousel.setAttribute('data-carousel-ready', '');
  show(0);
  schedule();
}());
