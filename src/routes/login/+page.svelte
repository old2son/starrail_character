<script>
	import { enhance } from '$app/forms';
	import { title, desc } from '@src/stores.js';
	import { fly } from 'svelte/transition';
	import { toast, showToast } from '$lib/store/toast.js';

	const { form } = $props();
	console.log(form);

	let visible = $state(false);

	title.set('猜猜我是谁');
	desc.set('是咪咪喵~');

	// 监听 form.incorrect 的变化，显示错误提示
	$effect(() => {
		if (form?.incorrect) {
			showToast('答案错误，请重新输入', 'error');
		}
	});
</script>

<div class="flex justify-center items-center flex-wrap min-h-screen">
	<div class="text-center">
		<h1 class="w-full block text-white">猜猜我是谁</h1>
		<button
			class="px-4 py-2.5 mt-5 border border-gray-300 rounded-md cursor-pointer text-gray-800 bg-white hover:bg-gray-100"
			onclick={(e) => {
				e.stopPropagation();
				visible = true;
			}}>输入答案</button
		>
	</div>
</div>

<svelte:window
	onclick={(e) => {
		const target = e.target;
		if (target instanceof HTMLElement && target.classList.contains('js-form-wrap')) {
			visible = false;
		}
	}}
/>

{#if visible}
	<div class="flex justify-center items-center fixed inset-0 z-10 bg-gray-800/50 js-form-wrap">
		<!-- use:enhance 页面无刷新 -->
		<form method="POST" use:enhance transition:fly={{ y: 100, duration: 500 }}>
			<div
				class="p-8 flex justify-center flex-wrap items-start w-[90vw] h-[50vh] rounded-md bg-gray-100"
			>
				<label class="grow-0 shrink-0 basis-full leading-8 mt-[35px] text-center text-lg">
					<div class="text-3xl font-bold mb-8 tracking-tight text-center">请输入答案</div>

					<input
						name="passphrase"
						autocomplete="off"
						type="password"
						placeholder="🐱🐱🐱"
						class="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-black transition-colors bg-slate-50 placeholder:text-slate-400"
					/>
				</label>

				<button
					class="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-slate-800 active:scale-[0.98] transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
					>提交</button
				>

				<p class="mt-8 text-center text-sm text-slate-400">非安全加密连接</p>
			</div>
		</form>
	</div>
{/if}

{#if $toast.show}
	<div
		class="fixed top-1/2 left-1/2 z-30 px-6 py-3 rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 text-white text-sm animate-fade-in-out {$toast.type ===
	'success'
		? 'bg-green-500'
		: $toast.type === 'error'
			? 'bg-red-500'
			: $toast.type === 'info'
				? 'bg-blue-500'
				: 'bg-orange-500'}"
	>
		{$toast.message}
	</div>
{/if}
