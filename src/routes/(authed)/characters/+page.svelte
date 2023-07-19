<script>
    /**
    * @param {any} characterActive
    */
    import { title, characterActive } from '@src/stores.js';
    import Cards from './cards.svelte';
    title.set('characters page');

    
</script>

<div class="page-characters">
    {#if $characterActive.hasOwnProperty('cName')}
        <Cards>
            <div slot="header">111</div>
            <div>{$characterActive.cName}</div>
            <div slot="footer">333</div>
        </Cards>
    {:else}
        请选择角色
    {/if}
</div>


<style>
    .page-characters {
        color: #fff;
    }
</style>