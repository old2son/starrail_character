<script>
    let { header, children, footer } = $props();
</script>

<div class="card">
    <div class="header">
        {@render header?.()}
    </div>
    <div class="tl">
        {@render children?.()}
    </div>
    <div class="cont">
        {@render footer?.()}
    </div>
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
    }

    .header {
        margin-bottom: 20px;
    }

    .tl {
        flex-basis: 100%;
    }

    .cont {
        flex-basis: 100%;
    }
</style>