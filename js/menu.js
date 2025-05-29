  const toggleBtn = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });