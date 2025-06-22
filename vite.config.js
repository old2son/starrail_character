import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
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
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
