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
        this.$nextTick(() => {
            this.$store.commit('setLoading', false);
        });
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
