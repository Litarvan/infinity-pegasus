<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import { _ } from 'svelte-i18n';

    import { app, title } from '/app';
    import { modal, progress } from '/lib/stores';
    import { getMarks, getMarksFilters } from '/lib/pegasus/marks';
    import { getUpdates } from '/lib/pegasus/updates';
    import { downloadDocument, MARKS_DOCUMENT, REPORT_DOCUMENT, YEAR_FILTER, SEMESTER_FILTER } from '/lib/pegasus/documents';
    import swapper from '/lib/ui/swapper';

    import ComboBox from '../ComboBox.svelte';
    import Spinner from '../Spinner.svelte';

    import UpdateArrow from '/assets/images/update_arrow.svg?raw';
    import IncreaseArrow from '/assets/images/increase_arrow.svg?raw';
    import DecreaseArrow from '/assets/images/decrease_arrow.svg?raw';
    import ExternalArrow from '/assets/images/external_arrow.svg?raw';
    import Plus from '/assets/images/plus.svg?raw';
    import Minus from '/assets/images/minus.svg?raw';

    const { state, toggle, outro } = swapper();

    let marks;
    let averages;
    let documents;
    let filters;
    let filtersValues;
    let updates;
    let downloading = false;

    onMount(() => load().catch(handleError));

    function handleError(e)
    {
        console.error('[MainPage.svelte] Error while loading marks');
        console.error(e);

        modal.set({
            title: $_('app.error.title'),
            content: $_('app.error.content.text', { values: {
                error: e.message,
                link: `<a class="link colored" href="${app.repository}/issues" target="_blank">${$_('app.error.content.link')}</a>`
            }}),
            button: $_('app.error.button'),

            width: 500,
            center: true
        });
    }

    async function load()
    {
        filters = await getMarksFilters();
        filtersValues = {
            ...Object.fromEntries(filters.map(f => [f.id, ((f.id === SEMESTER_FILTER ? (f.values.find(v => v.name.includes('STAGE')) || f.values.at(-2)) : f.values.at(-1)) || f.values[0]).value])), // TODO: ...
            ...JSON.parse(localStorage.filters || '{}')
        };

        await updateMarks();
    }

    async function updateMarks()
    {
        const result = await getMarks(filtersValues);
        marks = result.marks;
        averages = {
            student: result.average,
            promo: result.classAverage
        };

        updates = await getUpdates(filtersValues, marks);
        documents = [
            MARKS_DOCUMENT,
            ...(result.fromReport ? [REPORT_DOCUMENT] : [])
        ];

        if (marks.every(m => m.subjects.every(s => s.marks.every(m => m.value === undefined))) && !marks.every(m => m.subjects.every(s => s.marks.length === 0))) {
            setTimeout(() => modal.set({
                title: $_('app.noMarks.title'),
                content: $_('app.noMarks.content.text'),
                button: $_('app.noMarks.ok'),

                width: 400,

                center: true
            }), 250);
        }

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

        updateMarks().catch(handleError);
    }

    function format(value)
    {
        if (value === 0.01) {
            return 'Abs.';
        }

        if (value !== 0 && !value) {
            return `--${$_('app.separator')}--`;
        }

        return value.toFixed(2).replace('.', $_('app.separator'));
    }

    function color(value)
    {
        if (value === 0.01) {
            return '#666670';
        }

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
    <title>{title($_('main.title'))}</title>
</svelte:head>

<div id="main">
    {#if $state === 'A'}
        <div class="loading" transition:fade={{ duration: 150, easing: quadOut }} on:outroend={outro}>
            <Spinner />
            <div class="subtitle">{$_(`main.progress.${$progress}`)}...</div>
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
                {$_('main.updates.title')}
                <hr />
            </div>

            {#if updates.filter(u => u.type !== 'average-update').length === 0}
                <div class="no-updates">{$_('main.updates.empty')}</div>
            {/if}

            <div class="updates">
                {#each updates as { type, subject, name, value, old }}
                    <!-- Parce qu'en vrai on s'en branle un peu -->
                    {#if type !== 'average-update'}
                        <div class="update">
                            <div class="point big"></div>
                            <div class="top">
                                <div class="id">{subject}</div>
                                <div class="dash">-</div>
                                <div class="name">{name} &nbsp;<span class="target">·&nbsp; {$_(`main.updates.${type.includes('average') ? 'average' : 'mark'}`)}</span></div>
                            </div>
                            <div class="mark">
                                <div class="point"></div>
                                {#if (value === 0 || value) && (old === 0 || old)}
                                    <div class="from">{format(old)}</div>
                                    <div class="update-arrow">{@html UpdateArrow}</div>
                                {/if}
                                <div class="to"><span class="value" style:color={color(value === 0 || value ? value : old)}>{format(value === 0 || value ? value : old)}</span>&nbsp;/ 20</div>
                                <div class="type-sign">{@html getSignForUpdate(type, value, old)}</div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>

            <div class="header">
                {$_('main.averages.title')}
                <hr />
            </div>
            <div class="big-list">
                {#each Object.entries(averages) as [name, average], i}
                    <div class="entry">
                        <div class="point"></div>
                        <div class="name">{$_(`main.averages.${name}`)}</div>
                        <div class="point small"></div>
                        <div class="mark"><span class="value" style:color={i === 0 ? color(average) : 'auto'}>{format(average)}</span>&nbsp;/ 20</div>
                    </div>
                {/each}
            </div>

            <div class="header">
                {$_('main.documents.title')}
                <hr />
            </div>
            <div class="big-list" class:downloading>
                {#each documents as doc}
                    <div class="entry" class:clickable={!downloading} on:click={() => download(doc)}>
                        <div class="point"></div>
                        <div class="name">{doc}</div>
                        <div class="arrow">{@html ExternalArrow}</div>
                    </div>
                {/each}
            </div>

            <hr class="separator" />

            {#each marks as module}
                <div class="header module">
                    <div class="text">
                        <div class="name">{module.name || module.id}</div>
                        <div class="point"></div>
                        <div class="bottom">
                            <span class="average" style:color={color(module.average)}>{format(module.average)}</span>
                            <span class="max">&nbsp;/ 20</span>
                            <span class="class-average">({$_('main.promo')}: {format(module.classAverage)})</span>
                        </div>
                    </div>
                    <hr class="bottom-line" />
                </div>

                {#each module.subjects as subject}
                    <div class="subject card">
                        <div class="info">
                            <div class="top">
                                <div class="id">{subject.id}</div>
                                <div class="point"></div>
                                <div class="name">{subject.name}</div>
                            </div>
                            <div class="bottom">
                                <div class="average"><span class="value" style:color={color(subject.average)}>{format(subject.average)}</span>&nbsp;/ 20</div>
                                <div class="class-average">({$_('main.promo')}: {format(subject.classAverage)}{#if subject.coefficient !== 1}, {$_('main.coefficient')} {format(subject.coefficient)}{/if})</div>
                            </div>

                            <hr class="bottom-line" />
                        </div>

                        {#if subject.marks.length === 0}
                            <div class="no-marks">{$_('main.empty')}</div>
                        {:else}
                            <div class="marks">
                                {#each subject.marks as mark}
                                    <div class="mark">
                                        <div class="point"></div>
                                        <div class="line">
                                            <div class="name">{mark.name}</div>&nbsp;:&nbsp;
                                            <div class="value"><span class="itself" style:color={color(mark.value)}>{format(mark.value)}</span>&nbsp;/ 20</div>
                                        </div>
                                        <div class="class-average">
                                            <span class="parenthesis">(</span>{$_('main.average')}: {format(mark.classAverage)}{#if !hasEqualCoefficients(subject)}, {$_('main.percentage')} {Math.round(mark.coefficient * 100)}%{/if}<span class="parenthesis">)</span>
                                        </div>
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

            .top {
                align-items: center;

                .id {
                    margin-left: 15px;
                    margin-right: 10px;

                    font-weight: bold;
                }

                .dash {
                    margin-right: 10px;

                    font-size: 24px;
                }

                .name {
                    font-size: 18px;
                    margin-right: 10px;

                    .target {
                        font-weight: 500;
                    }
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
                    :global(svg) {
                        width: 30px;
                    }

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
                :global(svg) {
                    height: 20px;
                }

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
        max-width: 100%;

        margin-top: 50px;

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

            .top, .bottom {
                display: contents;
            }

            .id {
                font-weight: bold;
                font-size: 32px;
            }

            .point {
                display: none;
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

            .bottom-line {
                display: none;
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

                .line {
                    display: contents;
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
                    justify-content: flex-end;
                    margin-left: 1px;

                    font-weight: bold;
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

    @media (max-width: 850px) {
        .filters {
            flex-direction: column;
            gap: 15px;
        }

        .header {
            font-size: 28px;

            hr {
                margin-top: 9px;
            }
        }

        .updates {
            margin-top: 4px;
            margin-bottom: 12px;

            .update {
                display: grid;
                grid-template-columns: 17px 100%;

                margin-bottom: 6px;
                padding-left: 15px;

                .point {
                    width: 6px;
                    height: 6px;
                }

                .top {
                    .id {
                        margin-left: 0;
                        margin-right: 6px;

                        font-size: 18px;
                    }

                    .dash {
                        margin-right: 6px;

                        font-size: 18px;
                    }

                    .name {
                        display: inline-block;

                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;

                        font-size: 14px;

                        .target {
                            display: none;
                        }
                    }
                }

                .mark {
                    grid-column: 2 / 3;
                    height: 23px;

                    font-size: 16px;
                    // font-weight: 400;

                    .point {
                        display: none;
                    }

                    .update-arrow {
                        width: 20px;

                        margin: 0 6px 1px;
                    }

                    .type-sign {
                        width: 14px;

                        margin-left: 6px;
                        margin-bottom: 2px;
                    }
                }
            }
        }

        .module {
            margin-top: 20px;
            margin-bottom: 6px;

            .text {
                flex-direction: column;
                align-items: flex-start;

                margin-left: -1px;

                .name {
                    max-width: 100%;
                    margin-bottom: 2px;

                    font-size: 20px;
                }

                .point {
                    display: none;
                }

                .bottom {
                    align-items: center;

                    font-size: 16px;

                    .class-average {
                        margin-left: 5px;

                        font-size: 14px;
                    }
                }
            }

            .bottom-line {
                margin-top: 7px;
                margin-bottom: 1px;

                opacity: .6;
            }
        }

        .subject {
            flex-direction: column;

            margin: 10px 0;
            padding: 10px 14px;

            .no-marks {
                margin: 4px 0;

                font-size: 14px;
            }

            .info {
                align-items: flex-start;

                width: 100%;

                margin-top: 0;
                padding: 0;

                .top, .bottom {
                    display: flex;
                    align-items: center;

                    max-width: 100%;
                }

                .id {
                    font-size: 18px;
                }

                .point {
                    display: block;

                    width: 5px;
                    height: 5px;

                    margin: 0 8px;
                }

                .name {
                    display: inline-block;

                    padding: 0;

                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;

                    font-size: 14px;
                }

                .average {
                    margin: 0;

                    font-size: 14px;
                }

                .class-average {
                    margin-left: 5px;

                    font-size: 12px;
                }

                .bottom-line {
                    display: block;

                    width: 100%;

                    border-bottom: 0;
                    border-color: #FFFFFF;

                    opacity: 0.3;
                }
            }

            .marks {
                max-width: 100%;

                padding: 0;

                .mark {
                    display: grid;
                    grid-template-columns: 12px calc(100% - 5px);

                    padding: 0 5px;

                    .point {
                        width: 5px;
                        height: 5px;

                        margin-top: 1px;
                    }

                    .line {
                        display: flex;
                        flex-direction: row-reverse;
                        justify-content: flex-end;

                        font-size: 13px;

                        .name {
                            margin-left: 0;
                        }

                        .value {
                            width: auto;

                            margin-left: 0;
                        }
                    }

                    .class-average {
                        grid-column: 2 / 3;
                        margin-left: 0;

                        font-size: 11px;

                        .parenthesis {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {
        .content {
            padding: 5px 50px;
        }

        .header {
            font-size: 26px;

            hr {
                margin-top: 9px;
            }
        }

        .no-updates {
            font-size: 16px;
        }

        .big-list .entry {
            padding-left: 20px;

            font-size: 17px;
        }
    }

    @media (max-width: 500px) {
        .content {
            padding: 5px 35px;
        }

        .filters {
            margin-bottom: 35px;
        }
    }

    @media (max-width: 400px) {
        .filters {
            margin-bottom: 30px;
        }

        .header {
            font-size: 20px;

            hr {
                margin-top: 6px;
            }
        }

        .loading {
            margin-bottom: 20px;

            :global(.spinner) {
                width: 80px;
            }

            .subtitle {
                margin-top: 20px;

                font-size: 15px;
            }
        }

        .no-updates {
            margin-bottom: 10px;

            font-size: 14px;
            line-height: 18px;
        }

        .big-list .entry {
            margin-bottom: 8px;
            padding-left: 15px;

            font-size: 14px;

            .point {
                width: 6px;
                height: 6px;

                &.small {
                    width: 4px;
                    height: 4px;
                }
            }

            .name {
                margin-right: 8px;
            }

            .mark {
                margin-left: 8px;
            }

            .arrow :global(svg) {
                width: 14px;
                height: 14px;
            }
        }

        .separator {
            margin-top: 0;
            margin-bottom: 5px;
        }
    }

    @media (max-width: 350px) {
        .content {
            padding: 0 25px;
        }

        .subject .marks .mark {
            .line {
                font-size: 12px;
            }

            .class-average {
                font-size: 10px;
            }
        }
    }
</style>
