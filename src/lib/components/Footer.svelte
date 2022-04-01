<script>
    import { app } from '/app';

    import Link from './Link.svelte';

    const links = [
        { label: 'Coefficients', to: `${app.repository}/tree/master/src/lib/pegasus/coefficients` },
        { label: 'Sources (GitHub)', to: app.repository }
    ];
</script>

<div id="footer">
    <div id="links">
        {#each links as { label, to }, index (label) }
            {#if index}&nbsp;·&nbsp;{/if}
            <Link {to}>{label}</Link>
        {/each}
    </div>
    <p class="subtext">
        Copyright © 2021-2022 Adrien ‘Litarvan’ Navratil<br />
        Sous <Link to="{app.repository}/blob/master/LICENSE">license MIT</Link>
    </p>
</div>

<style lang="scss">
    @import 'vars';

    #footer {
        flex-direction: column;
        flex-shrink: 0;

        #links {
            justify-content: center;

            margin-bottom: 8px;

            font-weight: 500;
            font-size: 22px;

            color: $color-link;
        }
    }
</style>
