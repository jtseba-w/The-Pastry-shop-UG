
  const track82 = document.getElementById('swiperTrack82');
  const cards82 = document.querySelectorAll('.swiper-card82');
  const dotsContainer82 = document.getElementById('dots82');
  const arrowLeft82 = document.getElementById('arrowLeft82');
  const arrowRight82 = document.getElementById('arrowRight82');

  let currentIndex82 = 0;
  let startX82 = 0;
  let isDragging82 = false;
  let autoplayInterval82;
  const autoplayDuration82 = 5000;

  cards82.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot82');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex82 = idx;
      updatePosition82();
      resetAutoplay82();
    });
    dotsContainer82.appendChild(dot);
  });

  const dots82 = dotsContainer82.querySelectorAll('.dot82');

  function updateDots82() {
    dots82.forEach(dot => dot.classList.remove('active'));
    dots82[currentIndex82].classList.add('active');
  }

  function updatePosition82() {
    const cardWidth = cards82[0].offsetWidth + 20;
    track82.style.transform = `translateX(-${currentIndex82 * cardWidth}px)`;
    updateDots82();
  }

  track82.addEventListener('touchstart', e => {
    startX82 = e.touches[0].clientX;
    isDragging82 = true;
    clearInterval(autoplayInterval82);
  });

  track82.addEventListener('touchmove', e => {
    if (!isDragging82) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX82 - currentX;
    if (diffX > 50 && currentIndex82 < cards82.length - 1) {
      currentIndex82++;
      isDragging82 = false;
    } else if (diffX < -50 && currentIndex82 > 0) {
      currentIndex82--;
      isDragging82 = false;
    }
    updatePosition82();
  });

  track82.addEventListener('touchend', () => {
    isDragging82 = false;
    startAutoplay82();
  });

  arrowLeft82.addEventListener('click', () => {
    if (currentIndex82 > 0) {
      currentIndex82--;
      updatePosition82();
      resetAutoplay82();
    }
  });

  arrowRight82.addEventListener('click', () => {
    if (currentIndex82 < cards82.length - 1) {
      currentIndex82++;
      updatePosition82();
      resetAutoplay82();
    }
  });

  function startAutoplay82() {
    autoplayInterval82 = setInterval(() => {
      currentIndex82 = (currentIndex82 + 1) % cards82.length;
      updatePosition82();
    }, autoplayDuration82);
  }

  function resetAutoplay82() {
    clearInterval(autoplayInterval82);
    startAutoplay82();
  }

  window.addEventListener('resize', updatePosition82);

  updatePosition82();
  startAutoplay82();