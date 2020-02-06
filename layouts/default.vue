<template>
    <div>
        <div class="content">
            <Header />
            <nuxt />
            <Footer />
        </div>
        <GridSystem />
        <Svgs />
    </div>
</template>

<script>
import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import Svgs from '~/components/Layout/Svgs';
import GridSystem from '~/components/Layout/GridSystem';
export default {
    components: {
        Header,
        Footer,
        Svgs,
        GridSystem
    },
    mounted() {
        this.$stereorepo.superWindow.initializeWindow(this.$store);
        window.addEventListener('mousemove', this.firstMouseMove, false);
        this.$nextTick(() => {
            this.$store.commit('setLoading', false);
        });
    },
    methods: {
        firstMouseMove() {
            this.$store.commit('setHasMouse', true);
            window.removeEventListener('mousemove', this.firstMouseMove, false);
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
