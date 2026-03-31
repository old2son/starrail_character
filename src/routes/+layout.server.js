/**
 * @param {Object} params
 * @param {import('@sveltejs/kit').Cookies} params.cookies
 */
export function load({ cookies }) {
	const logged = cookies.get('logged_in');

	return {
		logged: Boolean(logged)
	};
}
