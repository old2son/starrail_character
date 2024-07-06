<script>
	import { get } from 'svelte/store';
	import { character } from './character.js';
	import { characterId } from '@src/stores.js';
</script>

<nav>
	{#each character.model as { name, id }}
		<a
			href="/characters/{name}"
			data-id={id}
			on:mouseenter={() => {
				if (get(characterId) !== id) {
					characterId.set(id);
				}
			}}>{name}</a
		>
	{/each}
</nav>

<slot />

<style>
	nav {
		display: flex;
		justify-content: space-around;
		padding: 0 20px;
		margin: 20px;
		border-radius: 40px;
		line-height: 40px;
		overflow: hidden;
		background-color: #fff;
	}

	nav a {
		color: var(--color-theme-1);
	}
</style>
