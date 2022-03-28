<script>
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { title } from '/app';
    import { PEGASUS_AUTH_URL } from '/lib/pegasus/index.js';

    import swapper from '/lib/ui/swapper';

    import Spinner from '../Spinner.svelte';

    import msLogo from '/assets/images/ms_logo.svg?raw';

    const { state, toggle, outro } = swapper();

    async function doLogin()
    {
        toggle();

        window.location.href = PEGASUS_AUTH_URL;
    }
</script>

<svelte:head>
    <title>{title('Se connecter')}</title>
</svelte:head>

{#if $state === 'A'}
    <div id="login" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
        <a id="login-button" href={PEGASUS_AUTH_URL} on:click|preventDefault={doLogin}>
            <div id="ms-logo">{@html msLogo}</div>
            <span>Se connecter avec Microsoft</span>
        </a>
        <p id="terms" class="subtext">
            En cliquant sur le bouton ci-dessus vous acceptez les <a class="link" href="#">conditions d'utilisation</a> du
            service
        </p>
    </div>
{/if}
{#if $state === 'B'}
    <div id="spinner" transition:fade={{ duration: 150, easing: quadIn }}>
        <Spinner />
    </div>
{/if}

<style lang="scss">
    @import 'vars';

    #login {
        flex-direction: column;
        width: 375px;
    }

    #login-button {
        display: flex;
        justify-content: center;

        padding: 16px 0;

        border-radius: 5px;

        color: white;
        background: $gradient-login-button;

        font-family: $font-circular;
        font-size: 21px;
        font-weight: 500;

        $content-height: 32px;

        line-height: $content-height;

        #ms-logo {
            height: $content-height;
            margin-right: 16px;
        }
    }

    #terms {
        margin-top: 15px;
        padding: 0 25px;

        text-align: center;
    }

    #spinner {
        margin-bottom: 20px;
    }
</style>
