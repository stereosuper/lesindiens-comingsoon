<template>
    <div class="error container">
        <div class="text">
            <div class="inner-text">
                <p>Erreur 404</p>
                <h1>Oups ! <br />Vous avez manqué votre cible</h1>
                <nuxt-link to="/">
                    <span>
                        Retour à l'accueil
                    </span>
                    <Icon name="arrow" />
                </nuxt-link>
            </div>
        </div>
        <div class="angelot">
            <div class="sprite-wrapper">
                <Sprite
                    ref="sprite"
                    :cols="13"
                    :rows="1"
                    :interval="0.08"
                    :autoplay="false"
                    :delay="0.4"
                    url="img/cupidon.png"
                    @ended="reset"
                />
                <div class="flying-hearts">
                    <svg
                        v-for="(h, i) in heartsOptions"
                        :key="'heart' + i"
                        ref="heart"
                        class="heart"
                        viewBox="0 0 23 20"
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
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';
import Sprite from '~/components/Sprite';

export default {
    components: {
        Sprite
    },
    data: () => ({
        rect: null,
        nbHearts: 8,
        heartsOptions: [
            {
                yInitial: [80, 100],
                xInitial: [5, 10],
                xOffset: [-5, 5],
                yOffset: [20, 30]
            },
            {
                yInitial: [60, 80],
                xInitial: [20, 50],
                xOffset: [-15, 15],
                yOffset: [10, 30]
            },
            {
                yInitial: [60, 80],
                xInitial: [20, 50],
                xOffset: [-15, 15],
                yOffset: [10, 30]
            },
            {
                yInitial: [60, 80],
                xInitial: [20, 50],
                xOffset: [-15, 15],
                yOffset: [10, 30]
            },
            {
                yInitial: [10, 50],
                xInitial: [0, 15],
                xOffset: [-15, 15],
                yOffset: [20, 30]
            },
            {
                yInitial: [10, 50],
                xInitial: [0, 15],
                xOffset: [-15, 15],
                yOffset: [20, 50]
            },
            {
                yInitial: [10, 40],
                xInitial: [10, 20],
                xOffset: [-15, 15],
                yOffset: [10, 20]
            },
            {
                yInitial: [10, 40],
                xInitial: [10, 20],
                xOffset: [-15, 15],
                yOffset: [10, 50]
            },
            {
                yInitial: [5, 30],
                xInitial: [30, 50],
                xOffset: [-15, 15],
                yOffset: [20, 50]
            },
            {
                yInitial: [5, 30],
                xInitial: [30, 50],
                xOffset: [-15, 15],
                yOffset: [20, 50]
            },
            {
                yInitial: [45, 55],
                xInitial: [0, 8],
                xOffset: [-5, 5],
                yOffset: [10, 30]
            }
        ]
    }),
    computed: {
        ww() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width;
        }
    },
    watch: {
        ww() {
            this.rect = this.$refs.sprite.$el.getBoundingClientRect();
        }
    },
    mounted() {
        this.rect = this.$refs.sprite.$el.getBoundingClientRect();
        this.zeeePartiii();
    },
    beforeDestroy() {
        gsap.killTweensOf(this.zeeePartiii);
        gsap.killTweensOf(this.playSprite);
    },
    methods: {
        getRand([min, max]) {
            return Math.random() * (max - min + 1) + min;
        },
        playSprite() {
            this.$refs.sprite.play();
        },
        zeeePartiii() {
            this.launchHearts();
            gsap.delayedCall(0.4, this.playSprite);
        },
        launchHearts() {
            this.$refs.heart.forEach((el, i) => {
                const randoms = {
                    x1: this.getRand(this.heartsOptions[i].xInitial),
                    y1: this.getRand(this.heartsOptions[i].yInitial),
                    x2: this.getRand(this.heartsOptions[i].xOffset),
                    y2: this.getRand(this.heartsOptions[i].yOffset),
                    width: this.getRand([2, 5]),
                    duration: this.getRand([1.8, 2.5])
                };

                gsap.set(el, {
                    top: `${randoms.y1}%`,
                    left: `${randoms.x1}%`,
                    opacity: 0,
                    scale: 1,
                    x: 0,
                    y: 0,
                    width: `${randoms.width}%`
                });

                // console.log(randoms.x2, this.rect.width, randoms.x2 / this.rect.width);
                const tl = new gsap.timeline();

                tl.to(
                    el,
                    {
                        duration: randoms.duration,
                        y: (-randoms.y2 * this.rect.height) / 100,
                        x: (randoms.x2 * this.rect.width) / 100,
                        scale: 0.4,
                        ease: 'power1.out'
                    },
                    'start'
                )
                    .to(
                        el,
                        {
                            duration: randoms.duration / 3,
                            opacity: 1
                        },
                        'start'
                    )
                    .to(
                        el,
                        {
                            duration: (randoms.duration / 3) * 2,
                            opacity: 0
                        },
                        `start+=${randoms.duration / 3}`
                    );
            });
        },
        reset() {
            this.$refs.sprite.reInit();
            gsap.delayedCall(2.5, this.zeeePartiii);
        }
    }
};
</script>

<style lang="scss" scoped>
.heart {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 5%;
}
.error {
    width: 100%;
}
.icon-arrow {
    width: 20px;
    height: 9px;
}
.text {
    width: 100%;
}

.angelot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-height: 100vh;
    padding: 70px 0;
}

p {
    position: relative;
    padding: 20px 0;
    font-size: 1.6rem;
    width: 100%;
    &::after {
        content: '';
        position: absolute;
        left: -20px;
        right: -20px;
        bottom: 0;
        height: 1px;
        background-color: #313131;
    }
}

h1 {
    font-size: 5rem;
    font-weight: 200;
    line-height: 1.1;
    margin: 30px 0;
    width: 100%;
}
a {
    display: flex;
    align-items: center;
    width: 100%;

    > span {
        margin-right: 20px;
    }
}

.sprite-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 73.7704918%;
}

.sprite {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // bottom: -5px;
    // right: -50px;
    // width: 1464px;
    // height: 1080px;

    // width: 100%;

    background-repeat: no-repeat;
    background-size: 1300% auto;
}

@media (min-width: $tablet) {
    .sprite-wrapper {
        width: percentage(5/6);
    }
    h1 {
        font-size: 7rem;
        width: percentage(5/6);
    }
    p::after {
        left: -50px;
        right: 0;
    }
}

@media (min-width: $desktop-small) {
    .error {
        display: flex;
        margin: 0;
        min-height: 100vh;
        width: 100%;
    }

    .text {
        display: flex;
        align-items: center;
        width: percentage(5/12);
        flex-shrink: 0;
        padding-top: $header-height;
        padding-bottom: 20px;
    }

    .angelot {
        position: fixed;
        top: $header-height;
        bottom: 0;
        right: 50px;
        height: auto;
        width: calc(((100% - 80px) * 7 / 12) - 20px);
    }

    .sprite-wrapper {
        width: percentage(6/7);
    }

    h1 {
        width: 100%;
    }
}

@media (min-width: $desktop-large) {
    .text {
        width: percentage(4/12);
        padding-top: $header-height-big;
    }
    p::after {
        left: -100px;
    }
    .angelot {
        top: $header-height-big;
        right: 100px;
        width: calc(((100% - 180px) * 8 / 12) - 20px);
    }
}
</style>
