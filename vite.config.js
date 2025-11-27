import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson()
	],
	server: {
		host: '0.0.0.0',
		port: 8080,
		proxy: {
			'/newsApi': {
				// todo: 替换新闻api地址
				target: 'https://api.weatherapi.com/v1/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/newsApi/, '')
			},
			'/weatherApi': {
				// https://www.weatherapi.com/
				target: 'https://api.weatherapi.com/v1/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/weatherApi/, '')
			}
		}
	},
});
