<script>
	/**
	 * @type {boolean}
	 */
	export let logged;
	import { headerHover } from '@src/stores.js';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	const tabs = [
		{
			id: 1,
			name: '首页',
			href: '/',
			show: true
		},
		{
			id: 2,
			name: '关于',
			href: '/about',
			show: true
		},
		{
			id: 3,
			name: '角色',
			href: '/characters',
			show: false
		},
		{
			id: 4,
			name: '用户',
			href: '/user',
			show: false,
			isAuth: true
		},
		{
			id: 5,
			name: '登录',
			href: '/login',
			show: false,
			isAuth: false
		}
	];
</script>

{#if $headerHover}
	<nav transition:slide={{duration: 300}} on:mouseleave={() => headerHover.set(false)}>
		{#each tabs as { name, href, show, isAuth }, index}
			<!-- true 表示已登录，false 表示未登录，undefined 表示无需登录  -->
			{#if show && (isAuth === undefined || isAuth === logged)}
				<a class:active={$page.url.pathname === href} {href}>{name}</a>
			{/if}
		{/each}
	</nav>
{/if}

<style>
	nav {
		display: flex;
		justify-content: space-around;
		position: relative;
		z-index: 2;
		padding: 0 10px;
		margin: 0px 0px;
		line-height: 40px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.8);

		& a {
			padding: 0 40px;
			border-bottom: 3px solid transparent;
			text-decoration: none;
			color: var(--color-gold);
			font-size: 18px;
		}

		& .active,
		& a:hover {
			border-color: var(--color-gold);
		}
	}
</style>
