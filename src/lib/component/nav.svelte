<script>
	/**
	 * @type {boolean}
	 */
	export let logged;
</script>

<nav>
	<a href="/">home</a>
	<a href="/about">about</a>
	<a href="/characters">characters</a>
	{#if logged}
		<a href="/user">user</a>
	{:else}
		<a href="/login">login</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		position: relative;
		z-index: 2;
		padding: 0 20px;
		margin: 80px 20px;
		border-radius: 40px;
		line-height: 40px;
		overflow: hidden;
		background-color: #fff;
	}
</style>
