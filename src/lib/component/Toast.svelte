<script>
	import { toast } from '$lib/store/toast.js';
</script>

{#if $toast.show}
	<div
		class="fixed top-1/2 left-1/2 z-30 px-6 py-3 rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 text-white text-sm animate-fade-in-out {$toast.type ===
	'success'
		? 'bg-green-500'
		: $toast.type === 'error'
			? 'bg-red-500'
			: $toast.type === 'info'
				? 'bg-blue-500'
				: 'bg-orange-500'}"
	>
		{$toast.message}
	</div>
{/if}