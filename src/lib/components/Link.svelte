<script>
    export let to = '#';
    export let exec = () => {};

    $: params = to.startsWith('http') ? { rel: 'external', target: '_blank' } : {};
</script>

<a class="link" href={to} {...params} on:click={exec}>
    <slot />
</a>