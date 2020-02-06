<template>
    <div class="title">
        <h1>
            <span ref="area" @mouseenter="sendLove" @mouseleave="stopSendingLove" @mousemove="getMousePos">
                On vous aime déjà&nbsp;!
            </span>
            <div ref="container" class="love-container"></div>
        </h1>
        <svg
            ref="model"
            class="model"
            viewBox="0 0 23 20"
            width="23"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20.291 2.612a5.5 5.5 0 00-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
</template>
<script>
import { requestTimeout, clearRequestTimeout } from '@stereorepo/sac';
import { gsap } from 'gsap/all';
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
        hasMouse() {
            return this.$store.state.hasMouse;
        }
    },
    methods: {
        getRand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        getMousePos(e) {
            if (!this.hasMouse || !this.over) return;
            const p = {
                x: e.clientX - this.rect.left - 23 / 2,
                y: e.clientY - this.rect.top - 20 / 2
            };
            this.pos = p;
        },
        send() {
            const svg = this.$refs.model.cloneNode(true);
            svg.classList.remove('model');
            this.$refs.container.appendChild(svg);

            const randoms = {
                x1: this.getRand(-20, 20),
                x2: this.getRand(-50, 50),
                y1: this.getRand(-10, 10),
                y2: this.getRand(50, 130),
                duration: this.getRand(0.4, 1),
                interval: this.getRand(50, 150)
            };

            gsap.set(svg, {
                y: this.pos.y + randoms.y1,
                x: this.pos.x + randoms.x1
            });
            gsap.to(svg, {
                duration: randoms.duration,
                y: `-=${randoms.y2}`,
                x: randoms.x2 > 0 ? `+=${randoms.x2}` : `-=${Math.abs(randoms.x2)}`,
                opacity: 0,
                scale: 0.4,
                onComplete: () => {
                    this.$refs.container.removeChild(svg);
                }
            });

            this.timeout = requestTimeout(() => {
                this.send();
            }, randoms.interval);
        },
        stopSendingLove() {
            if (!this.hasMouse) return;
            if (this.timeout) clearRequestTimeout(this.timeout);
            this.over = false;
        },
        sendLove(e) {
            if (!this.hasMouse) return;
            this.rect = this.$refs.area.getBoundingClientRect();
            this.over = true;
            this.getMousePos(e);
            this.send();
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
.love-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    svg {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
}
.model {
    display: none;
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
