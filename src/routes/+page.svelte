<script>
    export let data;
    import Nav from '@src/lib/component/nav.svelte';
    import Weather from '@src/lib/component/weather.svelte';
    import videoHome from '$lib/videos/home.mp4';
    import { onMount, onDestroy } from 'svelte';
    import { title, desc } from '@src/stores.js';
    title.set('首页'); 
    desc.set('首页描述');

    const logged = typeof data.logged === 'boolean' ? data.logged : false;
    /** @type {{ [key: string]: any }} */
	let weatherResult;
    $: city = '广州';
    
    /**
	 * @type {HTMLCanvasElement}
	 */
    let canvas;
    /**
	 * @type {HTMLVideoElement}
	 */
    let video;

    // $: cw = canvas?.width < 1440 ? 1440 : canvas?.width > 1920 ? 1920 : canvas?.width ;
    $: cw = canvas?.width < 1280 ? 1280 : canvas?.width > 1920 ? 1920 : canvas?.width;
    // $: ch = canvas?.height < 768 ? 768 : canvas?.height > 1920 ? 1080 : canvas?.width / 1.777 ;
    $: ch = canvas?.height < 768 ? 768 : canvas?.height > 1920 ? 1080 : canvas?.height;

    onMount(() => {
        videoInit();
        canvasSize();
        draw();
    });

    const videoInit = () => {
        video = document.createElement('video');
        video.addEventListener('ended', () => {
            video.play();
        });

        video.addEventListener('click', () => {
            video.play();
        });

        video.src = videoHome;
        video.muted = true;
        video.autoplay = true;
        video.click();
    }

    const canvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const draw = () => {
        if (!canvas) {
            return;
        }

        let ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('canvas 2d context is null');
        }

        ctx.drawImage(video, 0, 0, 1920, 1080, 0, 0, cw, ch);  
        requestAnimationFrame(draw);
    }

    /**
     * @param {CustomEvent} event
     */
    // 接收子组件传递过来的数据
    function handleUpdate(event) {
        weatherResult = event.detail;
    }

</script>

<Nav {logged}/>
<Weather {city} on:update={handleUpdate}>
    <div class="desc" slot="desc">
        <p class="title">{weatherResult?.city ?? city}天气</p>
        {#if weatherResult?.data}
            <ul class="info">
                {#each weatherResult.data as { air_quality, date, temperature, weather, wind }}
                    <li>{date} {temperature} {air_quality} {weather} {wind}</li>
                {/each}
            </ul>
        {/if}
    </div>
</Weather>

<svelte:window on:resize={canvasSize} />

<canvas class="canvas" bind:this={canvas} />

<style>
    .canvas {
        position: fixed;
        top: 0;
        z-index: 1;
    }

    .desc {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        & .title {
            flex-basis: 100%;
            text-align: center;
        }

        & .info {
            flex-basis: 100%;
            padding: 0 20px;
            margin: 0;
            list-style: none;
        }
    }
</style>
