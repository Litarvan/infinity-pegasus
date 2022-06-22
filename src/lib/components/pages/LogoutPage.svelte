<script>
    import { _ } from 'svelte-i18n';

    import { title } from '/app';
    import { justLoggedOut } from '/lib/stores';

    function goToLogin()
    {
        justLoggedOut.set(false);
    }
</script>

<svelte:head>
    <title>{title($_('logout.title'))}</title>
</svelte:head>

<div id="logout">
    <span id="message">{$_('logout.text')}</span>
    <a id="login" on:click={goToLogin}>{$_('logout.login')}</a>
</div>

<style lang="scss">
    @import 'vars';

    #logout {
        align-items: center;
        flex-direction: column;
    }

    #message {
        font-size: 24px;
        color: $color-error;
    }

    #login {
        font-size: 18px;
        font-weight: 500;

        margin-top: 10px;
        margin-bottom: 25px;
    }

    @media (max-width: 425px) {
        #message {
            font-size: 18px;
        }

        #login {
            font-size: 16px;
        }
    }
</style>
