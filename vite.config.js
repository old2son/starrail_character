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
				target: 'https://api.vvhan.com/api/hotlist/pengPai',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/newsApi/, '')
			},
			'/weatherApi': {
				target: 'https://v2.xxapi.cn/api/weather',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/weatherApi/, '')
			}
		}
	},
});
