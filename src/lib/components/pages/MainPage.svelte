<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { title } from '/app';
    import { getMarks, getMarksFilters } from '/lib/pegasus/marks';
    import { getUpdates } from '/lib/pegasus/updates';
    import { downloadDocument } from '/lib/pegasus/documents';
    import swapper from '/lib/ui/swapper';

    import ComboBox from '../ComboBox.svelte';
    import Spinner from '../Spinner.svelte';

    import UpdateArrow from '/assets/images/update_arrow.svg';
    import IncreaseArrow from '/assets/images/increase_arrow.svg';
    import DecreaseArrow from '/assets/images/decrease_arrow.svg';
    import ExternalArrow from '/assets/images/external_arrow.svg';
    import Plus from '/assets/images/plus.svg';
    import Minus from '/assets/images/minus.svg';

    const { state, toggle, outro } = swapper();
    const documents = [
        'Relevé de notes',
        'Bulletin de notes'
    ];

    let marks;
    let filters;
    let filtersValues;
    let updates;
    let downloading = false;

    onMount(() => load().catch(e => {
        console.error('[MainPage.svelte] Error while loading marks');
        console.error(e);
    }));

    async function load()
    {
        filters = await getMarksFilters();
        filtersValues = {
            ...Object.fromEntries(filters.map(f => [f.id, (f.values.find(v => v.name === '2021' || v.name.includes('STAGE')) || f.values[0]).value])), // TODO ...
            ...JSON.parse(localStorage.filters || '{}')
        };

        await updateMarks();
    }

    async function updateMarks()
    {
        marks = await getMarks(filtersValues);
        updates = await getUpdates(filtersValues, marks);

        toggle();
    }

    function updateFilter(id, value)
    {
        // TODO: Clean filters transfer
        filtersValues[id] = value;
        localStorage.filters = JSON.stringify(filtersValues);

        toggle();

        updateMarks().catch(e => {
            console.error('[MainPage.svelte] Error while updating marks');
            console.error(e);
        });
    }

    function format(value)
    {
        if (!value) {
            return '--,--';
        }

        return value.toFixed(2).replace('.', ',');
    }

    function getSignForUpdate(type, value, old)
    {
        switch (type) {
            case 'average-update':
            case 'update':
                return value > old ? IncreaseArrow : DecreaseArrow;
            case 'add':
                return Plus;
            case 'remove':
                return Minus;
        }
    }

    function download(doc)
    {
        if (downloading) {
            return;
        }

        downloading = true;

        downloadDocument(doc, filtersValues).catch(e => {
            console.error('[MainPage.svelte] Error while downloading document');
            console.error(e);
        }).finally(() => {
            downloading = false;
        });
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
        <div class="content" transition:fade={{ duration: 150, easing: quadIn }} on:outroend={outro}>
            <div class="filters">
                {#each filters as { name, id, values }}
                    <ComboBox {name} {values} value={filtersValues[id]} on:update={e => updateFilter(id, e.detail.value)} />
                {/each}
            </div>

            <div class="header">
                Dernières mises à jour
                <hr />
            </div>

            {#if updates.length === 0}
                <div class="no-updates">Aucune mise à jour détectée depuis la dernière fois.</div>
            {/if}

            <div class="updates">
                {#each updates as { type, subject, name, value, old }}
                    <div class="update">
                        <div class="point"></div>
                        <div class="id">{subject}</div>
                        <div class="name">{name} ·&nbsp;<span class="target">{#if type.includes('average')}Moyenne{:else}Note{/if}</span></div>
                        <div class="mark">
                            <div class="point"></div>
                            {#if value && old}
                                <div class="from">{format(old)}</div>
                                <img class="update-arrow" src={UpdateArrow} alt="To" />
                            {/if}
                            <div class="to">{format(value || old)}</div>
                            <img class="type-sign" src={getSignForUpdate(type, value, old)} alt="Sign" />
                        </div>
                    </div>
                {/each}
            </div>

            <div class="header">
                Documents
                <hr />
            </div>
            <div class="documents" class:downloading>
                {#each documents as doc}
                    <div class="document" class:clickable={!downloading} on:click={() => download(doc)}>
                        <div class="point"></div>
                        <div class="name">{doc}</div>
                        <img class="arrow" src={ExternalArrow} alt={doc} />
                    </div>
                {/each}
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
    @import 'vars';

    #main {
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        width: 100%;
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

        position: relative;
        z-index: -1;

        font-weight: bold;
        font-size: 32px;

        hr {
            width: 100%;
            border-bottom: 0;
            border-color: $color-background;
        }
    }

    .filters {
        justify-content: space-between;

        width: 100%;

        margin-bottom: 50px;
    }

    .no-updates {
        margin-bottom: 20px;

        font-size: 18px;
    }

    .updates {
        flex-direction: column;

        width: 100%;

        margin-bottom: 15px;

        .update {
            align-items: center;

            margin-bottom: 10px;
            padding-left: 35px;

            font-size: 28px;

            .id {
                font-weight: bold;
                margin: 0 15px;
            }

            .name {
                font-size: 18px;
                margin-right: 10px;

                .target {
                    font-weight: 500;
                }
            }

            .mark {
                align-items: center;

                margin-bottom: 1px;

                font-weight: 500;

                .point {
                    width: 6px;
                    height: 6px;

                    margin-left: 2px;
                    margin-right: 12px;
                }

                .from {
                    color: #A5A9B5;

                    text-decoration: line-through;
                }

                .update-arrow {
                    margin: 0 10px;
                }

                .type-sign {
                    width: 30px;

                    margin-left: 12px;
                    margin-bottom: 2px;
                }
            }
        }
    }

    .documents {
        flex-direction: column;

        margin-bottom: 20px;
        padding-top: 5px;

        transition: opacity .15s;

        &.downloading {
            opacity: .5;
        }

        .document {
            align-items: center;

            margin-bottom: 12px;
            padding-left: 35px;

            font-size: 21px;

            .point {
                width: 8px;
                height: 8px;
            }

            .name {
                margin-left: 12px;
            }

            .arrow {
                height: 20px;

                margin-left: 10px;
                margin-bottom: 1px;
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
