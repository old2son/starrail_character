<script>
    
</script>

<div class="card">
    <div class="header">
        <slot name="header" />
    </div>
    <div class="tl">
        <slot />
    </div>
    <div class="cont">
        <slot name="footer" />
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