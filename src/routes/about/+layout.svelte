<script>
	let { children } = $props();
</script>

<div class="min-h-lvh bg-linear-to-r from-cyan-500 to-blue-500">
    {@render children?.()}
</div>
