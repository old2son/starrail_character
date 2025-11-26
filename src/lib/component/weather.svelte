<script>
	import { onMount, createEventDispatcher } from 'svelte';
	/** @type {string} */
    let { city, desc } = $props();

	/** @type {RequestInit} */
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	// const dispatch = createEventDispatcher();

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
		<input type="text" autocomplete="off" id="city" bind:value={city} placeholder="在哪~" onkeydown={handleKeydown}>
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
		background-color: hsla(0,0%,100%,.22);
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
        background-color: rgba(0,0,0,.9);

		& .input-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	}
	
</style>
