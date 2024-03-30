/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			color: {
				blue: "#6189E0",
				green: "#E5F2B6",
				gray: "#D7D9D8"
			}
		},
	},
	plugins: [],
}
