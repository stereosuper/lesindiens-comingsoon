<template>
    <div>
        <div ref="container" class="love-container"></div>
        <svg
            v-show="false"
            ref="model"
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
import { gsap } from 'gsap';
import { requestTimeout, clearRequestTimeout } from '@stereorepo/sac';
import { EventBus } from '~/assets/js/global';
export default {
    computed: {
        mousePos() {
            return this.$store.state.cursor.mousePos;
        }
    },
    mounted() {
        EventBus.$on('sendLove', this.sendLove);
        EventBus.$on('stopSendingLove', this.stopSendingLove);
    },
    methods: {
        getRand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        send() {
            const svg = this.$refs.model.cloneNode(true);
            svg.style.display = 'block';
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
                y: this.mousePos.y + randoms.y1,
                x: this.mousePos.x + randoms.x1
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
            if (this.timeout) clearRequestTimeout(this.timeout);
        },
        sendLove(e) {
            this.send();
        }
    }
};
</script>
<style lang="scss" scoped>
.love-container {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 11;
    svg {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
}
</style>
