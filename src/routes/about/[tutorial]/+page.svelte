<script>
	export let data;
	import { title, desc } from '@src/stores.js';
	title.set(data.param);
	desc.set(data.desc);
</script>

<div role="article">
	<div class="detail">
		{@html data.cont}
	</div>
</div>

<style>
	[role='article'] {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.detail {
		padding: 20px;
		margin: 20px;
		border-radius: 4px;
		text-align: center;
		background-color: #fff;

		& h1,
		& h2,
		& h3,
		& h4,
		& h5,
		& h6 {
			color: #333;
			font-size: 20px;
		}

		& p {
			color: #333;
			font-size: 16px;
		}
	}
</style>
