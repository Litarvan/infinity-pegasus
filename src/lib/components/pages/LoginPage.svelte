<script>
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

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
            title: 'Disclaimer',
            content: `Infinity Pegasus est une extension navigateur dont l'entièreté du traitement se situe côté client, dans votre navigateur. Aucun serveur n'entre en jeu, si ce n'est pour héberger les ressources du site.

De ce fait, aucune condition particulière n'est nécessaire pour son utilisation.

Cependant, même si j'ai fait de mon mieux pour garantir la fiabilité des données qui sont affichées, il est possible que les notes et moyennes affichées ne soient pas toutes exactes.

Seuls les PDFs (relevé et bulletin de notes) sont à considérer comme 100% fiables.

Les coefficients sont manuellement entrés au fur et à mesure de l'année (sauf ceux des modules), il est donc courant que le calcul des moyennes ne soit pas exact. Pour aider à améliorer leur précision, n'hésitez pas à me notifier des erreurs, et à <a class="link colored" href="${app.repository}/tree/master/src/lib/pegasus/coefficients" target="_blank">participer à l'ajout des coefficients sur le GitHub.</a>`,
            button: 'C\'est noté.',

            width: 500,
            center: true
        });
    }
</script>

<svelte:head>
    <title>{title('Se connecter')}</title>
</svelte:head>

{#if $state === 'A'}
    <div id="login" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
        <a id="login-button" href={PEGASUS_AUTH_URL} on:click|preventDefault={doLogin}>
            <div id="ms-logo">{@html msLogo}</div>
            <span class="text">Se connecter avec Microsoft</span>
        </a>
        <p id="terms" class="subtext">
            En cliquant sur le bouton ci-dessus vous acceptez les <span class="link colored clickable" on:click={() => showConditions()}>conditions d'utilisation</span> du
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
    @use 'sass:math';

    @import 'vars';

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
            padding: 8px 0;

            font-size: 15px;

            #ms-logo {
                width: 20px;
            }
        }
    }

    @media (max-width: 350px) {
        #login #login-button {
            padding: 6px 0;

            font-size: 14px;

            #ms-logo {
                width: 18px;

                margin-right: 10px;
            }
        }
    }
</style>
