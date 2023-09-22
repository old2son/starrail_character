<script>
    export let data;
    import Nav from '@src/routes/nav.svelte';
    import videoHome from '$lib/videos/home.mp4';
    import { onMount, onDestroy } from 'svelte';
    import { title } from '@src/stores.js';
    title.set('home page'); 
    const logged = typeof data.logged === 'boolean' ? data.logged : false;

    /**
	 * @type {HTMLCanvasElement}
	 */
    let canvas;
    /**
	 * @type {HTMLVideoElement}
	 */
    let video;

    $: cw = canvas?.width < 1440 ? 1440 : canvas?.width > 1920 ? 1920 : canvas?.width;
    $: ch = canvas?.height < 768 ? 768 : canvas?.height > 1920 ? 1080 : canvas?.width / 1.777 ;

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
</script>

<Nav {logged}/>
<svelte:window on:resize={canvasSize} />

<canvas class="canvas" bind:this={canvas} />

<style>
    .canvas {
        position: fixed;
        top: 0;
        z-index: 1;
    }
</style>
