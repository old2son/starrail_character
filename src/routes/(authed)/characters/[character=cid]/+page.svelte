<script>
    import * as THREE from 'three';
    // @ts-ignore
    import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';

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
        camera.position.z = 20;
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const loader = new MMDLoader().setPath( `../src/lib/model/fx/` );
        loader.load(
            'fx.pmx',
            // @ts-ignore
            function ( mesh ) {
                scene.add( mesh );
                animate();
            },
                // @ts-ignore
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // @ts-ignore
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
        
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    }

    onMount(() => {
        setTimeout(() => {
            // init3d();
        }, 2000);
    });

    onDestroy(() => {
        console.log('destroy');
        canvas.remove();
    });

</script>

<div>
    <canvas id="c" bind:this={canvas}></canvas>
    <span style="color:aqua">{$page.params.character}</span>
</div>

<style>
    canvas {
        width: 300px !important;
        height: 300px !important;
    }
</style>