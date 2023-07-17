<script>
    import home from '@videos/home.mp4';
    import { title } from '@src/stores.js';
    import Nav from './nav.svelte';
    title.set('home page'); 
    let canvas
</script>

<Nav />
<div>
    <canvas bind:this={canvas}></canvas>
</div>


<style>
canvas {
    width: 100%;
    height: 100%;
}
</style>