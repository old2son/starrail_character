<script>
	import { title, desc } from '@src/stores.js';
	import { fly } from 'svelte/transition';

	const { form } = $props();

	let visible = $state(false);

	title.set('猜猜我是谁');
	desc.set('是咪咪喵~');
</script>

<div class="flex justify-center items-center flex-wrap min-h-screen">
	<div class="text-center">
		<h1 class="w-full block text-white">猜猜我是谁</h1>
		<button
			class="px-4 py-2.5 mt-5 border border-gray-300 rounded-md cursor-pointer text-gray-800 bg-white hover:bg-gray-100"
			onclick={(e) => {
				e.stopPropagation();
				visible = true;
			}}>log in</button
		>
	</div>
</div>
<svelte:window
	onclick={(e) => {
		const target = e.target;
		if (target instanceof HTMLElement && target.classList.contains('js-form-wrap')) {
			visible = false;

			if (form?.incorrect) {
				form.incorrect = false;
			}
		}
	}}
/>

{#if visible || form?.incorrect}
	<div class="flex justify-center items-center fixed inset-0 z-10 bg-gray-800/50 js-form-wrap">
		<form method="POST" transition:fly={{ y: 100, duration: 500 }}>
			<div
				class="flex justify-center flex-wrap items-start w-[50vh] h-[50vh] rounded-md bg-gray-100"
			>
				<label class="grow-0 shrink-0 basis-full leading-8 mt-[70px] text-center text-lg">
					enter the passphrase
					<input
						name="passphrase"
						autocomplete="off"
						type="password"
						placeholder="pwd"
						class="block w-3/5 h-[22px] leading-[22px] px-4 py-1.5 mt-2.5 mx-auto outline-none border-0 rounded-full text-white bg-gray-800 placeholder-gray-100"
					/>
				</label>

				<button
					class="px-4 py-2.5 mt-5 border border-gray-300 rounded-md cursor-pointer text-gray-800 bg-white hover:bg-gray-100"
					>submit</button
				>

				{#if form?.incorrect}
					<p class="grow-0 shrink-0 basis-full mt-5 text-center text-red-500">wrong passphrase!</p>
				{/if}
			</div>
		</form>
	</div>
{/if}
