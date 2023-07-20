<script>
	import src from '$lib/images/angle1.webp';
	import { title } from '@src/stores.js';
    title.set('user page'); 
</script>

<div class="page-user">
	<div class="user-box">
		<h1><img {src} alt="avator" /></h1>
		<form method="POST" action="?/logout">
			<button style:--color-theme-1="gray">log out</button>
		</form>
	</div>
</div>

<style>
	img {
		width: 100px;
        height: 100px;
		border-radius: 50%;
	}

	button {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		color: var(--color-theme-1);
		background-color: #fff;
	}

	h1 {
		flex-basis: 100%;
	}
	
	.page-user {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.user-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
