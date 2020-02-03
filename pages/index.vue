<template>
    <div class="page">
        <Love />
        <Slider />
    </div>
</template>

<script>
import Love from '~/components/Love';
import Slider from '~/components/Slider';
export default {
    components: {
        Love,
        Slider
    }
};
</script>

<style lang="scss" scoped>
@media (min-width: $tablet) {
    .page {
        display: flex;
        justify-content: space-between;
        order: 2;
        height: calc(100vh - #{$header-height});
    }
}

@media (min-width: $desktop-small) {
    .page {
        height: calc(100vh - #{$header-height-big});
    }
}
</style>
