<script>
    import { fade } from 'svelte/transition';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import * as THREE from 'three';
	// @ts-ignore
	import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
	// @ts-ignore
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { onMount, beforeUpdate, afterUpdate, onDestroy, tick } from 'svelte';
	import { navigating, page } from '$app/stores';
    import { title } from '@src/stores.js';
    title.set(`角色-${$page.params.character}`);

	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let timeId = null;
	let loadFin = false;
	let lc = false;
	let isshow = false; // 显示没总长度的已加载

	$: progress = 0;

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

	let isMove = false;
	const pos = {x: 0, y: 9.1, z: 19};
	const look = {x: 0, y: 9.1, z: 0};

	class model {
		/**
		 * @param {HTMLCanvasElement} canvas
		 */
		constructor(canvas) {
			this.canvas = canvas;
			this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
			this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100); // FOV, aspect, near, far
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.scene = new THREE.Scene();
			this.init();
		}

		init() {
			this.renderer.setClearColor(0x000000, 0);
			// this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.setCamera(pos, look);
            this.setControl(look);
            this.setScence();
		}

		/**
		 * @param {{ x: number; y: number; z: number; }} pos
		 * @param {{ x: number;y: number;z: number; }} look
		 */
		setCamera(pos, look) {
			this.camera.position.x = pos.x;
			this.camera.position.y = pos.y;
			this.camera.position.z = pos.z;
			this.camera.lookAt(look.x, look.y, look.z);
		}

		/**
		 * @param {{ x: number; y: number; z: number; }} look
		 */
		setControl(look) {
			this.controls.target.set(look.x, look.y, look.z);
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
			const loader = new MMDLoader().setPath(`/model/${name}/`);
			loader.load(
				`${name}.pmx`,
				function (/** @type {THREE.Object3D<THREE.Event>} */ mesh) {
					that.scene.add(mesh);
					that.animate();
				},
				function (/** @type {{ loaded: number; total: number; lengthComputable: boolean}} */ xhr) {
					const {loaded, total, lengthComputable} = xhr;

					if (timeId) {
						clearTimeout(timeId);
					}

					timeId = setTimeout(() => {
						loadFin = true;
					}, 1500);

					lc = lengthComputable;

					// lengthComputable 为 false 表示无法获取总长度
					if (lc) {
						progress = Math.round((loaded / total) * 100);
					}
					else {
						isshow = true;
						progress = parseFloat((loaded / 1024 / 1024).toFixed(2));
					}
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
			this.camera.clear();
			// this.controls.dispose();
			this.scene.clear();
		}
	}

	onMount(() => {
		Model = new model(canvas);
		Model.loadModel($page.params.character);
	});

	// onMount 初始化前会执行一次beforeUpdate
	beforeUpdate(() => {});

	afterUpdate(() => {});

	beforeNavigate(({to}) => {
		if (to === null || to?.params === null) {
			return
		}

		// beforeNavigate 比 $page 快, 所以这里要用 to.params
    	title.set(`角色-${to.params.character}`);
		progress = 0;
		Model.dispose();
		Model.init();
		Model.loadModel(to.params.character);
	});

	afterNavigate(() => {});

	onDestroy(() => {
		Model.dispose();
	});
</script>

<div class="canvas-wrap">
	<div class="js-inner" bind:this={inner}>
		<canvas bind:this={canvas} />
	</div>
	<h1>{$page.params.character}</h1>
</div>

{#if progress !== 100 && lc}
	<div in:fade out:fade class="mask">loading {progress}%</div>
{:else if !lc && !loadFin && isshow}
	<div in:fade out:fade class="mask">已加载 {progress} MB</div>
{/if}

<div class="range-wrap" on:mouseenter={()=>{isMove = true;}} on:mouseleave={()=>{isMove = false;}} role="form">
	<h2>set camera position：</h2>
	<input type="range" bind:value={pos.x} min="-100" step="0.1" max="100" on:input={()=>{Model.setCamera(pos, look)}}>x：{pos.x}
	<input type="range" bind:value={pos.y} min="-100" step="0.1" max="100" on:input={()=>{Model.setCamera(pos, look)}}>y：{pos.y}
	<input type="range" bind:value={pos.z} min="-100" step="0.1" max="100" on:input={()=>{Model.setCamera(pos, look)}}>z：{pos.z}
	<button on:click={()=>{
		pos.x = 0;
		pos.y = 0;
		pos.z = 0;
		Model.setCamera(pos, look);
	}}>reset position zero</button>

	<h2>set camera look at：</h2>
	<input type="range" bind:value={look.x} min="-100" step="0.1" max="100" on:input={()=>{
		Model.setCamera(pos, look);
		Model.setControl(look);
	}}>x：{look.x}
	<input type="range" bind:value={look.y} min="-100" step="0.1" max="100" on:input={()=>{
		Model.setCamera(pos, look);
		Model.setControl(look);
	}}>y：{look.y}
	<input type="range" bind:value={look.z} min="-100" step="0.1" max="100" on:input={()=>{
		Model.setCamera(pos, look);
		Model.setControl(look);
	}}>z：{look.z}
	<button on:click={()=>{
		look.x = 0;
		look.y = 0;
		look.z = 0;
		Model.setCamera(pos, look);
		Model.setControl(look);
	}}>reset look at zero</button>
</div>

<style>
	.canvas-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;

		& canvas {
			width: 50vw;
			height: 50vh;
		}

		& h1 {
			flex-basis: 100%;
			text-align: center;
			color: #fff;
		}
	}

	.mask {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		color: #fff;
		font-size: 18px;
		background: hsla(0, 0%, 0%, 0.5);
	}
	
	.range-wrap {
		padding: 20px 20px 20vh;
		color: #fff;

		& input {
			width: 100%;
		}

		& button {
			display: block;
			line-height: 35px;
			padding: 0 8px;
			margin: 20px auto;
			cursor: pointer;
			border: 0;
			border-radius: 4px;
			color: #333;
			background-color: #fff;
		}
	}
</style>
