<template>
    <div class="grid-system">
        <Grid v-if="isMobile && show" :col="4" :margin="10" :gutter="10" />
        <Grid v-if="isM && show" :col="6" :margin="40" :gutter="10" />
        <Grid v-if="isL && show" :col="12" :margin="40" :gutter="10" />
        <Grid v-if="isLarge && show" :col="12" :margin="90" :gutter="10" />
    </div>
</template>
<script>
import Grid from '~/components/Layout/Grid';
export default {
    components: {
        Grid
    },
    data: () => ({
        show: false
    }),
    computed: {
        isMobile() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width < this.$breakpoints.list.m;
        },
        isM() {
            if (!this.$store.state.superWindow) return false;
            return (
                this.$store.state.superWindow.width >= this.$breakpoints.list.m &&
                this.$store.state.superWindow.width < this.$breakpoints.list.l
            );
        },
        isL() {
            if (!this.$store.state.superWindow) return false;
            return (
                this.$store.state.superWindow.width >= this.$breakpoints.list.l &&
                this.$store.state.superWindow.width < this.$breakpoints.list.large
            );
        },
        isLarge() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width >= this.$breakpoints.list.large;
        }
    },
    mounted() {
        document.addEventListener(
            'keydown',
            e => {
                if (e.altKey && e.code === 'KeyG') this.show = !this.show;
            },
            false
        );
    }
};
</script>
