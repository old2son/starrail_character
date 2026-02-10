<script>
	import Nav from '@src/lib/component/nav.svelte';
	import Weather from '@src/lib/component/weather.svelte';
	// import videoHome from '$lib/videos/home.mp4';
	import { toast, showToast } from '$lib/store/toast.js';
	import { onMount, onDestroy } from 'svelte';
	import { title, desc } from '@src/stores.js';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	title.set('首页');
	desc.set('首页描述');

	const logged = typeof data.logged === 'boolean' ? data.logged : false;
	
	let city = $state('');

	/** @type {{ [key: string]: any } | null} */
	let weatherResult = $state(null);
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	/**
	 * @type {HTMLVideoElement}
	 */
	let video;

	const weatherMap = [
		{ keyword: '雨', icon: '🌧' },
		{ keyword: '雷', icon: '⛈' },
		{ keyword: '风', icon: '🌬' },
		{ keyword: '晴', icon: '🌞' },
		{ keyword: '云', icon: '☁' }
	];

	onMount(() => {
		videoInit();
		canvasSize();
		draw();
	});

	const videoInit = () => {
		video = document.createElement('video');
		video.src = '/videos/home.mp4';
		video.muted = true;
		video.autoplay = true;
		video.loop = true;
		// video.play();
	};

	const canvasSize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	const draw = () => {
		if (!canvas) {
			return;
		}

		let ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('canvas 2d context is null');
		}

		const cw = canvas.width;
		const ch = canvas.height;

		const vw = video.videoWidth;
		const vh = video.videoHeight;

		const canvasRatio = cw / ch;
		const videoRatio = vw / vh;

		let sx, sy, sw, sh;

		if (videoRatio > canvasRatio) {
			// 视频更宽，左右裁剪
			sh = vh;
			sw = vh * canvasRatio;
			sx = (vw - sw) / 2;
			sy = 0;
		} else {
			// 视频更高，上下裁剪
			sw = vw;
			sh = vw / canvasRatio;
			sx = 0;
			// sy = (vh - sh) / 2;
			// 裁剪上面部分，主要展示下方人物
			sy = (vh - sh) / 0.85;
		}

		ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
		// requestAnimationFrame(draw);
	};

	/**
	 * @param {CustomEvent} event
	 */
	// 接收子组件传递过来的数据
	function handleUpdate(event) {
		console.log(event);
		weatherResult = JSON.parse(JSON.stringify(event));

		if (!weatherResult) {
			showToast('获取天气失败', 'error');
			return;
		}

		showToast('获取天气成功', 'success');

		weatherResult.data.forEach(
			/** @param {{ weather: string }} weatherData */
			(weatherData) => {
				for (const { keyword, icon } of weatherMap) {
					if (weatherData.weather.includes(keyword)) {
						weatherData.weather = icon;
					}
				}
			}
		);
	}
</script>

<Nav {logged} />
<Weather {city} updated={handleUpdate}>
	{#snippet desc()}
		<div class="flex justify-center flex-wrap w-full text-gray-400 text-base">
			{#if weatherResult}
				<div transition:slide={{ duration: 300 }}>
					<p class="mt-2.5 -ml-10 flex-basis-full text-center">{weatherResult?.city ?? city}天气</p>
					<ul class="flex-basis-full px-5 m-0 mt-2 -ml-10 leading-7 list-none text-center">
						{#each weatherResult.data as { air_quality, date, temperature, weather, wind }}
							<li>{date} {temperature} {air_quality} {weather} {wind}</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	{/snippet}
</Weather>

<svelte:window on:resize={canvasSize} />

<canvas class="fixed top-0 z-0" bind:this={canvas}></canvas>

{#if $toast.show}
	<div
		class="fixed top-1/2 left-1/2 z-30 px-6 py-3 rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 text-white text-sm animate-fade-in-out {$toast.type ===
		'success'
			? 'bg-green-500'
			: $toast.type === 'error'
				? 'bg-red-500'
				: $toast.type === 'info'
					? 'bg-blue-500'
					: 'bg-orange-500'}"
	>
		{$toast.message}
	</div>
{/if}
