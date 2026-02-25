/**
 * @param {any} cookies
*/
export function load({ cookies }) {
	const logged = cookies.get('logged_in');

	console.log('router load', logged);

	return {
		logged: Boolean(logged)
	};
}