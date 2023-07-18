<script>
	export let form;
	import { title } from '@src/stores.js';
	import { fly } from 'svelte/transition';
	title.set('login page');
	let visible = false;
</script>

<div class="page-login">
	<div class="login-box">
		<h1>登录捏</h1>
		<button
			on:click|stopPropagation={() => {
				visible = true;
			}}>log in</button
		>
		<!-- <svelte:window on:click={()=>{visible=false}} /> -->
	</div>
</div>

{#if visible || form?.incorrect}
	<div class="form-wrap">
		<form method="POST" transition:fly={{ y: 100, duration: 500 }}>
			<div class="form-wrap-inner">
				<label>
					enter the passphrase
					<input name="passphrase" autocomplete="off" />

					{#if form?.incorrect}
						<p class="error">wrong passphrase!</p>
					{/if}
				</label>
			</div>
		</form>
	</div>
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
		min-height: 100vh;
	}

	.page-login .login-box {
		text-align: center;
	}

	.error {
		color: red;
	}

	.form-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background-color: hsla(200, 20%, 20%, 0.5);
	}

	.form-wrap .form-wrap-inner {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50vh;
		height: 50vh;
		border-radius: 4px;
		background-color: #fff;
	}
</style>
