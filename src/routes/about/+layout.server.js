import { postTutorial } from './data.js';

export async function load() {
	return {
		list: postTutorial.map((item, index) => ({
			href: item.path,
			tl: `[${index + 1}] + ${item.title}`
		})),
		conts: postTutorial.map((item) => ({
			param: item.path,
			cont: item.content
		})),
	};
}