<script>
	import { onMount, createEventDispatcher } from 'svelte';
	/** @type {string} */
	export let city;

	/** @type {RequestInit} */
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	const dispatch = createEventDispatcher();

	async function getWeather () {
		try {
			const weatherRes = await fetch('/weatherApi?city=' + city, requestOptions);
			const weatherResult = await weatherRes.json();
			if (weatherResult.code === 200) {
				return Promise.resolve(weatherResult);
			}
			else {
				return Promise.reject('获取天气失败');
			}
		}
		catch (err) {
			console.error('Fetch error:', err);
		}
	}

	async function getNews () {
		try {
			const newsRes = await fetch('/newsApi', requestOptions);
			const newsResult = await newsRes.text();
		}
		catch (err) {
			console.error('Fetch error:', err);
		}
	}

	// 子组件传父组件
	function handleCheck() {
		getWeather().then((weatherRes) => {
			dispatch('update', weatherRes.data);
		})
		.catch((err) => {
			dispatch('update', err);
		})
	}

	onMount(() => {
		// getNews();
		// getWeather();
		handleCheck();
    });
</script>

<div class="weather">
	<input type="text" id="city" bind:value={city} placeholder="广州" >
	<button class="btn" on:click={handleCheck}>查天气</button>
	<slot name="desc" />
</div>

<style>
	input[id='city'] {
		display: flex;
		width: 100%;
		height: 30px;
		line-height: 30px;
		padding: 3px 10px;
		margin: 10px auto 0;
		outline: none;
		border: 0;
		border-bottom: 1px solid var(--color-theme-2);
		color: var(--color-text);
		font-size: 20px;
		background-color: #fff;
	}

	.btn {
		display: flex;
		margin-top: 40px;
		font-size: 20px;
	}

	.weather {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		position: relative;
		z-index: 2;
		width: 400px;
		padding: 40px 0;
		border-radius: 8px;
		background-color: #FFF;
	}
</style>
