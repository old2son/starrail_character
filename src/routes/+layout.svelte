<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import './styles.css';
	import { title, desc, headerHover } from '@src/stores.js';
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

		headerHover.set(false);
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
    <button class="btn-back" class:hide on:click={goBack}>返回</button>

	<p class="info-icp" id="icp">
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
		bottom: 80px;
		width: 120px;
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
		padding: 10px 0;
		text-align: center;
		color: #aaa;
		font-size: 14px;
		background-color: #000;

		& a {
			transition: color 0.2s ease-in-out;
			text-decoration: none;
			color: #aaa;

			&:hover {
				color: #fff;
			}
		}
	}
</style>
