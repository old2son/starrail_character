import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
    const { conts } = await parent();
	const tutorialObj = conts.find((item) => item.param === params.tutorial);
	
	if (!tutorialObj) throw error(404);

	// 这里返回的不止处理后的数据, 还有继承上一级 +layout.server.js 的数据
	return tutorialObj;
}
