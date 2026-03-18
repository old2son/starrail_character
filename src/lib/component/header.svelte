<script>
	// import { setContext } from 'svelte'; 祖先传值
	import Nav from '@src/lib/component/nav.svelte';
	import { afterNavigate } from '$app/navigation';
	import { headerHover, isMobile } from '@src/stores.js';
	import { page } from '$app/state';
	let { title = '标题', back = true, logged = false } = $props();

	const tabs = [
		{
			name: '首页',
			href: '/'
		},
		{
			name: '角色',
			href: '/characters'
		},
		{
			name: '小窝这块',
			href: '/user'
		},
		{
			name: '其他',
			href: '/others'
		},
		{
			name: '关于',
			href: '/about'
		}
	];

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
	class="flex items-center fixed top-0 left-0 right-0 z-50 px-4 h-12.5 shadow-md text-sm bg-black/80"
	id="header"
	onmouseenter={() => {
		if ($isMobile) return;
		headerHover.set(true);
	}}
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
		<button class="mr-4 border-none cursor-pointer text-gray-400 text-xl bg-none" onclick={goBack}
			>←</button
		>
	{/if}

	<Nav {logged} />

	<div class="flex items-center justify-between w-full">
		<h1 class="m-0 cursor-pointer text-gray-400 text-xl font-bold">{title}</h1>

		<div class="hidden md:flex space-x-6">
			{#each tabs as { name, href }, index (index)}
				{#if index > 2}
					<a {href} class="text-gray-400 hover:text-black transition-colors">
						{name}
					</a>
				{/if}
			{/each}
		</div>
	</div>

	<button
		onclick={(e) => {
			e.stopPropagation();
			isShow = !isShow;
		}}
		class="cursor-pointer md:hidden text-gray-400 focus:outline-none"
	>
		<!-- 汉堡菜单 -->
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
			<path d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	<!-- Mobile sidebar backdrop -->
	{#if isShow}
		<div
			class="fixed inset-0 bg-black/50 z-40 md:hidden"
			role="button"
			tabindex="0"
			aria-label="Close sidebar"
			onclick={() => (isShow = false)}
			onkeydown={(e) => e.key === 'Enter' && (isShow = false)}
		></div>
	{/if}

	<!-- Mobile sidebar -->
	<div
		class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden {isShow
			? 'translate-x-0'
			: 'translate-x-full'}"
		role="navigation"
		aria-label="Mobile navigation"
	>
		<div class="p-4">
			<!-- Close button -->
			<button
				class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
				aria-label="Close navigation menu"
				onclick={() => (isShow = false)}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Menu items -->
			<div class="mt-8 space-y-2">
				{#each tabs as { name, href }, index}
					<a
						{href}
						class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
						onclick={() => (isShow = false)}
					>
						{name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</header>
