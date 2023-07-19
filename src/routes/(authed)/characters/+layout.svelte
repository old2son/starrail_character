<script>
	import { character } from './character.js'
    import { characterId } from '@src/stores.js';
</script>

<nav>
	{#each character.model as {name, id}}
		<a href="/characters/{name}" data-id="{id}" on:mouseenter={()=>{characterId.set(id)}}>{name}</a>
	{/each}
</nav>

<slot />

<style>
	a {
		color: aliceblue;
	}
</style>