<template>
    <div class="cursor-wrapper" :class="{ show: showCursor }">
        <div ref="progress" class="progress">
            <svg class="progress-bar" height="80" width="80">
                <circle
                    ref="circle"
                    class="progress-circle"
                    transform="rotate(-90)"
                    stroke-width="2"
                    stroke="#181A23"
                    fill="transparent"
                    r="40"
                    cx="40"
                    cy="40"
                />
            </svg>
            <svg class="progress-bar around" height="80" width="80">
                <circle stroke-width="1" stroke="#c1b9b9" fill="transparent" r="40" cx="40" cy="40" />
            </svg>
        </div>
        <div ref="cursor" class="cursor"></div>
        <div ref="icon" class="cursor-icon">
            <Icon name="arrow" :class="{ right: iconDirection === 'right' }" />
        </div>
    </div>
</template>
<script>
import { gsap } from 'gsap';
import { EventBus } from '~/assets/js/global';

export default {
    data: () => ({
        cursorRect: null,
        iconRect: null,
        progressRect: null,
        circum: 40 * 2 * Math.PI,
        progress: 0
    }),
    computed: {
        dashOffset() {
            return this.circum - (this.progress / 100) * this.circum;
        },
        showCursor() {
            return this.$store.state.cursor.showCursor;
        },
        mousePos() {
            return this.$store.state.cursor.mousePos;
        },
        iconDirection() {
            return this.$store.state.cursor.iconDirection;
        }
    },
    watch: {
        dashOffset(d) {
            gsap.to(this.$refs.circle, {
                strokeDashoffset: d,
                duration: 0.5
            });
        },
        mousePos(pos) {
            const p = {
                icon: {
                    x: pos.x - this.iconRect.width / 2,
                    y: pos.y - this.iconRect.height / 2
                },
                cursor: {
                    x: pos.x - this.cursorRect.width / 2,
                    y: pos.y - this.cursorRect.height / 2
                },
                progress: {
                    x: pos.x - this.progressRect.width / 2,
                    y: pos.y - this.progressRect.height / 2
                }
            };
            gsap.to(this.$refs.icon, {
                duration: 1,
                x: p.icon.x,
                y: p.icon.y,
                ease: 'power4.out'
            });
            gsap.to(this.$refs.cursor, {
                duration: 1.3,
                x: p.cursor.x,
                y: p.cursor.y,
                ease: 'power4.out'
            });
            gsap.to(this.$refs.progress, {
                duration: 1.5,
                x: p.progress.x,
                y: p.progress.y,
                ease: 'power4.out'
            });
        }
    },
    mounted() {
        this.cursorRect = this.$refs.cursor.getBoundingClientRect();
        this.iconRect = this.$refs.icon.getBoundingClientRect();
        this.progressRect = this.$refs.progress.getBoundingClientRect();
        EventBus.$on('startTimer', this.launchWait);
        EventBus.$on('reset', this.reset);
        EventBus.$on('back', this.back);
    },
    methods: {
        back() {
            gsap.killTweensOf(this.$refs.circle);
            gsap.to(this.$refs.circle, {
                strokeDashoffset: this.circum,
                duration: 1,
                ease: 'power4.inOut'
            });
        },
        reset() {
            gsap.killTweensOf(this.$refs.circle);
            gsap.to(this.$refs.circle, {
                strokeDashoffset: -this.circum,
                duration: 1,
                ease: 'power4.inOut'
            });
        },
        launchWait() {
            gsap.killTweensOf(this.$refs.circle);
            gsap.fromTo(
                this.$refs.circle,
                {
                    strokeDashoffset: this.circum
                },
                {
                    strokeDashoffset: 0,
                    duration: this.$store.state.timerSlide / 1000,
                    ease: 'none'
                }
            );
        }
    }
};
</script>
<style lang="scss" scoped>
.cursor-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    user-select: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 10;
    &.show {
        opacity: 1;
    }
}
.cursor {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #181a23;
}
.cursor-icon {
    position: absolute;
    top: 0px;
    left: 0px;
    .icon {
        width: 20px;
        height: 9px;
        transform-origin: 50% 50%;
        transform: rotate(-180deg);
        transition: transform 1s $ease-out-timing-function;
        &.right {
            transform: rotate(0deg);
        }
    }
}
.progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
}

.progress-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 1;
    overflow: visible;
    transform: translate(-50%, -50%);
    &.around {
        z-index: 0;
    }
}
.progress-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;

    // 251.32741228718345 is the circumference of the circle (radius * 2 * PI)
    stroke-dasharray: 251.32741228718345 251.32741228718345;
    stroke-dashoffset: 251.32741228718345;
}
</style>
