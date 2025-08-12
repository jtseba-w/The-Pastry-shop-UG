  const video7 = document.getElementById("backgroundVideo7");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video7.currentTime = 0;
        video7.play().catch(() => {});
      } else {
        video7.pause();
      }
    });
  }, { threshold: 0 });

  observer.observe(document.getElementById("video-bg-section"));