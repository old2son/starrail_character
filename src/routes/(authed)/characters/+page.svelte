<script>
    import { assets } from '$app/paths';
    import { title, characterActive } from '@src/stores.js';
    import { setSource } from './dataSource.js';
    import Cards from './cards.svelte';
    import Search from './search.svelte';
    title.set('characters page');

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

    let item = setSource[0];
</script>

<div class="page-characters">
    {#if Object.keys($characterActive).length}
        <Cards>
            <div slot="header" class="avatar-wrap"><img src="{assets}/src/lib/images/{character.name}.jpg" alt="{character.cName}"></div>
            <div>{character.cName}</div>
            <div slot="footer">{@html character.cont}</div>
        </Cards>
    {:else}
        请选择角色
    {/if}

    <Search data={setSource}>
        <ol>
            <li><a href="{item.source}">{item.name}</a></li>
        </ol>
    </Search>
</div>

<style>
    ol {
        flex-basis: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ol li a {
        color: #fff;
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
