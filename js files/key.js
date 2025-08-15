document.addEventListener("DOMContentLoaded", () => {
  // Your existing loader & lazy load code
  const loader = document.getElementById("fakeLoader");
  const hasVisited = sessionStorage.getItem("hasVisited");
  const delay = hasVisited ? 500 : 2000;

  if (!hasVisited) {
    sessionStorage.setItem("hasVisited", "true");
  }

  setTimeout(() => {
    if (loader) {
      loader.style.transition = "opacity 1s ease";
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 1000);
    }

    const targetSection = document.getElementById("target-section");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "auto" });
    }

    startLazyLoad();
  }, delay);

  // Hamburger menu toggle code
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('overlay');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('show');

    navMenu.setAttribute('aria-hidden', !isOpen);
    navMenu.querySelectorAll('a').forEach(link => {
      link.tabIndex = isOpen ? 0 : -1;
    });
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }
});

// Lazy-load function outside DOMContentLoaded (unchanged)
function startLazyLoad() {
  const preloadMargin = "500px";

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const src = section.getAttribute("data-src");

        if (src) {
          fetch(src)
            .then(response => response.text())
            .then(html => {
              section.innerHTML = html;
              section.removeAttribute("data-src");
            })
            .catch(err => {
              console.error("Failed to preload section:", err);
            });

          observer.unobserve(section);
        }
      }
    });
  }, {
    rootMargin: `0px 0px ${preloadMargin} 0px`
  });

  document.querySelectorAll(".lazy-load-section").forEach(section => {
    observer.observe(section);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const isIPad = /iPad/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: { delay: 3000 },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    pagination: { el: '.swiper-pagination', clickable: true },
    allowTouchMove: !isIPad // ⬅ Disable swiping if iPad
  });
});
  document.querySelectorAll(".hhh").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault(); // stop instant navigation
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location = this.href; // go to target after fade
        }, 800); // matches CSS transition time
      });
    });
    