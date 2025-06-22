<script>
    export let title = '标题';
    export let back = true; // 是否显示返回按钮

    const goBack = () => {
        if (history.length > 1) {
            history.back();
        } else {
            // 如果没有上一页，可设定默认跳转路径
            location.href = '/';
        }
    };
</script>

<header class="header">
    {#if back}
        <button class="back-button" on:click={goBack}>←</button>
    {/if}
    <h1 class="title">{title}</h1>
</header>

<style>
    .header {
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        z-index: 10;
        padding: 0 16px;
        border-bottom: 1px solid #eee;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        font-size: 14px;
        background-color: #fff;
    }

    .back-button {
        margin-right: 16px;
        border: none;
        cursor: pointer;
        font-size: 20px;
        background: none;
    }

    .title {
        margin: 0;
        font-size: 22px;
        font-weight: bold;
    }
</style>
