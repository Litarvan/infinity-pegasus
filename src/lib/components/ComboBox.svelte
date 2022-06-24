<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { quadInOut } from 'svelte/easing';

    import ComboBoxArrow from '/assets/images/combo_box_arrow.svg?raw';

    export let name;
    export let values;
    export let value;

    let box;
    let opened = false;

    const dispatch = createEventDispatcher();

    function onBodyClick(event)
    {
        let element = event.target;
        if (!box.contains(element)) {
            opened = false;
        }
    }

    function select(choice)
    {
        value = choice.value;
        opened = false;

        dispatch('update', choice);
    }

    $: selected = (values.find(v => v.value === value) || { name: 'Choisir...' }).name;
</script>

<svelte:body on:click={onBodyClick} />

<div class="combo-box">
    <span class="name">{name}</span>
    <div class="box clickable" on:click={() => opened = !opened} bind:this={box} class:opened>
        {selected}
        {@html ComboBoxArrow}
    </div>
    {#if opened}
        <div class="choices card" class:visible={opened} transition:fade={{ duration: 125, easing: quadInOut }}>
            {#each values as choice}
                <div class="choice clickable opaque" on:click={() => select(choice)}>
                    {choice.name}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @use 'sass:color';

    @import 'mixins';
    @import 'vars';

    $name-height: 20px;
    $name-margin: 8px;
    $box-height: 40px;
    $border-radius: 6px;
    $horizontal-padding: 12px;

    $choices-margin: $name-height + $name-margin + $box-height + 7px;

    .combo-box {
        flex-direction: column;

        position: relative;
    }

    .name {
        height: $name-height;

        margin-bottom: $name-margin;
        margin-left: 1px;

        color: $color-label;
    }

    .box {
        justify-content: space-between;
        align-items: center;

        min-width: 400px;
        height: $box-height;

        padding: 0 $horizontal-padding;

        border-radius: $border-radius;

        background-color: $color-field;

        :global(svg) {
            height: 10px;
            margin-top: 2px;

            transition: transform .125s;
        }

        &.opened :global(svg) {
            transform: rotate(180deg);
        }
    }

    .choices {
        flex-direction: column;

        position: absolute;
        top: $choices-margin;
        z-index: 2;

        width: 100%;

        background-color: $color-background;

        border-radius: $border-radius;

        .choice {
            padding: 8px $horizontal-padding;

            @include clickable(background-color, color.change(black, $alpha: .05), color.change(black, $alpha: .1));

            &:first-child {
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }

            &:last-child {
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
    }

    @media (max-width: 975px) {
        .box {
            min-width: 340px;
        }
    }

    @media (max-width: 850px) {
        .box {
            min-width: initial;
        }
    }

    @media (max-width: 400px) {
        .name {
            margin-bottom: $name-margin - 3px;

            font-size: 14px;
        }

        .box, .choices {
            font-size: 12px;
        }

        .box {
            height: $box-height - 8px;

            :global(svg) {
                height: 8px;

                margin-top: 1px;
                margin-right: -2px;
            }
        }

        .choices {
            top: $choices-margin - 10px;
        }
    }
</style>
