<script>
    import spinner from '../../assets/images/spinner.svg?raw';
</script>

<div class="spinner">
    {@html spinner}
</div>

<style lang="scss">
    .spinner {
        width: 100px;
        animation: spin .75s linear infinite;
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>