// Toggle between light and dark theme
const toggleTheme = () => {
	const SUN = `<ion-icon name="sunny-outline"></ion-icon>`;
	const MOON = `<ion-icon name="moon-outline"></ion-icon>`;

	document.body.classList.toggle("light");

	let isLight = document.body.classList.contains("light");

	let anchor = document.querySelector("#theme-toggle");
	anchor.innerHTML = isLight ? MOON : SUN;
};

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#theme-toggle").addEventListener("click", () => toggleTheme());
});
