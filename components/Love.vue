<template>
    <div class="container love">
        <div class="inner-love">
            <LoveText />
            <p>
                Nous sommes Les Indiens, une équipe de créatifs passionnés. Ce qui nous anime : la diversité de nos
                clients, les belles rencontres et les défis réussis. Fun fact, nous avons déjà travaillé pour un love
                shop, une startup eco-responsable et un géant du fitness.
            </p>
            <ul>
                <li><h2>Branding</h2></li>
                <li><h2>Digital</h2></li>
            </ul>
            <Playlist v-if="isL" />
            <Sprite :cols="15" :rows="1" :interval="0.08" :loop="true" />
        </div>
    </div>
</template>
<script>
import Playlist from '~/components/Playlist';
import Sprite from '~/components/Sprite';
import LoveText from '~/components/LoveText.vue';

export default {
    components: {
        Playlist,
        Sprite,
        LoveText
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

.sprite {
    position: absolute;
    bottom: -5px;
    right: -50px;
    width: 340px;
    height: 340px;
    background-repeat: no-repeat;
    background-size: 1500% auto;
    z-index: -1;
}

.inner-love {
    position: relative;
    max-width: 100%;
    overflow: hidden;
}

@media (min-width: $tablet) {
    .sprite {
        width: 400px;
        height: 400px;
        right: 0px;
        bottom: -55px;
    }
    .container {
        padding: 0;
    }
    p {
        width: percentage(5/6);
        padding: 0 $gutter;
    }
    li::after {
        left: -50px;
        right: 0;
    }
    ul {
        padding: 0 $gutter;
        width: percentage(5/6);
    }
    .inner-love {
        overflow: visible;
    }
}

@media (min-width: $desktop-small) {
    .sprite {
        width: 350px;
        height: 350px;
        right: -50px;
        bottom: 40px;
    }
    .love {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        width: percentage(5/12);
        margin: 0;
        padding-top: $header-height;
        padding-bottom: 20px;
    }
    p,
    ul {
        width: 100%;
    }
}

@media (min-width: $desktop-large) {
    .sprite {
        width: 510px;
        height: 510px;
        right: -180px;
        bottom: 0px;
    }
    .love {
        width: percentage(4/12);
        padding-top: $header-height-big;
    }
    li::after {
        left: -100px;
    }
}

@media (min-width: $desktop-xxl) {
    .love {
        width: percentage(3/12);
    }
}
</style>
