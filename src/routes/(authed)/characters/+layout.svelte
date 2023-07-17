<script>
	const arr = [6,7,8,9];
</script>

<nav>
	{#each arr as num}
		<a href="/characters/{num}">{num}</a>
	{/each}
</nav>

<slot />