  const galleryImages = [
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    'images/logo/logo-main.png',
    // ➕ Add more image paths as needed
  ];

  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  // Inject images into gallery
  galleryImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery Image ${index + 1}`;
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(img);
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });