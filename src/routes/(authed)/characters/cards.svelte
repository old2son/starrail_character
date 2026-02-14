<script>
    let { header, children, footer } = $props();
</script>

<div class="flex justify-center flex-wrap text-center">
    <div class="w-full">
        {@render header?.()}
    </div>
    <div class="w-full">
        {@render children?.()}
    </div>
    <div class="w-full">
        {@render footer?.()}
    </div>
</div>