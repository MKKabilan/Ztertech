document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // User is scrolling down — hide header
      header.classList.add('hide');
    } else {
      // User is scrolling up — show header
      header.classList.remove('hide');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
