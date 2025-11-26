import { redirect } from '@sveltejs/kit';
/**
 * @param {any} cookies
 */
export function load({ cookies, url }) {
	if (!cookies.get('logged_in')) {
		throw redirect(303, `/login?redirectTo=${url.pathname}`);
	}
}