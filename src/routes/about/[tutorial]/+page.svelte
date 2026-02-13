<script>
	import { title, desc } from '@src/stores.js';
	const { data } = $props();

	title.set(data.param);
	desc.set(data.desc);
</script>

<div class="flex justify-center items-center min-h-screen">
	<div class="p-5 m-5 rounded-md text-center bg-white">
		{@html data.cont}
	</div>
</div>
