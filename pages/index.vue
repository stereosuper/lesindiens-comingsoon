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
@media (min-width: $desktop-small) {
    .page {
        display: flex;
        justify-content: space-between;
        order: 2;
        min-height: 100vh;
        width: 100%;
    }
}
</style>
