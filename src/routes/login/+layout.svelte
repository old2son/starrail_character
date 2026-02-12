<script>
	let { children } = $props();
</script>

<div class="animated-gradient min-h-lvh">
	{@render children?.()}
</div>

<style>
	@keyframes gradientMove {
		0% {
			background-position: 0% 0%;
		}
		50% {
			background-position: 100% 0%;
		}
		100% {
			background-position: 200% 0%;
		}
	}

	.animated-gradient {
		animation: gradientMove 5s linear infinite;
		background: linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4);
		background-size: 200% 200%;
	}
</style>
