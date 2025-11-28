<script>
	// import { setContext } from 'svelte'; 祖先传值
	import { afterNavigate } from '$app/navigation';
	import { headerHover } from '@src/stores.js';
	import { page } from '$app/state';
	let { title = '标题', back = true } = $props();

	let isShow = $state(false);

	back = page.url.pathname === '/' ? false : true;
	afterNavigate(() => {
		back = page.url.pathname === '/' ? false : true;
	});

	const goBack = () => {
		if (history.length > 1) {
			history.back();
		} else {
			// 没有上一页，默认跳转路径
			location.href = '/';
		}
	};
</script>

<header
	role="region"
	class="header"
	id="header"
	onmouseenter={() => headerHover.set(true)}
	onmouseleave={(e) => {
		const target = e.relatedTarget;
		if (!target || !(target instanceof HTMLElement)) {
			headerHover.set(false);
			return;
		}

		if (
			target.closest('nav') // 检查是否在 NAV 内
		) {
			return;
		}

		headerHover.set(false);
	}}
>
	{#if back}
		<button class="back-button" onclick={goBack}>←</button>
	{/if}

	<div class="flex items-center justify-between w-full">
		<h1 class="title">{title}</h1>

		<div class="hidden md:flex space-x-6">
			<a href="/tools" class="text-[#bebebe] hover:text-black"> 工具 </a>
			<a href="/about" class="text-[#bebebe] hover:text-black"> 关于 </a>
		</div>
	</div>

	<!-- <button onclick={() => headerHover.set(true)} class="cursor-pointer md:hidden text-gray-700 focus:outline-none"> -->
	<button
		onclick={() => (isShow = !isShow)}
		class="c cursor-pointer md:hidden text-[#bebebe] focus:outline-none"
	>
		<!-- 汉堡菜单 -->
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	{#if isShow}
		<div class="md:hidden mt-2 space-y-2">
			<a href="/" class="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"> 首页 </a>
			<a href="/tools" class="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"> 工具 </a>
			<a href="/about" class="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"> 关于 </a>
		</div>
	{/if}
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		padding: 0 16px;
		height: 50px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		font-size: 14px;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.back-button {
		margin-right: 16px;
		border: none;
		cursor: pointer;
		color: #bebebe;
		font-size: 20px;
		background: none;
	}

	.title {
		margin: 0;
		cursor: pointer;
		color: #bebebe;
		font-size: 22px;
		font-weight: bold;
	}
</style>
