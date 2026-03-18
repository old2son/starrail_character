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
			name: '小窝这块',
			href: '/user',
			show: true,
			isAuth: false
		}
	];
</script>

{#if $headerHover}
	<nav
		transition:slide={{ duration: 300 }}
		onmouseleave={() => headerHover.set(false)}
		class="flex justify-around absolute top-full left-0 right-0 z-1 px-2 my-0 leading-10 overflow-hidden bg-black/80"
	>
		{#each tabs as { name, href, show, isAuth }, index (href)}
			<!-- isAuth 未登录也不显示  -->
			<!-- {#if show && isAuth !== false} -->
			{#if show}
				<a
					href={!isAuth ? '/login' : href}
					class="px-5 border-b-2 border-transparent no-underline text-yellow-600 text-sm transition-colors {page
						.url.pathname === href
						? 'border-yellow-600'
						: 'hover:border-yellow-600'}"
				>
					{name}
				</a>
			{/if}
		{/each}
	</nav>
{/if}
