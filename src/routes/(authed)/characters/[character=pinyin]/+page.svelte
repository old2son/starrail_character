<script>
	import { fade } from 'svelte/transition';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import * as THREE from 'three';
	import { MMDLoader, OrbitControls } from 'three-stdlib';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/state';
	import { title } from '@src/stores.js';

	/**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
	let timeId = null;
	let loadFin = $state(false);
	let lc = $state(false);
	let isshow = $state(false); // 显示没总长度的已加载

	let progress = $state(0);

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

	let pos = $state({ x: 0, y: 9.1, z: 19 });
	let look = $state({ x: 0, y: 9.1, z: 0 });

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
				function (/** @type {THREE.Object3D} */ mesh) {
					that.scene.add(mesh);
					that.animate();
				},
				function (/** @type {{ loaded: number; total: number; lengthComputable: boolean}} */ xhr) {
					const { loaded, total, lengthComputable } = xhr;

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
					} else {
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
		};

		dispose() {
			this.renderer.dispose();
			this.camera.clear();
			// this.controls.dispose();
			this.scene.clear();
		}
	}

	beforeNavigate(({ to }) => {
		if (to === null || to?.params === null) {
			return;
		}

		// beforeNavigate 比 page 快, 所以这里要用 to.params
		title.set(`角色-${to.params.character}`);
		progress = 0;
		Model.dispose();
		Model.init();
		// @ts-ignore
		Model.loadModel(to.params.character);
	});

	afterNavigate(() => {});

	onMount(() => {
		Model = new model(canvas);
		// @ts-ignore
		Model.loadModel(page.params.character);
	});

	onDestroy(() => {
		Model.dispose();
	});

	title.set(`角色-${page.params.character}`);
</script>

<div class="w-full">
	<div class="js-inner" bind:this={inner}>
		<canvas bind:this={canvas} class="w-[50vw] h-[50vh] mx-auto"></canvas>
	</div>
	<h1 class="flex-basis-full text-center text-white">{page.params.character}</h1>
</div>

{#if progress !== 100 && lc}
	<div
		in:fade
		out:fade
		class="fixed inset-0 z-2 flex items-center justify-center bg-black/50 text-white text-lg"
	>
		loading {progress}%
	</div>
{:else if !lc && !loadFin && isshow}
	<div
		in:fade
		out:fade
		class="fixed inset-0 z-2 flex items-center justify-center bg-black/50 text-white text-lg"
	>
		已加载 {progress} MB
	</div>
{/if}

<div class="p-5 pb-20vh text-white" onmouseenter={() => {}} onmouseleave={() => {}} role="form">
	<h2>set camera position：</h2>
	<input
		type="range"
		bind:value={pos.x}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
		}}
	/>x：{pos.x}
	<input
		type="range"
		bind:value={pos.y}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
		}}
	/>y：{pos.y}
	<input
		type="range"
		bind:value={pos.z}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
		}}
	/>z：{pos.z}
	<button
		class="block mx-auto my-5 px-2 py-0.5 bg-white text-gray-800 rounded-md cursor-pointer"
		onclick={() => {
			pos.x = 0;
			pos.y = 0;
			pos.z = 0;
			Model.setCamera(pos, look);
		}}>reset position zero</button
	>

	<h2>set camera look at：</h2>
	<input
		type="range"
		bind:value={look.x}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
			Model.setControl(look);
		}}
	/>x：{look.x}
	<input
		type="range"
		bind:value={look.y}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
			Model.setControl(look);
		}}
	/>y：{look.y}
	<input
		type="range"
		bind:value={look.z}
		min="-100"
		step="0.1"
		max="100"
		class="w-full"
		oninput={() => {
			Model.setCamera(pos, look);
			Model.setControl(look);
		}}
	/>z：{look.z}
	<button
		class="block mx-auto my-5 px-2 py-0.5 bg-white text-gray-800 rounded-md cursor-pointer"
		onclick={() => {
			look.x = 0;
			look.y = 0;
			look.z = 0;
			Model.setCamera(pos, look);
			Model.setControl(look);
		}}>reset look at zero</button
	>
</div>
