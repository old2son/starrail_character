<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import './styles.css';
	import { title } from '@src/stores.js';

	let hide = true;

	afterNavigate(({ to }) => {
		if (to?.route?.id?.match(/^\/$/)?.length || to?.route?.id?.match(/^\/\(authed\)\/characters$/)?.length) {
			hide = true;
		} 
		else {
			hide = false;
		}
	});

	// 刷新页面不触发
	beforeNavigate(() => {});
</script>

<svelte:head>
	<title>{$title}</title>
	<meta name="description" content={$title} />
</svelte:head>

<slot />

<footer> 
    <a class="btn-back" class:hide href="/" >go back</a>
</footer>

<style>
	.hide {
		display: none;
	}

	.btn-back {
		position: fixed;
		left: 50%;
		bottom: 20px;
		width: 50vw;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border-radius: 40px;
		transform: translateX(-50%);
		color: #fff;
		background-color: grey;
	}
</style>
