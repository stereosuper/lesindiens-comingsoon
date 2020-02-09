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
    },
    async fetch({ app }) {
        const res = await app.$axios.get('/.netlify/functions/getPlaylist');
        app.store.commit('setTracks', res.data.playlist.items);
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
