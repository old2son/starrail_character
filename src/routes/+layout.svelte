<script>
    import { beforeNavigate } from '$app/navigation';
    import './styles.css';
    import { title } from '@src/stores.js';

    let hide = false;

    beforeNavigate(({to}) => {
        // @ts-ignore
        if (to?.route?.id?.match(/^\/\(authed\)\/characters$/)?.length > 0) {
            hide = true;
        }
        else {
            hide = false;
        }
    });
</script>

<svelte:head>
    <title>{$title}</title>
    <meta name="description" content={$title} />
</svelte:head>

<slot />

<footer>
    <a class="btn-back" class:hide href="/">go back</a>
</footer>

<style>
    .hide {
        display: none;
    }

    .btn-back {
        position: fixed;
        left: 50%;
        bottom: 20px;
        width: 50vw;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-radius: 40px;
        transform: translateX(-50%);
        color: #333;
        background-color: #fff;
    }
</style>