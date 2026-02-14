/**
 * @param {any} cookies
*/
export function load({ cookies }) {
	const logged = cookies.get('logged_in');

	// debugger load没执行?
	console.log(11111111111);
	console.log(logged);

	return {
		logged: Boolean(logged)
	};
}