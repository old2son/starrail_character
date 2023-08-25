// import { redirect } from '@sveltejs/kit';
// export const actions = {
// 	default: ({ cookies, url }) => {
// 		cookies.set('logged_in', 'true', { path: '/' });
// 		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
// 	}
// };

import { redirect, fail } from '@sveltejs/kit';
import { PASSPHRASE } from '$env/static/private';

/**
 * @param {any} ookies
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
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('passphrase') === PASSPHRASE) {
			cookies.set('logged_in', 'true', {
				httpOnly: false,
				secure: false,
				path: '/'
			});

			throw redirect(303, '/');
		}

		return fail(403, {
			incorrect: true
		});
	}
};