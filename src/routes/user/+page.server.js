import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('logged_in', { path: '/' });
		throw redirect(303, '/');
	}
};
