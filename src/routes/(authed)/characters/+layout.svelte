<script>
	const model = ['qq', 'syq', 'xf'];
</script>

<nav>
	{#each model as name}
		<a href="/characters/{name}">{name}</a>
	{/each}
</nav>

<slot />


<style>
	a {
		color: aliceblue;
	}
</style>


