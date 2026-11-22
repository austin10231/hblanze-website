(function () {
  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('[data-slide]');
  var selectors = carousel.querySelectorAll('[data-slide-to]');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var delay = 2000;
  var current = 0;
  var timer;

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
  if (motion.addEventListener) motion.addEventListener('change', schedule);

  carousel.setAttribute('data-carousel-ready', '');
  show(0);
  schedule();
}());
