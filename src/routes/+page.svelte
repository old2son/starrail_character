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
    $: city = '广州';

    /** @type {{ [key: string]: any }} */
	let weatherResult;
    /**
	 * @type {HTMLCanvasElement}
	 */
    let canvas;
    /**
	 * @type {HTMLVideoElement}
	 */
    let video;

    onMount(() => {
        videoInit();
        canvasSize();
        draw();
    });

    const videoInit = () => {
        video = document.createElement('video');
        video.src = videoHome;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.play();
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
        } 
        else {
            // 视频更高，上下裁剪
            sw = vw;
            sh = vw / canvasRatio;
            sx = 0;
            // sy = (vh - sh) / 2;
            // 裁剪上面部分，主要展示下方人物
            sy = (vh - sh) / 0.85; 
        }

        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
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

<canvas class="canvas" bind:this={canvas}  style="width: 100vw; height: 100vh;" />

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
