<script>
	import { enhance } from '$app/forms';
	import avatar_default from '$lib/images/avatar_default.webp';
	import avatar1 from '$lib/images/avatar_01.webp';
	import avatar2 from '$lib/images/avatar_02.gif';
	import avatar3 from '$lib/images/avatar_03.gif';
	import { title, desc } from '@src/stores.js';
	import { fly } from 'svelte/transition';

	const { data } = $props();

	const imgArr = [avatar1, avatar2, avatar3];

	let src = $state(data.avatarSrc || avatar_default);
	let active = $state(0);
	let showChoose = $state(false);

	title.set('个人中心');
	desc.set('来玩吧！');
</script>

<div class="flex justify-center flex-wrap items-center min-h-screen">
	<div
		class="my-2.5 text-white text-base font-normal cursor-pointer"
		onclick={() => {
			showChoose = !showChoose;
		}}
		onkeydown={() => {
			showChoose = !showChoose;
		}}
		role="button"
		tabindex="0"
		aria-label="更换头像"
	>
		更换头像
	</div>

	<div class="flex justify-center flex-wrap basis-full">
		<h1 class="basis-full my-2.5">
			<img {src} alt="avator default" class="w-24 h-24 rounded-full" />
		</h1>
		<form method="POST" action="?/logout">
			<button
				class="px-4 py-2.5 border border-gray-300 rounded-md text-gray-500 bg-white cursor-pointer hover:bg-gray-100"
				>log out</button
			>
		</form>
	</div>

	{#if showChoose}
		<div
			class="fixed top-1/2 left-1/2 z-10 w-[90vw] p-4 overflow-hidden rounded-lg -translate-x-1/2 -translate-y-1/2 bg-white"
			transition:fly={{ y: 100, duration: 500 }}
		>
			<div
				class="absolute top-0 left-0 w-full h-24 bg-amber-400 opacity-5 transition-colors duration-500"
			></div>

			<div class="flex justify-center mt-2">
				<h2 class="text-center text-xl font-bold text-slate-800 mb-2">选择你的头像</h2>
			</div>
			
			<div
				class="w-32 h-32 m-auto mt-2 rounded-full shadow-xl bg-amber-400 shadow-amber-200  text-white transform transition-all duration-500"
			>
				<img {src} alt="avator default" class="w-full h-full rounded-full" />
			</div>

			<form method="POST" action="?/saveAvatar" use:enhance>
				<div class="grid grid-cols-3 gap-3 mt-5">
					{#each imgArr as img, i}
						<div
							class="aspect-square w-full overflow-hidden border-2 rounded-full cursor-pointer hover:border-gray-300
						{i === active ? 'border-amber-400' : 'border-transparent '}"
							onclick={() => {
								src = img;
								active = i;
							}}
							onkeydown={() => {}}
							role="button"
							tabindex={i}
						>
							<img src={img} alt="avator other" class="w-full h-full rounded-full" />
						</div>
					{/each}
				</div>

				<div class="my-2.5 basis-full text-center mt-5 mb-5">
					<input type="hidden" name="avatar" value={src} />
					<button
						class="w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 bg-slate-900 hover:bg-black hover:shadow-xl active:scale-[0.97]"
						>保存头像</button
					>
				</div>
			</form>
		</div>
	{/if}

	{#if showChoose}
		<div
			class="fixed top-0 left-0 z-9 w-full h-full bg-gray-800/50"
			onclick={() => {
				showChoose = false;
			}}
			onkeydown={() => {}}
			role="button"
			tabindex="0"
		></div>
	{/if}
</div>
