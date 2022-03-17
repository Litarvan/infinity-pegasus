<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { title } from '../../../app';
    import { getMarks } from '../../pegasus/marks';
    import swapper from '../../ui/swapper';

    import Spinner from '../Spinner.svelte';

    import UpdateArrow from '../../../assets/images/update_arrow.svg';
    import IncreaseArrow from '../../../assets/images/increase_arrow.svg';

    const { state, toggle, outro } = swapper();
    let marks;

    onMount(() => {
        getMarks().then(m => {
            marks = m;
            toggle();
        });
    });

    function format(value)
    {
        if (!value)
        {
            return '--,--';
        }

        return value.toFixed(2).replace('.', ',');
    }

    function getAverage(subject)
    {
        let sum = 0;
        subject.marks.forEach(m => sum += m.value || 0);

        return sum / subject.marks.map(m => m.value).filter(v => v !== null && v !== undefined).length;
    }

    function getClassAverage(subject)
    {
        let sum = 0;
        subject.marks.forEach(m => sum += m.average || 0);

        return sum / subject.marks.map(m => m.average).filter(v => v !== null && v !== undefined).length;
    }
</script>

<svelte:head>
    <title>{title('Accueil')}</title>
</svelte:head>

<div id="main">
    {#if $state === 'A'}
        <div class="loading" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
            <Spinner />
            <div class="subtitle">Chargement des notes...</div>
        </div>
    {/if}
    {#if $state === 'B'}
        <div class="content" transition:fade={{ duration: 150, easing: quadIn }}>
            <div class="header">
                Dernières mises à jour
                <hr />
            </div>

            <div class="updates">
                <div class="update">
                    <div class="point"></div>
                    <div class="id">FOLO</div>
                    <div class="name">Formalisation logique CC2 ·&nbsp;<span class="target">Moyenne</span></div>
                    <div class="mark">
                        <div class="from">7,39</div>
                        <img class="update-arrow" src={UpdateArrow} alt="To" />
                        <div class="to">9,99</div>
                        <img class="increase-arrow" src={IncreaseArrow} alt="Increase" />
                    </div>
                </div>
            </div>

            {#each marks as module}
                <div class="header">
                    {module.name}
                    <hr />
                </div>

                {#each module.subjects as subject}
                    <div class="subject card">
                        <div class="info">
                            <div class="id">{subject.id}</div>
                            <div class="name">{subject.name}</div>
                            <div class="average"><span class="value" class:good={getAverage(subject) >= 10} class:bad={getAverage(subject) < 10}>{format(getAverage(subject))}</span>&nbsp;/ 20</div>
                            <div class="class-average">(moyenne: {format(getClassAverage(subject))})</div>
                        </div>

                        {#if subject.marks.length === 0}
                            <div class="no-marks">Aucune note</div>
                        {:else}
                            <div class="marks">
                                {#each subject.marks as mark}
                                    <div class="mark">
                                        <div class="point"></div>
                                        <div class="name">{mark.name}</div>&nbsp;:&nbsp;
                                        <div class="value"><span class="itself" class:good={mark.value >= 10} class:bad={mark.value < 10}>{format(mark.value)}</span>&nbsp;/ 20</div>
                                        <div class="average">(moyenne: {format(mark.average)})</div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    #main {
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        width: 100%;

        overflow-y: auto;
    }

    .loading {
        flex-direction: column;
        align-items: center;

        .subtitle {
            margin-top: 50px;

            font-size: 21px;
            font-style: italic;
        }
    }

    .content {
        flex-direction: column;
        flex-grow: 1;
        align-items: flex-start;

        padding: 5px 75px;
        margin-bottom: 25px;

        overflow-y: auto;
    }

    .header {
        flex-direction: column;

        font-weight: bold;
        font-size: 32px;

        hr {
            width: 100%;
            border-bottom: 0;
            border-color: white;
        }
    }

    .updates {
        flex-direction: column;
        width: 100%;

        .update {
            align-items: center;

            margin-bottom: 35px;
            padding-left: 40px;

            font-size: 28px;

            .point {
                width: 10px;
                height: 10px;

                background-color: #D5D9DC;

                border-radius: 50%;
            }

            .id {
                font-weight: bold;
                margin: 0 15px;
            }

            .name {
                font-size: 18px;

                .target {
                    font-weight: 500;
                }

                margin-right: 20px;
            }

            .mark {
                align-items: center;
                font-weight: 500;

                .from {
                    color: #A5A9B5;

                    text-decoration: line-through;
                }

                .update-arrow {
                    margin: 0 10px;
                }

                .increase-arrow {
                    margin-left: 5px;
                }
            }
        }
    }

    .subject {
        width: 100%;
        margin-bottom: 25px;

        .info {
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;

            width: 250px;

            padding-top: 15px;
            padding-bottom: 17px;

            .id {
                font-weight: bold;
                font-size: 32px;
            }

            .name {
                font-size: 14px;

                padding: 0 10px;

                text-align: center;
            }

            .average {
                margin-top: 10px;

                font-size: 32px;

                .value {
                    font-weight: bold;

                    &.good {
                        color: #44B728;
                    }

                    &.bad {
                        color: #E30E0E;
                    }
                }
            }

            .class-average {
                font-size: 14px;
                color: #909090;
            }
        }

        .marks {
            flex-direction: column;

            padding: 15px 0;

            .mark {
                align-items: center;

                margin: 3px 0;

                .point {
                    width: 7px;
                    height: 7px;

                    background-color: #D5D9DC;

                    border-radius: 50%;
                }

                .name {
                    margin-left: 15px;
                }

                .value {
                    font-weight: bold;
                    justify-content: flex-end;
                    width: 80px;

                    .good {
                        color: #44B728;
                    }

                    .bad {
                        color: #E30E0E;
                    }
                }

                .average {
                    color: #909090;
                    font-style: italic;

                    margin-left: 10px;
                }
            }
        }
    }

    .no-marks {
        width: 100%;
        flex-grow: 1;

        justify-content: center;
        align-items: center;

        font-size: 28px;
    }
</style>
