<script>
	export let data;
	import { title } from '@src/stores.js';
	title.set(data.param);
</script>

<div class="detail">
	{@html data.cont}
</div>

<style>
    .detail {
        padding: 20px;
        border: 4px;
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
