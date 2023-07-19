import { redirect } from '@sveltejs/kit';

export const actions = {
	/**
	 * @param {any} cookies
	 */
	logout: async ({ cookies }) => {
		cookies.delete('logged_in', { 
			httpOnly: false,
			secure: false,
			path: '/'
		 });
		throw redirect(303, '/');
	}
};
