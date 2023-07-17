
<script>
	export let form;

	import { fly } from 'svelte/transition';
	let visible = false;
</script>

<h1>log in</h1>
<button on:click|stopPropagation={()=>{visible=true}}>log in</button>
<!-- <svelte:window on:click={()=>{visible=false}} /> -->

{#if visible || form?.incorrect}
<form method="POST" transition:fly={{ y: 100, duration: 500 }}>
	<label>
		enter the passphrase
		<input name="passphrase" autocomplete="off" />
	</label>
</form>
{/if}

{#if form?.incorrect}
	<p class="error">wrong passphrase!</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>
