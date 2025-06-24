<script>
    // import { setContext } from 'svelte'; 祖先传值
	import { afterNavigate } from '$app/navigation';
	import { headerHover } from '@src/stores.js';
    import { page } from '$app/stores';
    export let title = '标题';
    export let back = true; // 是否显示返回按钮

    back = $page.url.pathname === '/' ? false : true;
    afterNavigate(() => {
        back = $page.url.pathname === '/' ? false : true;
    });
   
    const goBack = () => {
        if (history.length > 1) {
            history.back();
        } else {
            // 没有上一页，默认跳转路径
            location.href = '/';
        }
    };
</script>

<header role="region" class="header" id="header" on:mouseenter={() => headerHover.set(true)} >
    {#if back}
        <button class="back-button" on:click={goBack}>←</button>
    {/if}
    <h1 class="title" style="padding-left: {back ? '0.83vw' : '3.12vw'};">{title}</h1>
</header>

<style>
    .header {
        display: flex;
        align-items: center;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        padding: 0 16px;
        height: 50px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        font-size: 14px;
        background-color: rgba(0,0,0,.8);
    }

    .back-button {
        margin-right: 16px;
        border: none;
        cursor: pointer;
        color: #bebebe;
        font-size: 20px;
        background: none;
    }

    .title {
        margin: 0;
        cursor: pointer;
        color: #bebebe;
        font-size: 22px;
        font-weight: bold;
    }
</style>
