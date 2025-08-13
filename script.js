document.addEventListener('DOMContentLoaded', () => {
  const OFFSET = 50; // Décalage en pixels pour laisser le titre visible

  document.querySelectorAll('.nav-button[data-target]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - OFFSET,
          behavior: 'smooth'
        });
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelector('.top-buttons');
  let lastScrollY = window.scrollY;

  let ticking = false;

  function updateButtonVisibility() {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY + 10) {
      // on scroll vers le bas : cacher
      navButtons.classList.add('hidden');
    } else if (currentScroll < lastScrollY - 10) {
      // on remonte : montrer
      navButtons.classList.remove('hidden');
    }

    lastScrollY = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateButtonVisibility);
      ticking = true;
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
	const toggleButton = document.getElementById("theme-toggle");
	const themeIcon = document.getElementById("theme-icon");

	let darkMode = localStorage.getItem("darkMode") === "true";

	function applyTheme() {
		document.body.classList.toggle("dark-mode", darkMode);
		localStorage.setItem("darkMode", darkMode);

		// Mettre à jour l’icône selon le thème
		if (darkMode) {
			themeIcon.src = "images/light-theme-icon.svg";
		} else {
			themeIcon.src = "images/dark-theme-icon.svg";
		}
	}

	toggleButton.addEventListener("click", () => {
		darkMode = !darkMode;
		applyTheme();
	});

	applyTheme(); // appliquer le thème dès le chargement
});


document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('myImage');   // <- correspond maintenant à l'ID de l'image ciblée
  if (!img) return; // sécurité si l'image est absente

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = lightbox.querySelector('.close');

  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src; // mettre ici une version HD si besoin
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  // bonus : fermer avec Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.style.display = 'none';
  });
});
