<script>
	import { enhance } from '$app/forms';
	import avatar_default from '$lib/images/avatar_default.webp';
	import avatar1 from '$lib/images/avatar_01.webp';
	import avatar2 from '$lib/images/avatar_02.gif';
	import avatar3 from '$lib/images/avatar_03.gif';
	import { title, desc } from '@src/stores.js';
	import { fly } from 'svelte/transition';
	import { showToast } from '$lib/store/toast.js';
	import Toast from '$lib/component/Toast.svelte';

	const { data } = $props();

	const imgArr = [avatar1, avatar2, avatar3];

	let src = $state(data.avatarSrc || avatar_default);
	let outerSrc = $state(data.avatarSrc || avatar_default);
	let active = $state(0);
	let showChoose = $state(false);
	let isEditingName = $state(false);
	let userName = $state('无名氏');

	/**
	 * 自动获得焦点
	 * @param {HTMLElement} node - 目标元素
	 */
	function autofocus(node) {
		node.focus();
	}

	/**
	 * 处理表单提交
	 * @param {Object} formElement - 表单提交输入
	 * @param {FormData} formElement.formData - 表单数据
	 * @param {HTMLElement|null} formElement.submitter - 提交按钮
	 */
	function handleSaveAvatar(formElement) {
		return async (/** @type {any} */ { result }) => {
			if (result?.data?.success) {
				showToast('头像保存成功', 'success');
				showChoose = false;
				outerSrc = src;
			} else {
				showToast('头像保存失败', 'error');
			}
		};
	}

	title.set('个人中心');
	desc.set('来玩吧！');
</script>

<div class="min-h-lvh w-full pt-12.5 pl-5 pr-5 overflow-hidden">
	<div class="flex flex-col items-center mt-12 mb-16">
		<div
			class="w-32 h-32 rounded-full bg-amber-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-4"
		>
			<h1 class="w-full h-full flex items-center justify-center">
				<img src={outerSrc} alt="avator default" class="w-full h-full rounded-full object-cover" />
			</h1>
		</div>
		{#if isEditingName}
			<input
				type="text"
				value={userName}
				oninput={(/** @type {Event} */ e) => {
					if (!e.target || !(e.target instanceof HTMLInputElement)) {
						return;
					}

					userName = e.target.value;
				}}
				onblur={() => {
					isEditingName = false;

					if (!userName) {
						userName = '无名氏';
					}
				}}
				class="text-2xl text-center font-black text-zinc-900 border-b-2 border-zinc-900 outline-none"
				use:autofocus
			/>
		{:else}
			<b
				class="text-2xl text-center font-black text-zinc-900 cursor-pointer"
				onclick={() => (isEditingName = true)}
				onkeydown={() => {}}
				tabindex="0"
				role="button"
			>
				{userName}
			</b>
		{/if}
		<p
			class="text-zinc-400 text-[10px] tracking-[0.3em] mt-8 border border-zinc-100 px-3 py-1 rounded-full uppercase"
		>
			Premium Member
		</p>
	</div>

	<div class="space-y-4">
		<button
			onclick={() => {
				showChoose = !showChoose;
			}}
			class="w-full h-20 bg-zinc-900 rounded-2xl flex items-center justify-between px-6 text-white group active:scale-[0.98] transition-all"
		>
			<span class="text-lg font-bold">更换头像</span>
			<span
				class="bg-zinc-700 px-3 py-1 rounded-full text-xs font-medium tracking-tighter uppercase"
				>EDIT</span
			>
		</button>

		<form method="POST" action="?/logout">
			<button
				class="w-full h-20 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-between px-6 text-zinc-900 group active:scale-[0.98] transition-all"
			>
				<span class="text-lg font-bold">离开小窝</span>
				<span class="text-zinc-300 font-black text-xl">→</span>
			</button>
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
				class="relative z-1 w-32 h-32 m-auto mt-2 rounded-full shadow-xl bg-amber-400 shadow-amber-200 text-white transform transition-all duration-500"
			>
				<img {src} alt="avator default" class="w-full h-full rounded-full object-cover" />
			</div>

			<form method="POST" action="?/saveAvatar" use:enhance={handleSaveAvatar}>
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
							<img src={img} alt="avator other" class="w-full h-full rounded-full object-cover" />
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

<Toast />
