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

document.addEventListener("DOMContentLoaded", () => {
	setTheme(getCurrentTheme());

	document.querySelector("#theme-toggle").addEventListener("click", () => {
		const switchTo = getCurrentTheme() === "light" ? "dark" : "light";
		setTheme(switchTo);
	});
});
