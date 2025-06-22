<script>
	import { onMount } from 'svelte';
	export let city = '广州';

	/** @type {RequestInit} */
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	onMount(async () => {
		try {
			const newsRes = await fetch('/newsApi', requestOptions);
			const newsResult = await newsRes.text();

			const weatherRes = await fetch('/weatherApi?city=' + city, requestOptions);
			const weatherResult = await weatherRes.text();
		}
		catch (err) {
			console.error('Fetch error:', err);
		}
    });
</script>

<div class="weather">
	<slot name="text" />
</div>

<style>
</style>
