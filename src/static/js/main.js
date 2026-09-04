// Toggle between light and dark theme
const setTheme = (to, persist = true) => {
	const SUN = `<ion-icon name="sunny-outline" aria-hidden="true"></ion-icon>`;
	const MOON = `<ion-icon name="moon-outline" aria-hidden="true"></ion-icon>`;
	const isLight = to === "light";

	document.documentElement.classList.toggle("light", isLight);

	const button = document.querySelector("#theme-toggle");
	const label = `Switch to ${isLight ? "dark" : "light"} theme`;
	button.innerHTML = isLight ? MOON : SUN;
	button.setAttribute("aria-label", label);
	button.setAttribute("title", label);

	if (persist) {
		try {
			window.localStorage.setItem("theme", to);
		} catch {}
	}
};

// Get the current theme
const getCurrentTheme = () => {
	try {
		const savedTheme = window.localStorage.getItem("theme");
		if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
	} catch {}

	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const setupImageLightbox = () => {
	const images = document.querySelectorAll(".blog-body > p > img");
	if (images.length === 0) return;

	const lightbox = document.createElement("dialog");
	lightbox.className = "image-lightbox";
	lightbox.setAttribute("aria-label", "Full-screen image viewer");

	const fullSizeImage = document.createElement("img");
	const closeButton = document.createElement("button");
	closeButton.className = "image-lightbox__close";
	closeButton.type = "button";
	closeButton.setAttribute("aria-label", "Close full-screen image");
	closeButton.textContent = "×";

	lightbox.append(fullSizeImage, closeButton);
	document.body.append(lightbox);

	let opener;
	const openLightbox = image => {
		opener = image;
		fullSizeImage.src = image.currentSrc || image.src;
		fullSizeImage.alt = image.alt;
		lightbox.showModal();
		closeButton.focus();
	};

	images.forEach(image => {
		image.tabIndex = 0;
		image.setAttribute("role", "button");
		image.setAttribute("aria-label", `${image.alt}. View full screen`);

		image.addEventListener("click", () => openLightbox(image));
		image.addEventListener("keydown", event => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openLightbox(image);
			}
		});
	});

	closeButton.addEventListener("click", () => lightbox.close());
	lightbox.addEventListener("click", event => {
		if (event.target === lightbox) lightbox.close();
	});
	lightbox.addEventListener("close", () => opener?.focus());
};

document.addEventListener("DOMContentLoaded", () => {
	setTheme(getCurrentTheme(), false);
	setupImageLightbox();

	document.querySelector("#theme-toggle").addEventListener("click", () => {
		const switchTo = getCurrentTheme() === "light" ? "dark" : "light";
		setTheme(switchTo);
	});
});
