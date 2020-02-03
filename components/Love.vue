<template>
    <div class="container love">
        <h1>On vous aime déjà&nbsp;!</h1>
        <p>
            Nous sommes Les Indiens, une équipe de créatifs passionnés. Ce qui nous anime : la diversité de nos clients,
            les belles rencontres et les défis réussis. Fun fact, nous avons déjà travaillé pour un love shop, une
            startup eco-responsable et un géant du fitness.
        </p>
        <ul>
            <li><h2>Branding</h2></li>
            <li><h2>Digital</h2></li>
        </ul>
        <Playlist v-if="isL" />
    </div>
</template>
<script>
import Playlist from '~/components/Playlist';

export default {
    components: {
        Playlist
    },
    computed: {
        isL() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width >= this.$breakpoints.list.l;
        }
    }
};
</script>
<style lang="scss" scoped>
h1 {
    font-size: 5rem;
    font-weight: 200;
    line-height: 1.1;
    margin-bottom: 30px;
}
p {
    margin-bottom: 20px;
    font-size: 1.4rem;
    line-height: 2;
}

li {
    position: relative;
    padding: 20px 0;
    font-size: 1.6rem;
    list-style-type: none;
    &::after {
        content: '';
        position: absolute;
        left: -20px;
        right: -20px;
        bottom: 0;
        height: 1px;
        background-color: #313131;
    }
    h2 {
        font-weight: normal;
    }
}
ul {
    margin-bottom: 50px;
}

@media (min-width: $tablet) {
    .love {
        flex-shrink: 0;
        width: percentage(5/12);
        margin: 0;
    }
    li::after {
        right: 0;
    }
}

@media (min-width: $desktop-small) {
    h1 {
        font-size: 7rem;
    }
    .love {
        width: percentage(4/12);
    }
}

@media (min-width: $desktop-large) {
    li::after {
        left: -100px;
    }
}
</style>
