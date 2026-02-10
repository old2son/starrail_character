<script>
	import { headerHover } from '@src/stores.js';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	let { logged } = $props();

	const tabs = [
		{
			id: 3,
			name: '角色',
			href: '/characters',
			show: true
		},
		{
			id: 4,
			name: '用户',
			href: '/user',
			show: true,
			isAuth: true
		},
		{
			id: 5,
			name: '小窝这块',
			href: '/login',
			show: true,
			isAuth: false
		}
	];
</script>

{#if $headerHover}
	<nav 
		transition:slide={{duration: 300}} 
		onmouseleave={() => headerHover.set(false)}
		class="md:hidden flex justify-around relative z-20 px-2 my-0 leading-10 overflow-hidden bg-black/80"
	>
		{#each tabs as { name, href, show, isAuth }, index}
			<!-- true 表示已登录，false 表示未登录，undefined 表示无需登录  -->
			{#if show && (isAuth === undefined || isAuth === logged)}
				<a 
					href={href} 
					class="px-5 border-b-2 border-transparent no-underline text-yellow-600 text-sm transition-colors {page.url.pathname === href ? 'border-yellow-600' : 'hover:border-yellow-600'}"
				>
					{name}
				</a>
			{/if}
		{/each}
	</nav>
{/if}

