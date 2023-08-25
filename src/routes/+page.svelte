<script>
    export let data;
    import Nav from '@src/routes/nav.svelte';
    import videoHome from '$lib/videos/home.mp4';
    import { onMount } from 'svelte';
    import { title } from '@src/stores.js';
    title.set('home page'); 
    const logged = typeof data.logged === 'boolean' ? data.logged : false;

    /**
	 * @type {HTMLCanvasElement}
	 */
    let canvas;

    onMount(() => {
        canvasSize();
    });

    const canvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

</script>

<Nav {logged}/>
<svelte:window on:resize={canvasSize} />
<canvas bind:this={canvas} />
<!-- todo 首页 canvas 视频 -->
<!-- <track kind="captions"> -->
<video src={videoHome}></video>
<style>

</style>
