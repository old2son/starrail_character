<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import './styles.css';
	import { title, desc } from '@src/stores.js';
    import Header from '@src/lib/component/header.svelte';

	let hide = true;

	const goBack = () => {
    	window.history.back();
  	}

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
	<meta name="description" content={$desc} />
</svelte:head>

<Header title={$title} />
<slot />
<footer> 
    <button class="btn-back" class:hide on:click={goBack}>Go Back</button>

	<p class="info-icp">
		<a
			href="https://beian.mps.gov.cn/#/query/webSearch?code=61011302001964"
			rel="noreferrer"
			target="_blank">粤ICP备2025430656号-1</a
		>
	</p>
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
		border: 0;
		border-radius: 40px;
		cursor: pointer;
		transform: translateX(-50%);
		color: #fff;
		background-color: grey;
	}

	.info-icp {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0px;
		z-index: 2;
		margin: 0;
		text-align: center;
		color: #676767;
		font-size: 20px;
		background-color: #3c3c3c;

		& a {
			color: #fff;
		}
	}
</style>
