<script>
    import { _ } from 'svelte-i18n';

    import { app } from '/app';

    import Link from './Link.svelte';

    const links = [
        { label: $_('footer.links.coefficients'), to: `${app.repository}/tree/master/src/lib/pegasus/coefficients` },
        { label: $_('footer.links.sources'), to: app.repository }
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
        {$_('footer.copyright.text')}<br/>
        {$_('footer.copyright.license.prefix')}
        <Link to="{app.repository}/blob/master/LICENSE">{$_('footer.copyright.license.link')}</Link>
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

    @media (max-width: 425px) {
        #footer #links {
            font-size: 18px;
        }
    }

    @media (max-width: 350px) {
        #footer #links {
            font-size: 16px;
        }
    }
</style>
