<template>
    <div class="title">
        <h1>
            <span ref="area" @mouseenter="sendLove" @mouseleave="stopSendingLove" @mousemove="getMousePos">
                On vous <br />aime déjà&nbsp;!
            </span>
        </h1>
    </div>
</template>
<script>
import { EventBus } from '~/assets/js/global';
export default {
    data: () => ({
        over: false,
        pos: {
            x: 0,
            y: 0
        },
        rect: null,
        timeout: null
    }),
    computed: {
        resizing() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.resizing;
        },
        hasMouse() {
            return this.$store.state.cursor.hasMouse;
        }
    },
    watch: {
        resizing(r) {
            if (r) return;
            this.rect = this.$refs.area.getBoundingClientRect();
        }
    },
    methods: {
        getMousePos(e) {
            if (!this.hasMouse || !this.over) return;
            const p = {
                x: e.clientX - this.rect.left - 23 / 2,
                y: e.clientY - this.rect.top - 20 / 2
            };
            this.pos = p;
        },
        stopSendingLove() {
            if (!this.hasMouse) return;
            EventBus.$emit('stopSendingLove');
        },
        sendLove(e) {
            if (!this.hasMouse) return;
            EventBus.$emit('sendLove');
        }
    }
};
</script>
<style lang="scss" scoped>
h1 {
    position: relative;
    font-size: 5rem;
    font-weight: 200;
    line-height: 1.1;
    user-select: none;
    pointer-events: none;
    > span {
        position: relative;
        pointer-events: all;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
}
.title {
    margin-bottom: 30px;
}
@media (min-width: $tablet) {
    h1 {
        font-size: 7rem;
    }
    .title {
        padding: 0 $gutter;
        width: 50%;
    }
}
@media (min-width: $desktop-small) {
    .title {
        width: 100%;
    }
}
</style>
