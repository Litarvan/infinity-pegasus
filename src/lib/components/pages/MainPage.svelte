<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { title } from '/app';
    import { progress } from '/lib/stores';
    import { getMarks, getMarksFilters } from '/lib/pegasus/marks';
    import { getUpdates } from '/lib/pegasus/updates';
    import { computeAverages } from '/lib/pegasus/coefficients';
    import { downloadDocument, MARKS_DOCUMENT, REPORT_DOCUMENT, YEAR_FILTER, SEMESTER_FILTER } from '/lib/pegasus/documents';
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
        MARKS_DOCUMENT,
        REPORT_DOCUMENT
    ];

    let marks;
    let averages;
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
            ...Object.fromEntries(filters.map(f => [f.id, (f.id === SEMESTER_FILTER ? (f.values.find(v => v.name.includes('STAGE')) || f.values.at(-2)) : f.values.at(-1)).value])), // TODO: ...
            ...JSON.parse(localStorage.filters || '{}')
        };

        await updateMarks();
    }

    async function updateMarks()
    {
        marks = await getMarks(filtersValues);
        updates = await getUpdates(filtersValues, marks);

        averages = computeAverages(filtersValues, marks);

        console.log(marks);

        toggle();
    }

    function updateFilter(id, value)
    {
        filtersValues[id] = value;
        if (id === YEAR_FILTER) {
            filtersValues[SEMESTER_FILTER] = null;
            return;
        }

        localStorage.filters = JSON.stringify(filtersValues);

        toggle();

        updateMarks().catch(e => {
            console.error('[MainPage.svelte] Error while updating marks');
            console.error(e);
        });
    }

    function format(value)
    {
        if (value !== 0 && !value) {
            return '--,--';
        }

        return value.toFixed(2).replace('.', ',');
    }

    function color(value)
    {
        if (value === null) {
            return 'auto';
        }

        const yellow = [255, 206, 40];
        const min = value >= 10 ? yellow : [227, 14, 14];
        const max = value < 10 ? yellow : [68, 183, 50];

        if (value >= 10) {
            value -= 10;
        }

        let result = '#';
        for (let i = 0; i < 3; i++) {
            result += Math.round(min[i] + (max[i] - min[i]) * (value / 10)).toString(16).padStart(2, '0');
        }

        return result;
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

    function hasEqualCoefficients(subject)
    {
        return subject.marks.every(m => m.coefficient === subject.marks[0].coefficient);
    }
</script>

<svelte:head>
    <title>{title('Accueil')}</title>
</svelte:head>

<div id="main">
    {#if $state === 'A'}
        <div class="loading" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
            <Spinner />
            <div class="subtitle">{$progress}...</div>
        </div>
    {/if}
    {#if $state === 'B'}
        <div class="content" transition:fade={{ duration: 150, easing: quadIn }} on:outroend={outro}>
            <div class="filters">
                {#each filters as { name, id, values }}
                    <!-- Sucks a bit, but well... -->
                    {@const choices = values.filter(v => id !== SEMESTER_FILTER || v.year === filtersValues[YEAR_FILTER])}
                    <ComboBox {name} values={choices} value={filtersValues[id]} on:update={e => updateFilter(id, e.detail.value)} />
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
                        <div class="point big"></div>
                        <div class="id">{subject}</div>
                        <div class="name">{name} ·&nbsp;<span class="target">{#if type.includes('average')}Moyenne de promo{:else}Note{/if}</span></div>
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
                Moyennes
                <hr />
            </div>
            <div class="big-list">
                {#each Object.entries(averages) as [name, average], i}
                    <div class="entry">
                        <div class="point"></div>
                        <div class="name">{name}</div>
                        <div class="point small"></div>
                        <div class="mark"><span class="value" style:color={i === 0 ? color(average) : 'auto'}>{format(average)}</span>&nbsp;/ 20</div>
                    </div>
                {/each}
            </div>

            <div class="header">
                Documents
                <hr />
            </div>
            <div class="big-list" class:downloading>
                {#each documents as doc}
                    <div class="entry" class:clickable={!downloading} on:click={() => download(doc)}>
                        <div class="point"></div>
                        <div class="name">{doc}</div>
                        <img class="arrow" src={ExternalArrow} alt={doc} />
                    </div>
                {/each}
            </div>

            <hr class="separator" />

            {#each marks as module}
                <div class="header module">
                    <div class="text">
                        <div class="name">{module.name}</div>
                        <div class="point"></div>
                        <span class="average" style:color={color(module.average)}>{format(module.average)}</span>
                        <span class="max">&nbsp;/ 20</span>
                        <span class="class-average">(promo: {format(module.classAverage)})</span>
                    </div>
                    <hr />
                </div>

                {#each module.subjects as subject}
                    <div class="subject card">
                        <div class="info">
                            <div class="id">{subject.id}</div>
                            <div class="name">{subject.name}</div>
                            <div class="average"><span class="value" style:color={color(subject.average)}>{format(subject.average)}</span>&nbsp;/ 20</div>
                            <div class="class-average">(promo: {format(subject.classAverage)}{#if subject.coefficient !== 1}, coeff. {format(subject.coefficient)}{/if})</div>
                        </div>

                        {#if subject.marks.length === 0}
                            <div class="no-marks">Aucune note</div>
                        {:else}
                            <div class="marks">
                                {#each subject.marks as mark}
                                    <div class="mark">
                                        <div class="point"></div>
                                        <div class="name">{mark.name}</div>&nbsp;:&nbsp;
                                        <div class="value"><span class="itself" style:color={color(mark.value)}>{format(mark.value)}</span>&nbsp;/ 20</div>
                                        <div class="class-average">(promo: {format(mark.classAverage)}{#if !hasEqualCoefficients(subject)}, compte pour {Math.round(mark.coefficient * 100)}%{/if})</div>
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

    .big-list {
        flex-direction: column;

        margin-bottom: 20px;
        padding-top: 5px;

        transition: opacity .15s;

        &.downloading {
            opacity: .5;
        }

        .entry {
            align-items: center;

            margin-bottom: 12px;
            padding-left: 35px;

            font-size: 21px;

            &.clickable {
                user-select: none;
            }

            .name {
                margin-left: 12px;
                margin-right: 10px;
            }

            .arrow {
                height: 20px;

                margin-bottom: 1px;
            }

            .mark {
                .value {
                    font-weight: bold;
                }

                margin-left: 10px;
            }
        }
    }

    .separator {
        width: 100%;

        margin-top: 25px;

        opacity: .3;

        border-bottom: 0;
        border-color: #FFFFFF;
    }

    .class-average {
        color: #909090;
    }

    .module {
        margin-top: 50px;

        &, &.text {
            max-width: 100%;
        }

        .text {
            align-items: center;
        }

        .name, .average, .class-average, .max {
            white-space: nowrap;
        }

        .name {
            display: inline-block;

            overflow: hidden;
            text-overflow: ellipsis;
        }

        .point {
            flex-shrink: 0;

            margin: 2px 10px 0;
        }

        .class-average {
            margin-left: 10px;

            font-weight: normal;
        }
    }

    .subject {
        $info-size: 250px;

        width: 100%;

        margin: 15px 0;

        .info {
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;

            width: $info-size;

            padding-top: 15px;
            padding-bottom: 17px;

            .id {
                font-weight: bold;
                font-size: 32px;
            }

            .name {
                padding: 0 10px;

                font-size: 14px;
                text-align: center;
            }

            .average {
                margin-top: 10px;

                font-size: 32px;

                .value {
                    font-weight: bold;
                }
            }

            .class-average {
                font-size: 14px;
            }
        }

        .marks {
            flex-direction: column;
            flex-grow: 1;

            max-width: calc(100% - #{$info-size} - 25px);

            padding: 15px 0;

            .mark {
                align-items: center;

                max-width: 100%;

                margin: 3px 0;

                .point {
                    margin-bottom: 1px;

                    background-color: #D5D9DC;

                    border-radius: 50%;
                }

                .name, .value, .class-average {
                    white-space: nowrap;
                }

                .name {
                    display: inline-block;

                    margin-left: 15px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .value {
                    font-weight: bold;
                    justify-content: flex-end;
                    width: 80px;
                }

                .class-average {
                    margin-left: 10px;
                }
            }
        }
    }

    .no-marks {
        flex-grow: 1;

        justify-content: center;
        align-items: center;

        width: 100%;

        font-size: 28px;
    }

    @media (max-width: 1200px) {
        // max-width: calc(100% - 400px);
    }
</style>
