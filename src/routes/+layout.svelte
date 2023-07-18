<script>
    import './styles.css';
    import { title } from '@src/stores.js';
</script>

<svelte:head>
    <title>{$title}</title>
    <meta name="description" content={$title} />
</svelte:head>

<slot />