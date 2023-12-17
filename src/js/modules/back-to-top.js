export function backToTop() {
  const offset = 1500;
  const scrollUp = document.querySelector('.back-to-top');

  function getTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  window.addEventListener('scroll', () => {
    if (getTop() > offset) {
      scrollUp.classList.add('back-to-top--active');
    } else {
      scrollUp.classList.remove('back-to-top--active');
    }
  });

  scrollUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
