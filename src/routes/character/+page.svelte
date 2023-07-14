<script>
    import * as THREE from 'three';
    // @ts-ignore
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { onMount } from 'svelte';
    import src from '@images/angle1.webp';

    let canvas;

    const init3d = () => {
        const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
        renderer.setClearColor(0x000000, 0);
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight);
        // @ts-ignore
        camera.position.z = 8;
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const loader = new GLTFLoader().setPath( `${base}/lib/model/` );
        
        // @ts-ignore
        loader.load( 'ice_pop.glb', function ( gltf ) {
            scene.add( gltf.scene );
            renderer.render(scene, camera);
        // @ts-ignore
        }, undefined, function (error) {
            console.error( error );
        } );

    }

    onMount(() => {
        init3d();
    });

</script>

<div>
    <canvas id="c" bind:this={canvas}></canvas>
    <img {src} width="100px" height="100px" alt="avator">
</div>

<style>
    canvas {
        width: 300px !important;
        height: 300px !important;
    }
</style>