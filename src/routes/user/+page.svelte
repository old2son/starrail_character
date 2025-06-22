<script>
    export let data;
	import avatar_default from '$lib/images/avatar_default.webp';
	import avatar1 from '$lib/images/avatar_01.webp';
	import avatar2 from '$lib/images/avatar_02.gif';
	import avatar3 from '$lib/images/avatar_03.gif';
	import { title, desc } from '@src/stores.js';
    title.set('个人中心');
    desc.set('来玩吧！');

	$: src = data.avatarSrc || avatar_default;
	const imgArr = [avatar1, avatar2, avatar3];
</script>

<div class="page-user">
	<div class="user-box">
		<h6>choose avator</h6>
		<form class="box-select" method="POST" action="?/saveAvatar">
			{#each imgArr as img, i}
				<div
					class="avatar-wrap"
					on:click={() => { src = img; }}
					on:keydown={() => { src = img; }}
					role="button"
					tabindex={i}
				>
					<img src={img} alt="avator other" />
				</div>
			{/each}
			
			<div class="btn-wrap">
				<input type="hidden" name="avatar" value={src}>
				<button style:--color-theme-1="rgb(251, 139, 5)">save avatar</button>
			</div>
		</form>

		<h1><img {src} alt="avator default" /></h1>
		<form method="POST" action="?/logout">
			<button style:--color-theme-1="gray">log out</button>
		</form>
	</div>
</div>

<style>
	img {
		width: var(--img-width);
        height: var(--img-heihgt);
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
		margin: 10px 0;
	}

	h6 {
		margin: 10px 0;
		color: #fff;
		font-size: 16px;
		font-weight: normal;
	}
	
	.page-user {
		--img-width: 100px;
		--img-heihgt: 100px;

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
		min-height: 100vh;
	}

	.user-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		flex-basis: 100%;

		& .box-select { 
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			flex-basis: 100%;

			& button {
				cursor: pointer;
			}
			
			& img {
				width: calc(var(--img-width) / 2);
				height: calc(var(--img-heihgt) / 2);
			}

			& .avatar-wrap {
				width: calc(var(--img-width) / 2);
				height: calc(var(--img-heihgt) / 2);
				margin: 0 6px;
				overflow: hidden;
				border: 2px solid transparent;
				border-radius: 50%;
				cursor: pointer;

				&:hover {
					border-color:#ddd;
				}
			}

			& .btn-wrap {
				margin: 10px 0;
				flex-basis: 100%;
				text-align: center;
			}
		}
	}
</style>
