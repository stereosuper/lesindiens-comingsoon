<template>
    <div ref="image" class="sprite" :style="{ backgroundImage: `url(img/hand.png)` }"></div>
</template>
<script>
import { gsap } from 'gsap/all';
export default {
    props: {
        cols: {
            type: Number,
            required: true
        },
        rows: {
            type: Number,
            required: true
        },
        interval: {
            type: Number,
            required: true
        },
        loop: {
            type: Boolean,
            required: false,
            default: false
        },
        numberEmpty: {
            type: Number,
            required: false,
            default: 0
        }
    },
    data: () => ({
        gridWidth: 0,
        gridHeight: 0,
        shouldStop: false,
        tl: null
    }),
    created() {
        this.gridWidth = 100 / (this.cols - 1);
        this.gridHeight = 100 / (this.rows - 1);
    },
    mounted() {
        this.tl = gsap.timeline({
            paused: true,
            repeat: this.loop ? -1 : 0,
            onRepeat: this.checkShouldStop,
            onRepeatScope: this,
            repeatDelay: 0.1
        });

        let count = 0;
        let xpos;
        let ypos;

        for (let r = 0; r < this.rows; r += 1) {
            const cols = r === this.rows - 1 ? this.cols - this.numberEmpty : this.cols;

            for (let c = 0; c < cols; c += 1) {
                xpos = c * this.gridWidth;
                ypos = this.rows > 1 ? r * this.gridHeight : 0;
                this.tl.set(this.$refs.image, { backgroundPosition: `${xpos}% ${ypos}%` }, count * this.interval);
                count += 1;
            }
        }
        this.play();
    },
    methods: {
        pause() {
            this.tl.pause();
        },
        reInit() {
            this.tl.pause(0);
        },
        play() {
            this.tl.play();
        },
        stopAtEnd() {
            this.shouldStop = true;
        },
        resume() {
            this.tl.resume();
        },
        checkShouldStop() {
            if (this.shouldStop) {
                this.pause();
            } else {
                this.resume();
            }
        }
    }
};
</script>
<style lang="scss" scoped></style>
