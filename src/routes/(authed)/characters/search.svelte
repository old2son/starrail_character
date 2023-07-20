<script>
    export let data;
</script>

{#each data as item}
    <slot {item}/>
{/each}

<style></style>