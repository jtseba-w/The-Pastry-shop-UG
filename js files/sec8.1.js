const track81 = document.getElementById('swiperTrack81');
const cards81 = document.querySelectorAll('.swiper-card81');
const dotsContainer81 = document.getElementById('dots81');
const titleContainer81 = document.getElementById('titleContainer81');
const descContainer81 = document.getElementById('descContainer81');
const arrowLeft81 = document.getElementById('arrowLeft81');
const arrowRight81 = document.getElementById('arrowRight81');

const cardData81 = [
  {
    title: "An image",
    description: "Edible ink on edible paper."
  },
  {
    title: "Cake toppers",
    description: "A piece to add flare to your cake."
  },
  {
    title: "Custom add-on",
    description: "Any other object of your purchase."
  }
];

let currentIndex81 = 0;
let startX81 = 0;
let isDragging81 = false;

// Create dots dynamically
cards81.forEach((_, idx) => {
  const dot = document.createElement('div');
  dot.classList.add('dot81');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentIndex81 = idx;
    updatePosition81();
  });
  dotsContainer81.appendChild(dot);
});

const dots81 = dotsContainer81.querySelectorAll('.dot81');

// Animate title and description fade up in sequence
function showText81(title, desc) {
  titleContainer81.classList.remove('visible');
  descContainer81.classList.remove('visible');

  setTimeout(() => {
    titleContainer81.textContent = title;
    descContainer81.textContent = desc;
    titleContainer81.classList.add('visible');

    setTimeout(() => {
      descContainer81.classList.add('visible');
    }, 400);
  }, 400);
}

function updateDots81() {
  dots81.forEach(dot => dot.classList.remove('active'));
  dots81[currentIndex81].classList.add('active');
}

function updatePosition81() {
  const cardWidth = cards81[0].offsetWidth + 20; // 20 = gap or margin
  track81.style.transform = `translateX(-${currentIndex81 * cardWidth}px)`;
  updateDots81();
  showText81(cardData81[currentIndex81].title, cardData81[currentIndex81].description);
}

// Touch Swipe Support
track81.addEventListener('touchstart', e => {
  startX81 = e.touches[0].clientX;
  isDragging81 = true;
});

track81.addEventListener('touchmove', e => {
  if (!isDragging81) return;
  const currentX = e.touches[0].clientX;
  const diffX = startX81 - currentX;

  if (diffX > 50 && currentIndex81 < cards81.length - 1) {
    currentIndex81++;
    isDragging81 = false;
  } else if (diffX < -50 && currentIndex81 > 0) {
    currentIndex81--;
    isDragging81 = false;
  }

  updatePosition81();
});

track81.addEventListener('touchend', () => {
  isDragging81 = false;
});

// Arrow button clicks
arrowLeft81.addEventListener('click', () => {
  if (currentIndex81 > 0) {
    currentIndex81--;
    updatePosition81();
  }
});

arrowRight81.addEventListener('click', () => {
  if (currentIndex81 < cards81.length - 1) {
    currentIndex81++;
    updatePosition81();
  }
});

// Handle resizing
window.addEventListener('resize', updatePosition81);

// Initial setup
updatePosition81();
