/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				background: "var(--color-background)",
				text: "var(--color-text)"
			}
		}
	},
	plugins: []
};
