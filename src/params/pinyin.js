/**
 * @param {string} value
 * 匹配路由中的参数 [character=pinyin]
 */
export function match(value) {
	return /^qq|syq|fx$/.test(value);
}
