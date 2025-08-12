
const observer55 = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible55');
      } else {
        entry.target.classList.remove('visible55');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.image-card55').forEach(card => {
  observer55.observe(card);
});
