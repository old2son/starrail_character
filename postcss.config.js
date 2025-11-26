import pxToViewport from 'postcss-px-to-viewport-8-plugin';

export default {
	plugins: [
		pxToViewport({
			viewportWidth: 375,
			unitToConvert: 'px',
			viewportUnit: 'vw', // 视口单位
            fontViewportUnit: 'vw', // 字体使用单位
            selectorBlackList: ['body'], // 忽略转换
            
		})
	]
};
