<script>
	export let data;
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { title } from '@src/stores.js';
	import cont1 from './cont1.svelte';
	import cont2 from './cont2.svelte';
	import cont3 from './cont3.svelte';
	title.set('about page');

	$: tabs = [
		{ name: '前瞻', content: cont1 },
		{ name: '汇总', content: cont2 },
		{ name: '其它', content: cont3 }
	];
	$: activeTab = 0;

	const timeInterFn = () => {
		return setInterval(() => {
			activeTab += 1;
			if (activeTab >= 3) {
				activeTab = 0;
			}
		}, 3000);
	};
	let timeIntervalId = timeInterFn();

	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let timeTimeoutId = null;
</script>

<div class="tabs-wrap">
	{#each tabs as tab, idx}
		<button
			class="tab"
			class:on={idx === activeTab}
			on:click={() => {
				activeTab = idx;
				clearInterval(timeIntervalId);

				if (timeTimeoutId) {
					clearInterval(timeTimeoutId);
				}

				timeTimeoutId = setTimeout(() => {
					timeIntervalId = timeInterFn();
				}, 3000);
			}}
		>
			{tab.name}
		</button>
	{/each}
</div>

<div
	class="tabs-cont"
    role="list"
	on:mouseenter={() => {
		if (timeTimeoutId) {
			clearInterval(timeTimeoutId);
		}
	}}
	on:mouseleave={() => {
		timeTimeoutId = setTimeout(() => {
			timeIntervalId = timeInterFn();
		}, 3000);
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

<div class="page-about">
	<p>健康游戏忠告：</p>
	<p>抵制不良游戏，拒绝盗版游戏。</p>
	<p>注意自我保护，谨防受骗上当。</p>
	<p>适度游戏益脑，沉迷游戏伤身。</p>
	<p>合理安排时间，享受健康生活。</p>
</div>

<div class="list-tutorial">
	<h3 style:--color-theme-2="#333">教程列表</h3>
	<ul>
		{#each data.list as item}
			<li><a href="/about/{item.href}">{item.tl}</a></li>
		{/each}
	</ul>
</div>

<style>
	.tabs-wrap {
		padding-top: 20px;
		display: flex;
		justify-content: center;

		& .tab {
			line-height: 28px;
			margin: 0 5px;
			border: 0;
			border-radius: 4px;
			cursor: pointer;
			color: #333;
			transition: all 0.3s ease-in-out;
			background-color: #fff;

			&:hover {
				color: #fff;
				background-color: var(--color-theme-2);
			}

			&.on {
				color: #fff;
				background-color: var(--color-theme-2);
			}
		}
	}

	.tabs-cont {
		margin-top: 20px;
		padding: 0 20px;
	}

	.list-tutorial {
		margin: 20px;
		padding: 20px;
		border-radius: 4px;
		background-color: #fff;

		& h3 {
			margin: 0 0 8px 0;
			color: var(--color-theme-2);
		}

		& ul {
			padding: 0px;
			margin: 20px 0;
			list-style: none;
			border-radius: 4px;
			background-color: #fff;

			& li {
				margin: 8px 0;
			}
		}
	}

	.page-about {
		--dis: 20px;
		margin: var(--dis);
		padding: var(--dis);
		border-radius: 4px;
		text-align: center;
		background-color: #fff;

		& p {
			color: var(--color-theme-2);
		}
	}
</style>
