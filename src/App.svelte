<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';

    import LoginPage from './lib/components/pages/LoginPage.svelte';
    import LogoutPage from './lib/components/pages/LogoutPage.svelte';
    import MainPage from './lib/components/pages/MainPage.svelte';

    import { getLogoutURL, getName, isLogged } from './lib/pegasus/auth';
    import { justLoggedOut } from './lib/stores';

    import Background from './lib/components/Background.svelte';
    import Footer from './lib/components/Footer.svelte';

    import Logo from './assets/images/logo.svg?raw';
    import UpArrow from './assets/images/up_arrow.svg?raw';

    import './app.scss';

    const name = getName();
    let modal = false;

    onMount(() => {
        if (localStorage.seenHelpDisable) {
            return;
        }

        setTimeout(() => {
            modal = true;
            setTimeout(() => localStorage.seenHelpDisable = true);
        }, 750);
    });

    function onLogout()
    {
        localStorage.loggedOut = 'true';
    }
</script>

<Background />

{#if modal}
    <div id="modal" transition:fade={{ duration: 200, easing: quadInOut }}>
        <div class="arrow">
            {@html UpArrow}
        </div>
        <div class="bubble card">
            <div class="title">Retourner sur Pegasus ?</div>
            <div class="text">
                Pour désactiver Infinity Pegasus et retourner sur le Pegasus original, cliquez simplement sur le bouton de l'extension.
                Cliquez à nouveau pour la ré-activer.
            </div>
            <button class="ok" on:click={() => modal = false}>Compris.</button>
        </div>
    </div>
{/if}

<div id="content" class="variable" class:wide={name}>
    <div id="header">
        <div id="logo" class="variable">
            {@html Logo}
        </div>

        {#if name}
            <a id="logout" on:click={onLogout} href={getLogoutURL()} in:fade={{ delay: 200 }} out:fade={{ duration: 175 }}>
                Se déconnecter
            </a>
        {/if}
    </div>

    {#if isLogged()}
        <MainPage />
    {:else if $justLoggedOut}
        <LogoutPage />
    {:else}
        <LoginPage />
    {/if}

    <Footer />
</div>

<style lang="scss">
    @import 'vars';

    #modal {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 3;

        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, 0.5);

        .arrow {
            position: absolute;
            top: 7px;
            right: 49px;

            height: 40px;
        }

        .bubble {
            position: absolute;
            top: 50px;
            right: 50px;

            flex-direction: column;

            width: 350px;

            padding: 15px 17px;

            background-color: white;

            .title {
                margin-bottom: 10px;

                font-weight: 500;
                font-size: 21px;
            }

            .text {
                font-size: 15px;
            }

            .ok {
                margin-top: 20px;
                padding: 8px 0;

                background-color: $color-primary;
                color: white;

                border-radius: 3px;
            }
        }
    }

    #content {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        z-index: 2;

        width: 575px;
        padding: 35px 0;

        overflow-y: auto;

        background-color: $color-background;

        &.wide {
            width: 1200px;

            #header #logo {
                width: 300px;
                margin-top: 0;
                margin-left: 0;
            }
        }
    }

    #header {
        width: 100%;
        padding: 20px 75px;

        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        overflow: hidden;

        #logo {
            flex-shrink: 0;

            width: 400px;
            margin-top: 25px;
            margin-left: 12.5px; // Same as `justify-content: center` but with nice transition
        }

        #logout {
            color: #251515;

            font-size: 22px;
            font-weight: 500;
        }
    }
</style>
