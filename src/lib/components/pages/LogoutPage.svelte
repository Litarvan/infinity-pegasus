<script>
    import { title } from '../../../app';
    import { justLoggedOut } from '../../stores';

    function goToLogin()
    {
        justLoggedOut.set(false);
    }
</script>

<svelte:head>
    <title>{title('Déconnexion')}</title>
</svelte:head>

<div id="logout">
    <span id="message">Vous êtes maintenant déconnecté</span>
    <a id="login" on:click={goToLogin}>Se connecter</a>
</div>

<style lang="scss">
    @import 'src/styles/vars';

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
</style>
