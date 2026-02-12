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
	},
	saveAvatar: async ({ cookies, request }) => {
		const data = await request.formData();
		const src = data.get('avatar');

		if(typeof src !== 'string') {
			return;
		}

		cookies.set('avatarSrc', src, {
			httpOnly: false,
			secure: false,
			path: '/'
		});

		throw redirect(303, '/user');
	}
};

export function load({ cookies }) {
	const avatarSrc = cookies.get('avatarSrc');

	return {
		avatarSrc
	};
}
