const track4 = document.getElementById('swiperTrack4');
const dotsContainer4 = document.getElementById('dots4');
const arrowLeft4 = document.getElementById('arrowLeft4');
const arrowRight4 = document.getElementById('arrowRight4');
const titleContainer4 = document.getElementById('titleContainer4');

const totalCards = 14;

const imagePaths4 = [
  'images/chocolate.jpg', 'images/strawberry.jpg', 'images/red-velvet.jpg',
  'images/fruit_cake.jpg', 'images/coconut.jpg', 'images/orange.jpg',
  'images/vanilla.jpg', 'images/lemon.jpg', 'images/mint.jpg',
  'images/bubblegum.jpg', 'images/pineapple.jpg', 'images/blueberry.jpg',
  'images/banana.jpg', 'images/carrot.jpg'
];

const titles4 = [
  'Chocolate', 'Strawberry', 'Red Velvet', 'Fruit Cake', 'Coconut', 'Orange',
  'Vanilla', 'Lemon', 'Mint', 'Bubblegum', 'Pineapple', 'Blueberry', 'Banana', 'Carrot'
];

let currentIndex4 = 0;
let startX4 = 0;
let isDragging4 = false;

// Create cards dynamically
for (let i = 0; i < totalCards; i++) {
  const card = document.createElement('div');
  card.classList.add('swiper-card4');

  const img = document.createElement('img');
  img.src = imagePaths4[i];
  img.alt = titles4[i];

  card.appendChild(img);
  track4.appendChild(card);
}

// Create dots dynamically with fade on click
for (let i = 0; i < totalCards; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot4');
  if (i === 0) dot.classList.add('active');

  dot.addEventListener('click', () => {
    if (currentIndex4 === i) return; // no action if same dot
    fadeToIndex(i);
  });

  dotsContainer4.appendChild(dot);
}

const dots4 = dotsContainer4.querySelectorAll('.dot4');

function updateDots4() {
  dots4.forEach(dot => dot.classList.remove('active'));
  dots4[currentIndex4].classList.add('active');
}

function updateTitle4() {
  titleContainer4.classList.remove('fade-in4');
  titleContainer4.classList.add('fade-out4');

  setTimeout(() => {
    titleContainer4.textContent = titles4[currentIndex4];
    titleContainer4.classList.remove('fade-out4');
    titleContainer4.classList.add('fade-in4');
  }, 300);
}

// Fade the whole track and title on dot clicks
function fadeToIndex(newIndex) {
  if (newIndex === currentIndex4) return;

  track4.style.transition = 'opacity 0.3s ease';
  titleContainer4.classList.remove('fade-in4');
  titleContainer4.classList.add('fade-out4');
  track4.style.opacity = '0';

  setTimeout(() => {
    const cards = document.querySelectorAll('.swiper-card4');
    const cardWidth = cards[0].offsetWidth + 20;

    // Temporarily remove slide transition to instantly jump
    track4.style.transition = 'none';
    track4.style.transform = `translateX(-${newIndex * cardWidth}px)`;

    // Re-enable slide transition immediately after a tiny delay
    setTimeout(() => {
      track4.style.transition = 'transform 0.4s ease-in-out';
    }, 20);

    // Fade back in
    track4.style.opacity = '1';
    track4.style.transition += ', opacity 0.6s ease';

    currentIndex4 = newIndex;
    updateDots4();

    titleContainer4.textContent = titles4[currentIndex4];
    titleContainer4.classList.remove('fade-out4');
    titleContainer4.classList.add('fade-in4');
  }, 300);
}


// Slide update used by swipe and arrows
function updatePosition4() {
  const cards = document.querySelectorAll('.swiper-card4');
  const cardWidth = cards[0].offsetWidth + 20;
  track4.style.transform = `translateX(-${currentIndex4 * cardWidth}px)`;
  updateDots4();
  updateTitle4();
}

// Touch swipe with slide behavior
track4.addEventListener('touchstart', e => {
  startX4 = e.touches[0].clientX;
  isDragging4 = true;
});

track4.addEventListener('touchmove', e => {
  if (!isDragging4) return;
  const currentX = e.touches[0].clientX;
  const diffX = startX4 - currentX;

  if (diffX > 50 && currentIndex4 < totalCards - 1) {
    currentIndex4++;
    isDragging4 = false;
    updatePosition4();
  } else if (diffX < -50 && currentIndex4 > 0) {
    currentIndex4--;
    isDragging4 = false;
    updatePosition4();
  }
});

track4.addEventListener('touchend', () => {
  isDragging4 = false;
});

// Arrow buttons with slide behavior
arrowLeft4.addEventListener('click', () => {
  if (currentIndex4 > 0) {
    currentIndex4--;
    updatePosition4();
  }
});

arrowRight4.addEventListener('click', () => {
  if (currentIndex4 < totalCards - 1) {
    currentIndex4++;
    updatePosition4();
  }
});

window.addEventListener('resize', updatePosition4);

// Initialize on page load
updatePosition4();
