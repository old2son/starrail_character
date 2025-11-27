<script>
	import { PUBLIC_API_WEATHER_KEY } from '$env/static/public';
	import { onMount } from 'svelte';
	/**
	 * @typedef Props
	 * @property {string} city
	 * @property {() => any=} desc
	 * @property {(data: any) => void=} updated
	 */

	/** @type {Props} */
	let { city, desc, updated } = $props();

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

<div class="weather">
	<div class="input-wrap">
		<input
			type="text"
			autocomplete="off"
			id="city"
			bind:value={city}
			placeholder="在哪~"
			onkeydown={handleKeydown}
		/>
		<button class="btn" onclick={handleClick}>🔍</button>
	</div>
	{@render desc?.()}
</div>

<style>
	input[id='city'] {
		display: flex;
		width: 100%;
		height: 30px;
		line-height: 30px;
		padding: 0 15px;
		margin: 10px auto 0;
		outline: none;
		border: 0;
		text-align: center;
		border-bottom: 1px solid #bbb;
		transition: border-bottom 0.3s ease-in-out;
		color: var(--color-gold);
		font-size: 20px;
		background-color: transparent;

		&:focus {
			border-bottom: 1px solid var(--color-gold);
		}

		&::placeholder {
			color: var(--color-theme-2);
		}
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 35px;
		border-radius: 50%;
		color: var(--color-gold);
		font-size: 20px;
		background-color: hsla(0, 0%, 100%, 0.22);
	}

	.weather {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 2;
		width: 300px;
		padding: 15px 20px;
		overflow: hidden;
		border-radius: 8px;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.9);

		& .input-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	}
</style>
