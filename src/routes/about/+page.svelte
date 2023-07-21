<script>
    export let data;
    import { title } from '@src/stores.js';
    title.set('about page'); 
</script>

<div class="page-about">
    <p>健康游戏忠告：</p>
    <p>抵制不良游戏，拒绝盗版游戏。</p>
    <p>注意自我保护，谨防受骗上当。</p>
    <p>适度游戏益脑，沉迷游戏伤身。</p>
    <p>合理安排时间，享受健康生活。</p>
</div>

<div class="list-tutorial">
    <h3  style:--color-theme-2="#333">教程列表</h3>
    <ul>
        {#each data.list as item}
            <li><a href="/about/{item.href}">{item.tl}</a></li>
        {/each}
    </ul>
</div>

<style>

    .list-tutorial {
        margin: 20px;
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;

        & h3 {
            margin: 0 0 8px 0;
            color: var(--color-theme-2);
        }

        & ul {
            padding: 0px;
            margin: 20px 0;
            list-style: none;
            border-radius: 4px;
            background-color: #fff;

            & li {
                margin: 8px 0;
            }
        }
    }
    
    .page-about {
	    --dis: 20px;
        margin: var(--dis);
        padding: var(--dis);
        border-radius: 4px;
        text-align: center;
        background-color: #fff;

        & p {
            color: var(--color-theme-2);
        }
    }
</style>