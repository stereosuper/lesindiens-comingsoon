<template>
    <div class="loader" :class="{ loading: isLoading }"></div>
</template>

<script>
import { wait } from '@stereorepo/sac';

export default {
    data: () => ({
        startTime: null,
        minimumTime: 600
    }),
    computed: {
        isLoading() {
            return this.$store.state.loading;
        },
        allImages() {
            return this.$store.state.imageLoaded.allImages;
        },
        allLoadedImages() {
            return this.$store.state.imageLoaded.allLoadedImages;
        },
        areAllImagesLoaded() {
            return this.$store.getters['imageLoaded/areAllImagesLoaded'];
        }
    },
    watch: {
        allLoadedImages() {
            if (this.areAllImagesLoaded) {
                this.$store.commit('setLoading', false);
            }
        }
    },
    methods: {
        start() {
            this.startTime = new Date().getTime();
            this.$store.commit('setLoading', true);
        },
        async finish() {
            const endTime = new Date().getTime();
            const deltaTime = endTime - this.startTime;
            const remainingTime = this.minimumTime - deltaTime;
            if (remainingTime > 0) {
                await wait(remainingTime);
            }

            if (this.areAllImagesLoaded) {
                this.$store.commit('setLoading', false);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $black;
    opacity: 0;
    pointer-events: none;
    z-index: 20;
    transition: 0.5s ease-out;
    &.loading {
        opacity: 1;
        // transition: 0s ease-out;
    }
}
</style>
