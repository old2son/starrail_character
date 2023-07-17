
<script>
	export let form;
	import { title } from '@src/stores.js';
	import { fly } from 'svelte/transition';
    title.set('login page'); 
	let visible = false;
</script>

<div class="page-login">
	<h1>登录捏</h1>
	<button on:click|stopPropagation={()=>{visible=true}}>log in</button>
	<!-- <svelte:window on:click={()=>{visible=false}} /> -->
</div>


{#if visible || form?.incorrect}
<div class="form-wrap">
	<form method="POST" transition:fly={{ y: 100, duration: 500 }}>
		<div class="form-wrap-inner">
			<label>
				enter the passphrase
				<input name="passphrase" autocomplete="off" />
			</label>
		</div>
	</form>
</div>

{/if}

{#if form?.incorrect}
	<p class="error">wrong passphrase!</p>
{/if}

<style>
button {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	color: (var(--color-theme-1));
	background-color: #fff;
}

h1 {
	width: 100%;
	display: block;
	color: #fff;
}

.page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.error {
	color: red;
}

.form-wrap {

}

.form-wrap .form-wrap-inner {
	
}
</style>
