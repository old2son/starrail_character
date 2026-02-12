<script>
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { title, desc } from '@src/stores.js';
	import cont1 from './cont1.svelte';
	import cont2 from './cont2.svelte';
	import cont3 from './cont3.svelte';

	const { data } = $props();

	title.set('关于这里');
	desc.set('一些介绍');

	let tabs = $state([
		{ name: '前瞻', content: cont1 },
		{ name: '汇总', content: cont2 },
		{ name: '其它', content: cont3 }
	]);

	let activeTab = $state(0);

	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let timeIntervalId;

	const timeInterFn = () => {
		timeIntervalId = setInterval(() => {
			activeTab += 1;
			if (activeTab >= 3) {
				activeTab = 0;
			}
		}, 2000);
	};

	// 这里是指 onMount 生命周期
	$effect(() => {
		timeInterFn();
	});
</script>

<div class="pt-5 flex justify-center">
	{#each tabs as tab, idx}
		<button
			class="h-7 mx-1.5 px-4 rounded-md cursor-pointer text-gray-800 transition-all duration-300 ease-in-out bg-white hover:text-white hover:bg-gray-800 {idx ===
			activeTab
				? 'text-pink-600 bg-gray-800'
				: ''}"
			onclick={() => {
				activeTab = idx;

				if (timeIntervalId !== null) {
					clearInterval(timeIntervalId);
				}

				timeIntervalId = setTimeout(() => {
					timeInterFn();
				}, 2000);
			}}
		>
			{tab.name}
		</button>
	{/each}
</div>

<div
	class="mt-5 px-5"
	role="list"
	onmouseenter={() => {
		if (timeIntervalId !== null) {
			clearInterval(timeIntervalId);
		}
	}}
	onmouseleave={() => {
		timeIntervalId = setTimeout(() => {
			timeInterFn();
		}, 2000);
	}}
>
	{#each tabs as tab, idx}
		{#if idx === activeTab}
			<div in:slide={{ easing: cubicInOut }} out:slide={{ easing: cubicInOut }}>
				<svelte:component this={tab.content} />
			</div>
		{/if}
	{/each}
</div>

<div class="m-5 p-5 rounded-md text-center bg-white">
	<p class="text-gray-800">健康游戏忠告：</p>
	<p class="text-gray-800">抵制不良游戏，拒绝盗版游戏。</p>
	<p class="text-gray-800">注意自我保护，谨防受骗上当。</p>
	<p class="text-gray-800">适度游戏益脑，沉迷游戏伤身。</p>
	<p class="text-gray-800">合理安排时间，享受健康生活。</p>
</div>

<div class="m-5 p-5 rounded-md bg-white">
	<h3 class="mb-2 text-gray-800">文章列表</h3>
	<ul class="p-0 my-5 list-none rounded-md bg-white">
		{#each data.list as item}
			<li class="my-2">
				<a href="/about/{item.href}" class="text-gray-800 hover:text-gray-600">{item.tl}</a>
			</li>
		{/each}
	</ul>
</div>
