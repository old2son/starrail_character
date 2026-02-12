import { redirect, fail } from '@sveltejs/kit';
import { PASSPHRASE } from '$env/static/private';

/**
 * @param {any} cookies
 * 
 */
export function load({ cookies }) {
	if (cookies.get('logged_in')) {
		throw redirect(307, '/');
	}
}

/**
 * @param {Object} params
 * @param {import('@sveltejs/kit').Cookies} params.cookies
 * @param {Request} params.request 
 */
export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();

		if (data.get('passphrase') === PASSPHRASE) {
			cookies.set('logged_in', 'true', {
				httpOnly: false,
				secure: false,
				path: '/'
			});

			const redirectTo = url.searchParams.get('redirectTo') ?? '/';
			throw redirect(303, redirectTo);
		}

		return fail(403, {
			incorrect: true
		});
	}
};