<script>
	import { get } from 'svelte/store';
	import { character } from './character.js';
	import { characterId } from '@src/stores.js';
	import { page } from '$app/state';

	let { children } = $props();

	/**
	 * 处理角色点击事件
	 * @param {Event} e - 事件对象
	 * @param {string | number} id - 角色ID
	 * @param {string} name - 角色ID简写
	 */
	const handleCharacterClick = (e, id, name) => {
		if (page.params.character === name) {
			e.preventDefault();
			return;
		}

		if (!page.params.character) {
			e.preventDefault();
		}
		const numericId = Number(id);
		if (get(characterId) !== numericId) {
			characterId.set(numericId);
		}
	};
</script>

<div class="min-h-lvh overflow-hidden bg-linear-to-r from-cyan-500 to-blue-500">
	<nav
		class="flex justify-around mt-18.5 p-2 mx-5 mb-5 rounded-full bg-white overflow-hidden "
	>
		{#each character.model as { name, cName, alias, id }, index}
			<a
			href="/characters/{name}"
			data-id={id}
			class="text-blue-500"
			onclick={(e) => handleCharacterClick(e, id, name)}>{alias || cName}</a
		>
		{/each}
	</nav>

	{@render children?.()}
</div>
