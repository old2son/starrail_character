<script>
    import { title, desc, characterActive } from '@src/stores.js';
    import { setSource } from './dataSource.js';
    import Cards from './cards.svelte';
    import Search from './search.svelte';
    title.set('角色列表');
    desc.set('角色列表描述');

    /**
     * @typedef {Object} Character
     * @property {string} name - Character full name.
     * @property {string} cName - Character name.
     * @property {number} id - Character ID.
     * @property {string} cont - Character full name.
     */

    /**
     * @type {Character}
     */
    let character = {
        name: 'Character Name',
        cName: 'Full Character Name',
        id: 0,
        cont: '<p>请选择角色</p>'
    };

    $: character = Object.assign(character, $characterActive);
</script>

<div class="page-characters">
    {#if Object.keys($characterActive).length}
        <Cards>
            <!-- static 的图片直接直接根目录路径 -->
            <div slot="header" class="avatar-wrap"><img src="/images/{character.name}.jpg" alt="{character.cName}"></div>
            <div>{character.cName}</div>
            <div slot="footer">{@html character.cont}</div>
        </Cards>
    {:else}
        请选择角色
    {/if}
</div>

<ol>
    <Search data={setSource} let:item={prop}>
        <li><a href="{prop.source}">{prop.name}</a></li>
    </Search>
</ol>

<style>
    ol {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 30px;
        padding: 20px;
        margin: 0;
        list-style: none;
        border-radius: 8px 8px 0 0;
        background-color: #fff;
    }

    ol li {
        line-height: 36px;
    }

    ol li a {
        color: var(--color-theme-1);
    }

    .page-characters {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        color: #fff;
    }

    .avatar-wrap {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 2px;
    }

    .avatar-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
