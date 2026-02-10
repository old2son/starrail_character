<script>
	import { PUBLIC_API_WEATHER_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	/**
	 * @typedef Props
	 * @property {string} city
	 * @property {() => any=} descSlot
	 * @property {(data: any) => void=} updated
	 */

	/** @type {Props} */
	let { city, descSlot, updated } = $props();

	/** @type {RequestInit} */
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	async function getWeather() {
		try {
			const weatherRes = await fetch(`/weatherApi/current.json?q=${city}&key=${PUBLIC_API_WEATHER_KEY}`, requestOptions);
			const weatherResult = await weatherRes.json();
			return Promise.resolve(weatherResult);
		} catch (err) {
			console.error('Fetch error:', err);
		}
	}

	async function getNews() {
		try {
			const newsRes = await fetch('/newsApi', requestOptions);
			const newsResult = await newsRes.text();
		} catch (err) {
			console.error('Fetch error:', err);
		}
	}

	// 子组件传父组件
	function handleCheck() {
		getWeather()
			.then((weatherRes) => {
				updated?.(weatherRes.current);
			})
			.catch((err) => {
				updated?.(err);
			});
	}

	/** @param {MouseEvent} event */
	function handleClick(event) {
		if (event.type === 'click') {
			handleCheck();
		}
	}

	/** @param {KeyboardEvent} event */
	function handleKeydown(event) {
		if (event.key === 'Enter') {
			handleCheck();
		}
	}
</script>

<div class="fixed top-1/2 left-1/2 z-20 w-72 sm:w-80 p-4 overflow-hidden rounded-lg -translate-x-1/2 -translate-y-1/2 bg-black/90 flex justify-center items-center flex-wrap">
	<div class="flex justify-center items-center w-full">
		<input
			type="text"
			autocomplete="off"
			id="city"
			bind:value={city}
			placeholder="在哪~"
			onkeydown={handleKeydown}
			class="flex w-full h-7.5 leading-7.5 px-4 mx-auto mt-2.5 outline-none border-0 text-center border-b border-gray-400 transition-colors duration-300 ease-in-out text-yellow-600 text-xl bg-transparent focus:border-yellow-600 placeholder-gray-400"
		/>
		<button class="flex justify-center items-center w-11 h-8.75 rounded-full text-yellow-600 text-xl bg-white/22" onclick={handleClick}>🔍</button>
	</div>
	{@render descSlot?.()}
</div>

