const galleryImages = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const downloadLink = document.getElementById('download-link');
  const closeBtn = document.getElementById('close-btn');

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      downloadLink.href = img.src;
      lightbox.classList.add('show');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
    }
  });

  
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    downloadLink.href = img.src;
    lightbox.classList.add('show');
    document.body.classList.add('noscroll'); // disable scrolling
    history.pushState({ lightboxOpen: true }, '');
  });
});

closeBtn.addEventListener('click', () => {
  closeLightbox();
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener('popstate', (event) => {
  // If lightbox is open, close it on back button instead of leaving page
  if (lightbox.classList.contains('show')) {
    closeLightbox();

    // Prevent further back navigation now by pushing back the state
    history.pushState(null, '');
  }
});

function closeLightbox() {
  lightbox.classList.remove('show');
  lightboxImg.src = '';
  downloadLink.href = '';
  document.body.classList.remove('noscroll'); // re-enable scrolling
}