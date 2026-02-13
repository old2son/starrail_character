<script>
    let { header, children, footer } = $props();
</script>

<div class="flex justify-center flex-wrap text-center">
    <div class="mb-5">
        {@render header?.()}
    </div>
    <div class="flex-basis-full">
        {@render children?.()}
    </div>
    <div class="flex-basis-full">
        {@render footer?.()}
    </div>
</div>