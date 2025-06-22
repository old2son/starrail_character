<script>
	/**
	 * @type {boolean}
	 */
	export let logged;
</script>

<nav>
	<a href="/">首页</a>
	<a href="/about">关于</a>
	<a href="/characters">角色</a>
	{#if logged}
		<a href="/user">用户</a>
	{:else}
		<a href="/login">登录</a>
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
