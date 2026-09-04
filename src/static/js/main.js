// Toggle between light and dark theme
const setTheme = to => {
	const SUN = `<ion-icon name="sunny-outline"></ion-icon>`;
	const MOON = `<ion-icon name="moon-outline"></ion-icon>`;

	if (to === "light") {
		document.body.classList.add("light");
	} else {
		document.body.classList.remove("light");
	}

	let isLight = to === "light";
	let anchor = document.querySelector("#theme-toggle");
	anchor.innerHTML = isLight ? MOON : SUN;
	window.localStorage.setItem("theme", to);
};

// Get the current theme
const getCurrentTheme = () => {
	let currentTheme = "dark";
	if (window.localStorage.getItem("theme") === "light") {
		currentTheme = "light";
	}

	return currentTheme;
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
	setTheme(getCurrentTheme());
	setupImageLightbox();

	document.querySelector("#theme-toggle").addEventListener("click", () => {
		const switchTo = getCurrentTheme() === "light" ? "dark" : "light";
		setTheme(switchTo);
	});
});
