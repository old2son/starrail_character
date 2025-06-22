<script>
	export let form;
	import { title, desc } from '@src/stores.js';
	import { fly } from 'svelte/transition';
	title.set('请登陆捏');
    desc.set('是咪咪喵~');
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
	</div>
</div>
<svelte:window
	on:click={(e) => {
		console.log(e.target);
		const target = e.target;
		if (target instanceof HTMLElement && target.classList.contains('js-form-wrap')) {
			visible = false;

			if (form?.incorrect) {
				form.incorrect = false;
			}
		}
	}}
/>

{#if visible || form?.incorrect}
	<div class="form-wrap js-form-wrap">
		<form method="POST" transition:fly={{ y: 100, duration: 500 }}>
			<div class="form-wrap-inner">
				<label>
					enter the passphrase
					<input name="passphrase" autocomplete="off" type="password" placeholder="pwd" />
				</label>

				<button>submit</button>

				{#if form?.incorrect}
					<p class="error">wrong passphrase!</p>
				{/if}
			</div>
		</form>
	</div>
{/if}

<style>
	button {
		padding: 10px;
		margin-top: 20px;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		color: (var(--color-theme-1));
		background-color: #fff;
	}

	h1 {
		width: 100%;
		display: block;
		color: #fff;
	}

	input[name='passphrase'] {
		display: block;
		width: 60%;
		height: 22px;
		line-height: 22px;
		padding: 3px 10px;
		margin: 10px auto 0;
		outline: none;
		border: 0;
		border-radius: 40px;
		color: #fff;
		background-color: var(--color-theme-2);
	}

	input[name='passphrase']::-webkit-input-placeholder {
		color: #f5f5f5;
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
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 100%;
		margin: 20px 0 0;
		text-align: center;
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
		flex-wrap: wrap;
		align-content: flex-start; /* 元素顶部对齐 */
		width: 50vh;
		height: 50vh;
		border-radius: 4px;
		background-color: #f5f5f5;
	}

	.form-wrap .form-wrap-inner label {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 100%;
		line-height: 2;
		margin-top: 70px;
		text-align: center;
		font-size: 18px;
	}
</style>
