<script>
    import { onMount } from 'svelte';

    import NoisyVerticalGradient from '../ui/background';

    import topTriangle from '../../assets/images/top_triangle.svg?raw';
    import bottomTriangle from '../../assets/images/bottom_triangle.svg?raw';

    let background;

    onMount(() => {
        const nvg = new NoisyVerticalGradient(50, 1080, ['#343D55', '#0e1016']);
        background.style.backgroundImage = nvg.render_png();
    });
</script>

<div id="background" bind:this={background}>
    <div id="top-triangle" class="triangle">{@html topTriangle}</div>
    <div id="bottom-triangle" class="triangle">{@html bottomTriangle}</div>
</div>

<style lang="scss">
    @import 'src/styles/vars';

    #background {
        position: relative;
        z-index: 1;

        flex-grow: 1;

        overflow: hidden;

        background: $gradient-background;
    }

    .triangle {
        position: absolute;

        $shadowShift: 3px;
        $shadowSize: 15px;
        $shadowColor: rgba(0, 0, 0, .25);

        &#top-triangle {
            top: -175px;
            left: -175px;

            width: 500px;

            filter: drop-shadow($shadowShift $shadowShift $shadowSize $shadowColor);
        }

        &#bottom-triangle {
            bottom: -75px;
            right: -100px;

            width: 600px;

            filter: drop-shadow(#{-$shadowShift} #{-$shadowShift} $shadowSize $shadowColor);
        }
    }
</style>
