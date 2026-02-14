<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import './styles.css';
	import { title, desc, headerHover } from '@src/stores.js';
	import Header from '@src/lib/component/header.svelte';
	let { children } = $props();

	let hide = $state(true);

	const goBack = () => {
		window.history.back();
	};

	afterNavigate(({ to }) => {
		console.log(to);
		if (
			to?.route?.id?.match(/^\/$/)?.length ||
			to?.route?.id?.match(/^\/\(authed\)\/characters/)?.length || 
			to?.route?.id?.match(/^\/user$/)?.length ||
			!to?.route?.id
		) {
			hide = true;
		} else {
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
{@render children?.()}
<footer>
	<button class="fixed left-1/2 bottom-20 w-30 h-8.75 leading-8.75 text-center border-0 rounded-[40px] cursor-pointer -translate-x-1/2 text-white bg-gray-500 {hide ? 'hidden' : ''}" onclick={goBack}>返回</button>

	<p class="fixed left-0 right-0 bottom-0 z-20 m-0 py-2.5 text-center text-gray-400 text-sm bg-black" id="icp">
		<a
			href="https://beian.mps.gov.cn/#/query/webSearch?code=61011302001964"
			rel="noreferrer"
			target="_blank"
			class="transition-colors duration-200 ease-in-out no-underline text-gray-400 hover:text-white">粤ICP备2025430656号-1</a
		>
	</p>
</footer>

