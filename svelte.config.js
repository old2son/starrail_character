// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static'; // +layout.js  设置 prerender 

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// import 路径别名
		alias: {
            '@videos': 'src/lib/images',
            '@src': 'src',
        },
		paths: {
			base: '', // url 路径前缀
			// assets: process.env.NODE_ENV === 'development' ? '' : 'https://example',  // 线上静态资源地址
			assets: '',
			relative: false,
		},
		appDir: '_app', // 相对 assets 的线上路径, https://example/_app/immutable/assets/0.45a00fd7.css
	}
};

export default config;
