<script>
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { _ } from 'svelte-i18n';

    import { app, title } from '/app';
    import { modal } from '/lib/stores';
    import { PEGASUS_AUTH_URL } from '/lib/pegasus';
    import swapper from '/lib/ui/swapper';

    import Spinner from '../Spinner.svelte';

    import msLogo from '/assets/images/ms_logo.svg?raw';

    const { state, toggle, outro } = swapper();

    async function doLogin()
    {
        toggle();

        window.location.href = PEGASUS_AUTH_URL;
    }

    function showConditions()
    {
        modal.set({
            title: $_('login.disclaimer.title'),
            content: $_('login.disclaimer.content.text', { values: {
                link: `<a class="link colored" href="${app.repository}/tree/master/src/lib/pegasus/coefficients" target="_blank">${$_('login.disclaimer.content.link')}</a>`
            }}),
            button: $_('login.disclaimer.button'),

            width: 500,
            center: true
        });
    }
</script>

<svelte:head>
    <title>{title($_('login.title'))}</title>
</svelte:head>

{#if $state === 'A'}
    <div id="login" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
        <a id="login-button" href={PEGASUS_AUTH_URL} on:click|preventDefault={doLogin}>
            <div id="ms-logo">{@html msLogo}</div>
            <span class="text">{$_('login.login_ms')}</span>
        </a>
        <p id="terms" class="subtext">
            {$_('login.terms.prefix')}
            <span class="link colored clickable" on:click={() => showConditions()}>{$_('login.terms.link')}</span>
            {$_('login.terms.suffix')}
        </p>
    </div>
{/if}
{#if $state === 'B'}
    <div id="spinner" transition:fade={{ duration: 150, easing: quadIn }}>
        <Spinner />
    </div>
{/if}

<style lang="scss">
    @use "sass:math";

    @import "vars";

    $login-width: 375px;
    $login-max-width: 0.80;

    #login {
        flex-direction: column;
        width: $login-width;
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

    @media (max-width: #{math.div($login-width, $login-max-width)}) {
        #login {
            max-width: #{$login-max-width * 100%};

            #login-button {
                padding: 12px 0;

                font-size: 19px;

                #ms-logo {
                    width: 28px;
                }
            }
        }

        #terms {
            padding: 0;
        }
    }

    @media (max-width: 420px) {
        #login #login-button {
            display: flex;
            align-items: center;

            padding: 10px 0;

            font-size: 17px;

            #ms-logo {
                width: 24px;

                margin-right: 12px;
            }

            .text {
                margin-bottom: -1px;
            }
        }
    }

    @media (max-width: 375px) {
        #login #login-button {
            padding: 6px 0;

            font-size: 15px;

            #ms-logo {
                width: 18px;
            }
        }
    }

    @media (max-height: 550px) {
        #spinner {
            margin-bottom: 35px;

            :global(.spinner) {
                width: 80px;
            }
        }
    }
</style>
