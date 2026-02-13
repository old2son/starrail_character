<script>
	let { data, item } = $props();

	let search = $state('');

	let filtered = $derived(
		data.filter((/** @type {{ source: string; }} */ item) => item.source.includes(search))
	);
</script>

<li class="li-input">
	<label>
		搜索(地址) : <input type="text" bind:value={search} />
	</label>
</li>

{#each filtered as fitItem}
	{@render item(fitItem)}
{/each}

<style>
	.li-input {
		flex-basis: 100%;
		align-self: center;
		margin-bottom: 10px;
		text-align: center;
	}

	.li-input input {
		height: 26px;
		line-height: 26px;
		padding: 0 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
</style>
