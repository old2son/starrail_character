<script>
    import * as THREE from 'three';
    // @ts-ignore
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    // @ts-ignore
    import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
    import { onMount } from 'svelte';
    import src from '@images/angle1.webp';

    /**
	 * @type {HTMLCanvasElement}
	 */
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

        const loader = new MMDLoader().setPath( 'src/lib/model/xf/' );
        loader.load(
            'xf.pmx',
            function ( mesh ) {
                scene.add( mesh );
                animate();
            },
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
        
        // const loader = new GLTFLoader().setPath( 'src/lib/model/' );
        
        // // @ts-ignore
        // loader.load( 'ice_pop.glb', function ( gltf ) {
        //     scene.add( gltf.scene );
        //     renderer.render(scene, camera);
        // // @ts-ignore
        // }, undefined, function (error) {
        //     console.error( error );
        // } );

        /**
		 * @param {number} record
		 */
        function animate(record) {
            var test = requestAnimationFrame(animate);
            console.log(record / 1000);
            if (record / 1000 > 10) {
                cancelAnimationFrame(test);
                return;
            }
            console.log(record / 1000 , 'after');
            renderer.render(scene, camera);
        }
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
        /* width: 300px !important;
        height: 300px !important; */
    }
</style>