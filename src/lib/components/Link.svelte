<script>
    export let to = '/';
    $: params = to.startsWith('http') ? { rel: 'external', target: '_blank' } : {};
</script>

<a class="link" href={to} {...params}>
    <slot />
</a>