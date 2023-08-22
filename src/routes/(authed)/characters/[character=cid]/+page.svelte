<script>
	import * as THREE from 'three';
	// @ts-ignore
	import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
	// @ts-ignore
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
	import { page } from '$app/stores';
    import { title } from '@src/stores.js';
    title.set($page.params.character);

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;

	/**
	 * @type {HTMLDivElement}
	 */
	let inner;

    /**
     * @type {model}
     */
    let Model;

	class model {
		/**
		 * @param {HTMLCanvasElement} canvas
		 */
		constructor(canvas) {
			this.canvas = canvas;
			this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
			this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.scene = new THREE.Scene();
			this.init();
		}

		init() {
			this.renderer.setClearColor(0x000000, 0);
			// this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.setCamera();
            this.setControl();
            this.setScence();
		}

		setCamera() {
			this.camera.position.z = 20;
			this.camera.lookAt(0, 0, 0);
		}

		setControl() {
			this.controls.target.set(0, 3, 0);
			this.controls.enablePan = false;
			this.controls.enableRotate = true;

			const polarAngle = Math.PI / 2;
			this.controls.minPolarAngle = polarAngle;
			this.controls.maxPolarAngle = polarAngle;
			this.controls.enableZoom = false;
			this.controls.enableDamping = true;
        }

		setScence() {
			const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
			this.scene.add(ambientLight);
		}

		/**
		 * @param {string} name
		 */
		loadModel(name) {
			const that = this;
			const loader = new MMDLoader().setPath(`../src/lib/model/${name}/`);
			loader.load(
				`${name}.pmx`,
				function (/** @type {THREE.Object3D<THREE.Event>} */ mesh) {
					that.scene.add(mesh);
					that.animate();
				},
				function (/** @type {{ loaded: number; total: number; }} */ xhr) {
					console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				},
				function (/** @type {any} */ error) {
					throw new Error(error);
				}
			);

            return loader;
		}

        // 定义在类中获得 this
		animate = () => {
			requestAnimationFrame(this.animate);
			this.renderer.render(this.scene, this.camera);
		}

		dispose() {
			this.renderer.dispose();
			this.controls.dispose();
			this.camera.clearViewOffset();
			this.scene.clear();
		}
	}

	onMount(() => {});

	// onMount 初始化前会执行一次beforeUpdate
	beforeUpdate(() => {});

	afterUpdate(() => {
		if (!Model) {
			Model = Model || new model(canvas);
		}
		else {
			Model.dispose();
			Model.init();
		}

		Model.loadModel($page.params.character);
	});

	onDestroy(() => {
		Model.dispose();
	});
</script>

<div class="canvas-wrap">
	<div class="js-inner" bind:this={inner}>
		<canvas bind:this={canvas} />
	</div>
	<h3>{$page.params.character}</h3>
</div>

<style>
	.canvas-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;

		& canvas {
			width: 50vh;
			height: 50vh;
		}

		& h3 {
			flex-basis: 100%;
			text-align: center;
			color: #fff;
		}
	}
</style>
