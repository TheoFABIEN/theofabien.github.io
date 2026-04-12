document.addEventListener("DOMContentLoaded", () => {
	const navButtons = document.querySelector(".navbar")
	const hamburger = document.querySelector(".hamburger-menu")
	const burgerIcon = document.getElementById("burger")
	const socials = document.querySelector(".socials") // FIXED: Defined this
	const navLinks = document.querySelectorAll(".nav-button")
	const themeButton = document.getElementById("theme-toggle")
	const themeIcon = document.getElementById("theme-icon")
	const OFFSET = 50

	let lastScrollY = window.scrollY
	let ticking = false

	let darkMode = localStorage.getItem("darkMode") === "true"

	function applyTheme() {
		document.body.classList.toggle("dark-mode", darkMode)
		localStorage.setItem("darkMode", darkMode)
		if (themeIcon) {
			themeIcon.src = darkMode
				? "images/light-theme-icon.svg"
				: "images/dark-theme-icon.svg"
		}
	}

	if (themeButton) {
		themeButton.addEventListener("click", () => {
			darkMode = !darkMode
			applyTheme()
		})
	}
	applyTheme()

	function toggleMenu() {
		const isOpen = navButtons.classList.toggle("active")
		burgerIcon.classList.toggle("open")

		document.body.classList.toggle("no-scroll", isOpen)

		if (socials) {
			socials.style.opacity = isOpen ? "0" : "1"
			socials.style.pointerEvents = isOpen ? "none" : "auto"
			socials.style.transition = "opacity 0.3s ease"
		}
	}

	if (hamburger) {
		hamburger.addEventListener("click", (e) => {
			e.preventDefault()
			toggleMenu()
		})
	}

	function updateVisibility() {
		const currentScroll = window.scrollY
		const headerElement = document.querySelector("header")
		const headerBottom = headerElement.offsetTop + headerElement.offsetHeight

		if (window.innerWidth > 800) {
			if (currentScroll > 100) {
				navButtons.classList.add("scrolled")
			} else {
				navButtons.classList.remove("scrolled")
			}
		}

		lastScrollY = currentScroll
		ticking = false
	}

	window.addEventListener("scroll", () => {
		if (!ticking) {
			window.requestAnimationFrame(updateVisibility)
			ticking = true
		}
	})

	navLinks.forEach((button) => {
		button.addEventListener("click", (e) => {
			burgerIcon.classList.remove("open")
			navButtons.classList.remove("active")
			document.body.classList.remove("no-scroll")
			if (socials) {
				socials.style.opacity = "1"
				socials.style.pointerEvents = "auto"
			}

			const targetId = button.getAttribute("data-target")
			if (targetId) {
				e.preventDefault()
				const targetElement = document.getElementById(targetId)
				if (targetElement) {
					const elementTop =
						targetElement.getBoundingClientRect().top + window.scrollY
					window.scrollTo({
						top: elementTop - OFFSET,
						behavior: "smooth",
					})
				}
			}
		})
	})

	const images = document.querySelectorAll(".project-img")
	const lightbox = document.getElementById("lightbox")
	const lightboxImg = document.getElementById("lightboxImg")

	if (lightbox && lightboxImg) {
		const closeBtn = lightbox.querySelector(".close")
		images.forEach((img) => {
			img.addEventListener("click", () => {
				lightbox.style.display = "block"
				lightboxImg.src = img.src
			})
		})

		const closeLightbox = () => (lightbox.style.display = "none")
		closeBtn.addEventListener("click", closeLightbox)
		lightbox.addEventListener("click", (e) => {
			if (e.target === lightbox) closeLightbox()
		})
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") closeLightbox()
		})
	}
})
