<script>
	/**
	 * @type {any[]}
	 */
	export let data;
	
	let search = '';

	$: filterFn = (/** @type {{ source: string; }} */ item) => {
		return item.source.includes(search);
	};
</script>

<li class="li-input">
	<label>
		Filter(url) : <input type="text" bind:value={search} />
	</label>
</li>

{#each data.filter(filterFn) as item}
	<slot {item} />
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
