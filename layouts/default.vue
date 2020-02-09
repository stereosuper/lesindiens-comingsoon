<template>
    <div>
        <div class="content">
            <Header />
            <nuxt />
            <Footer />
        </div>
        <GridSystem />
        <CustomCursor />
        <Svgs />
    </div>
</template>

<script>
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import Svgs from '~/components/Layout/Svgs';
import GridSystem from '~/components/Layout/GridSystem';
import CustomCursor from '~/components/Layout/CustomCursor';
export default {
    components: {
        Header,
        Footer,
        Svgs,
        GridSystem,
        CustomCursor
    },
    computed: {
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
    mounted() {
        this.$stereorepo.superWindow.initializeWindow(this.$store);
        window.addEventListener('mousemove', this.mouseMove, false);
        this.$nextTick(() => {
            if (this.areAllImagesLoaded) this.$store.commit('setLoading', false);
        });
    },
    methods: {
        mouseMove(e) {
            if (!this.$store.state.cursor.hasMouse) this.$store.commit('cursor/setHasMouse', true);
            this.$store.commit('cursor/setMousePos', {
                x: e.clientX,
                y: e.clientY
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 $gutter;
}
@media (min-width: $tablet) {
    .content {
        padding: 0 40px;
    }
}

@media (min-width: $desktop-small) {
    .content {
        flex-direction: row;
        flex-wrap: wrap;
    }
}

@media (min-width: $desktop-large) {
    .content {
        padding: 0 90px;
    }
}
</style>
