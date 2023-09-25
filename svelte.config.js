import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		// import 路径别名
		alias: {
            '@videos': 'src/lib/images',
            '@src': 'src',
        },
		// 文件夹作为变量名, 尽量默认
		files: {
			lib: 'src/lib',
			routes: 'src/routes',
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
