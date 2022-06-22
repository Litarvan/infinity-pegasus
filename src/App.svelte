<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';

    import { _ } from 'svelte-i18n';

    import LoginPage from './lib/components/pages/LoginPage.svelte';
    import LogoutPage from './lib/components/pages/LogoutPage.svelte';
    import MainPage from './lib/components/pages/MainPage.svelte';

    import { getLogoutURL, getName, isLogged } from './lib/pegasus/auth';
    import { justLoggedOut, modal } from './lib/stores';

    import Background from './lib/components/Background.svelte';
    import Footer from './lib/components/Footer.svelte';

    import Logo from './assets/images/logo.svg?raw';
    import UpArrow from './assets/images/up_arrow.svg?raw';

    import './app.scss';

    const name = getName();
    let bubbleElement;

    onMount(() => {
        if (!localStorage.seenHelpDisable) {
            setTimeout(() => {
                modal.set({
                    title: $_('app.back.title'),
                    content: $_('app.back.content'),
                    button: $_('app.back.button'),

                    top: 50,
                    right: navigator.userAgent.includes('afari') ? 88 : (window.chrome ? 107 : 49),
                    width: 350,

                    arrow: true
                });

                setTimeout(() => localStorage.seenHelpDisable = true);
            }, 750);
        }

        window.addEventListener('resize', onResize);
        onResize();

        return () => window.removeEventListener('resize', onResize);
    });

    function onResize()
    {
        const [body, app] = [...document.querySelectorAll('body, #app'),].map(e => e.style);
        body.height = app.height = `${window.innerHeight}px`;
    }

    function onModalClick(event)
    {
        if (!bubbleElement.contains(event.target)) {
            modal.set(null);
        }
    }

    function onLogout()
    {
        localStorage.loggedOut = 'true';
    }
</script>

<Background />

{#if $modal}
    <div id="modal" transition:fade={{ duration: 200, easing: quadInOut }} class:center={$modal.center} on:click={onModalClick}>
        {#if $modal.arrow}
            <div class="arrow" style:right={$modal.right + 'px'}>
                {@html UpArrow}
            </div>
        {/if}
        <div class="bubble card" style:top={$modal.top + 'px'} style:right={$modal.right + 'px'} style:width={$modal.width + 'px'} bind:this={bubbleElement}>
            <div class="title">{$modal.title}</div>
            <div class="text">
                {@html $modal.content}
            </div>
            <button class="ok" on:click={() => modal.set(null)}>{$modal.button}</button>
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
                {$_('app.logout')}
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

    $content-default-size: 575px;

    #content {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        z-index: 2;

        width: $content-default-size;
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

    #modal {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 3;

        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, 0.5);

        &.center {
            justify-content: center;
            align-items: center;
        }

        &:not(.center) .bubble {
            position: absolute;
        }

        .arrow {
            position: absolute;
            top: 7px;
            right: 49px;

            height: 40px;
        }

        .bubble {
            flex-direction: column;

            padding: 15px 17px;

            background-color: white;

            .title {
                margin-bottom: 10px;

                font-weight: 500;
                font-size: 21px;
            }

            .text {
                display: block;

                font-size: 15px;
                white-space: pre-wrap;
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

    @media (max-width: $content-default-size) {
        #header {
            padding: 0;
            justify-content: center;

            #logo {
                margin-top: 15px;
                margin-left: 0;

                max-width: 80%;
            }
        }

        #modal {
            justify-content: center;
            align-items: center;

            .arrow {
                display: none;
            }

            .bubble {
                position: initial !important;
                margin: 25px;

                .text {
                    font-size: 14px;
                }
            }
        }
    }

    @media (max-width: 425px) {
        #modal .bubble {
            .title {
                font-size: 20px;
            }

            .text {
                font-size: 13px;
            }
        }
    }

    @media (max-width: 375px) {
        #modal .bubble {
            margin: 18px;

            .title {
                font-size: 16px;
            }

            .text {
                font-size: 11px;
            }

            .ok {
                margin-top: 15px;
                padding: 6px 0;

                font-size: 14px;
            }
        }
    }

    @media (max-height: 650px) {
        #header #logo {
            margin-top: 0;
        }
    }

    @media (max-height: 550px) {
        #content {
            padding: 15px 0;
        }
    }
</style>
