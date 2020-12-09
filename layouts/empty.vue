<template>
    <div>
        <nuxt />
        <Svgs />
    </div>
</template>

<script>
import Svgs from '~/components/Layout/Svgs';

export default {
    components: {
        Svgs
    },
    mounted() {
        this.$store.commit('setLoading', false);
    }
};
</script>
