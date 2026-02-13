<script>
	import { title, desc, characterActive } from '@src/stores.js';
	import { setSource } from './dataSource.js';
	import Cards from './cards.svelte';
	import Search from './search.svelte';

	/**
	 * @typedef {Object} SourceItem[]
	 * @property {string} name
	 * @property {string} source
	 */

	/**
	 * @typedef {Object} Character
	 * @property {string} name - Character full name.
	 * @property {string} cName - Character name.
	 * @property {number} id - Character ID.
	 * @property {string} cont - Character full name.
	 */

	/**
	 * @type {Character}
	 */
	const characterTemplate = {
		name: 'Character Name',
		cName: 'Full Character Name',
		id: 0,
		cont: '<p>请选择角色</p>'
	};

	let character = $derived({
		...characterTemplate,
		...$characterActive
	});

	$effect(() => {
		console.log(character);
	});

	title.set('角色列表');
	desc.set('角色列表描述');
</script>

<div class="flex justify-center flex-wrap text-white">
	{#if character?.id}
		<Cards>
			{#snippet header()}
				<div class="w-25 h-25 overflow-hidden rounded-sm">
					<img
						src="/images/{character.name}.jpg"
						alt={character.cName}
						class="w-full h-full object-cover"
					/>
				</div>
			{/snippet}

			{#snippet children()}
				<div>{character.cName}</div>
			{/snippet}

			{#snippet footer()}
				<div>{@html character.cont}</div>
			{/snippet}
		</Cards>
	{:else}
		<p class="text-gray-800 text-2xl">请选择卡片</p>
	{/if}
</div>

<ol
	class="fixed left-0 right-0 bottom-7.5 flex justify-around flex-wrap p-5 m-0 list-none rounded-t-lg bg-white"
>
	<Search data={setSource}>
		{#snippet item(/** @type {SourceItem} */ prop)}
			<li class="leading-9"><a href={prop.source} class="text-blue-500">{prop.name}</a></li>
		{/snippet}
	</Search>
</ol>
