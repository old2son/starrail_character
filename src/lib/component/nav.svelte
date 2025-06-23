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
		--color-nav: #e1b066;

		display: flex;
		justify-content: space-around;
		position: relative;
		z-index: 2;
		padding: 0 10px;
		margin: 0px 0px;
		line-height: 40px;
		overflow: hidden;
        background-color: rgba(0,0,0,.8);

		& a {
			text-decoration: none;
			color: var(--color-nav);
			font-size: 18px;
		}
	}
</style>
