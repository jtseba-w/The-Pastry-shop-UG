
    let currentIndex2 = 0;
    let startX2 = 0;
    let currentX2 = 0;
    let isDragging2 = false;

    // Create dots
    cards2.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot2');
      if (i === 0) dot.classList.add('active2');
      dot.addEventListener('click', () => {
        currentIndex2 = i;
        updatePosition2();
      });
      dotsContainer2.appendChild(dot);
    });

    const dots2 = document.querySelectorAll('.dot2');

    function fadeLabelText2(newText) {
      cardLabel2.classList.remove('show2');
      setTimeout(() => {
        cardLabel2.textContent = newText;
        cardLabel2.classList.add('show2');
      }, 400);
    }

    function updatePosition2() {
      const cardWidth = cards2[0].offsetWidth + 30;
      const containerWidth = document.querySelector('.swiper-container2').offsetWidth;
      const offset = (containerWidth - cardWidth) / 2;
      track2.style.transform = `translateX(${-currentIndex2 * cardWidth + offset}px)`;

      arrowLeft2.disabled = currentIndex2 === 0;
      arrowRight2.disabled = currentIndex2 === cards2.length - 1;

      dots2.forEach(dot => dot.classList.remove('active2'));
      dots2[currentIndex2].classList.add('active2');

      fadeLabelText2(labels2[currentIndex2]);
    }

    arrowLeft2.addEventListener('click', () => {
      if (currentIndex2 > 0) {
        currentIndex2--;
        updatePosition2();
      }
    });

    arrowRight2.addEventListener('click', () => {
      if (currentIndex2 < cards2.length - 1) {
        currentIndex2++;
        updatePosition2();
      }
    });

    track2.addEventListener('touchstart', (e) => {
      isDragging2 = true;
      startX2 = e.touches[0].clientX;
    });

    track2.addEventListener('touchmove', (e) => {
      if (!isDragging2) return;
      currentX2 = e.touches[0].clientX;
    });

    track2.addEventListener('touchend', () => {
      if (!isDragging2) return;
      const diff = currentX2 - startX2;
      if (diff > 50 && currentIndex2 > 0) {
        currentIndex2--;
      } else if (diff < -50 && currentIndex2 < cards2.length - 1) {
        currentIndex2++;
      }
      updatePosition2();
      isDragging2 = false;
    });

    window.addEventListener('resize', updatePosition2);

    cardLabel2.textContent = labels2[0];
    cardLabel2.classList.add('show2');
    updatePosition2();