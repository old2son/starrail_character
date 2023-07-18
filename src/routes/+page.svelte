<script>
    export let data;
    import Nav from '@src/routes/nav.svelte';
    import { title } from '@src/stores.js';
    title.set('home page'); 
    const logged = typeof data.logged === 'boolean' ? data.logged : false;
</script>

<Nav {logged}/>
