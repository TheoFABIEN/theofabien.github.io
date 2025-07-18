document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.nav-button[data-target]');

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center' // positionne la section au milieu de la fenêtre
        });
      }
    });
  });
});
