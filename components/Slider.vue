<template>
    <div class="slider">
        <div
            ref="slider"
            class="images"
            @click="clickCursor(iconDirection)"
            @mouseenter="imIn"
            @mouseleave="imOut"
            @mousemove="mouseMove"
        >
            <div
                v-for="s in slides"
                ref="image"
                :key="s.title"
                class="image"
                :class="{ center: s.color }"
                :style="{ backgroundColor: s.color }"
            >
                <img v-imageLoaded :src="`slides/${s.image}`" :alt="s.title" />
            </div>
        </div>
        <div class="nav">
            <div ref="nav" class="inner-nav">
                <a v-if="slides[current].url" :href="slides[current].url" class="wrapper-infos">
                    <span class="category">{{ slides[current].cat }}</span>
                    <div class="infos">
                        <span class="name">{{ slides[current].title }}</span>
                        <Icon name="link" />
                    </div>
                </a>
                <div v-else class="wrapper-infos">
                    <span class="category">{{ slides[current].cat }}</span>
                    <div class="infos">
                        <span class="name">{{ slides[current].title }}</span>
                    </div>
                </div>
                <div class="arrows">
                    <button aria-label="Projet précédent" class="prev" @click="changeSlide('left')">
                        <Icon name="chevron" />
                    </button>
                    <button aria-label="Projet suivant" class="next" @click="changeSlide('right')">
                        <Icon name="chevron" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { gsap } from 'gsap/all';
import { EventBus } from '~/assets/js/global';
import { requestTimeout, clearRequestTimeout } from '@stereorepo/sac';
export default {
    data: () => ({
        rect: null,
        over: false,
        current: 0,
        totalNumber: 0,
        transitionning: false,
        autoPlayTimeout: null
    }),
    computed: {
        isL() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width >= this.$breakpoints.list.l;
        },
        slides() {
            return this.$store.state.slides;
        },
        resizing() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.resizing;
        },
        mousePos() {
            return this.$store.state.cursor.mousePos;
        },
        showCursor() {
            return this.$store.state.cursor.showCursor;
        },
        iconDirection() {
            return this.$store.state.cursor.iconDirection;
        }
    },
    watch: {
        isL(is) {
            if (!is) {
                if (this.autoPlayTimeout) {
                    clearRequestTimeout(this.autoPlayTimeout);
                    this.autoPlayTimeout = null;
                }
                this.$store.commit('cursor/setShowCursor', false);
            } else {
                this.$nextTick(() => {
                    if (!this.autoPlayTimeout) this.timeoutAutoplay();
                });
            }
        },
        resizing(r) {
            if (r) return;
            this.rect = this.$refs.slider.getBoundingClientRect();
        }
    },
    created() {
        this.totalNumber = this.slides.length - 1;
    },
    mounted() {
        this.rect = this.$refs.slider.getBoundingClientRect();
        this.initSlider();
    },
    methods: {
        clickCursor(d) {
            if (!this.isL) return;
            this.changeSlide(d);
        },
        initSlider() {
            const img = this.$refs.image[this.current];
            gsap.set(img, {
                opacity: 1
            });
            gsap.set(img.querySelector('img'), {
                scale: 1
            });

            const txts = [
                this.$refs.nav.querySelector('.icon-link'),
                this.$refs.nav.querySelector('.name'),
                this.$refs.nav.querySelector('.category')
            ].filter(el => el);

            gsap.set(txts, {
                opacity: 1,
                y: 0
            });
            this.$nextTick(() => {
                this.timeoutAutoplay();
            });
        },
        changeSlide(direction) {
            if (this.autoPlayTimeout) clearRequestTimeout(this.autoPlayTimeout);
            if (this.transitionning) return;
            EventBus.$emit('back');
            this.transitionning = true;
            if (direction === 'left') {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        },
        manageZindex(nextIndex) {
            gsap.set(this.$refs.image, {
                zIndex: 0
            });

            gsap.set(this.$refs.image[nextIndex], {
                zIndex: 1
            });
        },
        nextSlide() {
            const nextIndex = this.current + 1 > this.totalNumber ? 0 : this.current + 1;
            this.manageZindex(nextIndex);
            const nextImage = this.$refs.image[nextIndex];
            const nextInner = nextImage.querySelector('img');
            const currentImage = this.$refs.image[this.current];
            const currentInner = currentImage.querySelector('img');
            const anim = this.slideTimeline(currentInner, currentImage, nextInner, nextImage, nextIndex, 1);
            const animNav = this.navTimeline();
            anim.play();
            animNav.play();
        },
        prevSlide() {
            const nextIndex = this.current - 1 < 0 ? this.totalNumber : this.current - 1;
            this.manageZindex(nextIndex);
            const nextImage = this.$refs.image[nextIndex];
            const nextInner = nextImage.querySelector('img');
            const currentImage = this.$refs.image[this.current];
            const currentInner = currentImage.querySelector('img');
            const anim = this.slideTimeline(currentInner, currentImage, nextInner, nextImage, nextIndex, -1);
            const animNav = this.navTimeline();
            anim.play();
            animNav.play();
        },
        imIn() {
            if (!this.isL) return;
            this.over = true;
            this.setDirection();
            this.$store.commit('cursor/setShowCursor', true);
        },
        imOut() {
            if (!this.isL) return;
            this.over = false;
            this.$store.commit('cursor/setShowCursor', false);
        },
        mouseMove() {
            if (!this.showCursor && this.isL) this.$store.commit('cursor/setShowCursor', true);
            this.over = true;
            this.setDirection();
        },
        setDirection() {
            if (!this.over) return;
            const posFromElement = this.mousePos.x - this.rect.left;
            const side = posFromElement - this.rect.width / 2;
            const direction = side < 0 ? 'left' : 'right';
            if (this.iconDirection != direction) this.$store.commit('cursor/setIconDirection', direction);
        },
        timeoutAutoplay() {
            if (!this.isL) return;
            EventBus.$emit('startTimer');
            this.autoPlayTimeout = requestTimeout(() => {
                EventBus.$emit('reset');
                this.transitionning = true;
                this.nextSlide();
            }, this.$store.state.timerSlide);
        },
        afterAnim(nextIndex) {
            this.current = nextIndex;
            this.$nextTick(() => {
                const nav = this.navTimeline('in');
                nav.play();
            });
        },
        navTimeline(dir = 'out') {
            const title = this.$refs.nav.querySelector('.name');
            const cat = this.$refs.nav.querySelector('.category');
            const link = this.$refs.nav.querySelector('.icon-link');

            const tl = new gsap.timeline({
                paused: true,
                onComplete:
                    dir === 'in'
                        ? () => {
                              this.transitionning = false;
                          }
                        : null
            });

            const txts = [link, title, cat].filter(el => el);

            if (dir === 'in') txts.reverse();

            tl.fromTo(
                txts,
                {
                    y: dir === 'in' ? 10 : 0,
                    opacity: dir === 'in' ? 0 : 1
                },
                {
                    duration: 0.8,
                    stagger: 0.1,
                    y: dir === 'out' ? 10 : 0,
                    opacity: dir === 'out' ? 0 : 1,
                    ease: 'power3.out'
                }
            );

            return tl;
        },
        slideTimeline(currentInner, currentImage, nextInner, nextImage, nextIndex, dir) {
            const tl = new gsap.timeline({
                paused: true
            });
            tl.fromTo(
                nextInner,
                {
                    scale: 1.2
                },
                {
                    duration: 1.2,
                    ease: 'power4.out',
                    scale: 1
                },
                'start'
            );
            tl.fromTo(
                currentInner,
                {
                    scale: 1
                },
                {
                    duration: 1.2,
                    ease: 'power4.out',
                    scale: 1.2
                },
                'start'
            );
            tl.fromTo(
                currentImage,
                {
                    opacity: 1,
                    x: 0
                },
                {
                    duration: 1.2,
                    ease: 'power4.out',
                    x: `${-50 * dir}%`,
                    opacity: 0
                },
                'start'
            );
            tl.fromTo(
                nextImage,
                {
                    opacity: 1,
                    x: `${100 * dir}%`
                },
                {
                    duration: 1.2,
                    ease: 'power4.out',
                    x: 0
                },
                'start'
            );
            tl.add(() => {
                this.afterAnim(nextIndex);
            }, 'start+=0.7');

            tl.add(() => {
                this.timeoutAutoplay();
            }, 'start+=1');

            return tl;
        }
    }
};
</script>
<style lang="scss" scoped>
.slider {
    display: flex;
    flex-direction: column;
    width: calc(100% + #{$gutter * 2});
    margin-left: -$gutter;
    height: 530px;
    max-height: 100vh;
}
.wrapper-infos {
    display: flex;
    flex-direction: column;
}
.infos {
    display: flex;
    align-items: center;
    .icon {
        width: 14px;
        height: 14px;
        color: currentColor;
        margin-left: 5px;
    }
}
.nav {
    position: relative;
    flex-shrink: 0;
    padding: $gutter * 2;
    z-index: 2;
    &::after {
        content: '';
        position: absolute;
        right: -20px;
        left: -20px;
        height: 1px;
        bottom: 0;
        background-color: #313131;
    }
}

.inner-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.images {
    position: relative;
    flex: 0 1 100%;
    overflow: hidden;
}

.image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform-origin: 50% 50%;
    overflow: hidden;
    img {
        object-fit: cover;
        max-width: none;
        width: 100%;
        height: 100%;
        transform-origin: 50% 50%;
        transform: scale(1.2);
    }
    &.center {
        img {
            object-fit: contain;
        }
    }
}

.arrows {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 80px;
    button {
        color: $white;
        border: none;
        &.next {
            .icon {
                transform-origin: 50% 50%;
                transform: rotate(180deg);
            }
        }
        &:focus {
            outline: none;
        }
    }
    .icon {
        width: 9px;
        height: 18px;
    }
}

.category {
    width: 100%;
    font-size: 1.4rem;
    color: #787878;
    margin-bottom: 5px;
}

.name {
    font-size: 1.6rem;
    line-height: 1.1;
}

.icon-link,
.name,
.category {
    opacity: 0;
    transform: translateY(10px);
}

@media (min-width: $tablet) {
    .slider {
        width: calc(100% + 80px);
        margin-left: -40px;
    }
    .nav {
        padding: 20px 50px;
    }
}

@media (min-width: $desktop-small) {
    .slider {
        position: fixed;
        top: $header-height;
        bottom: 0;
        right: 0;
        height: auto;
        width: calc(((100% - 80px) * 7 / 12) + 30px);
    }
    .nav {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 160px;
        width: 160px;
        padding: 20px;
        background-color: $black;
        &::after {
            content: none;
        }
    }
    .inner-nav {
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
    }
    .category,
    .name {
        font-size: 1.2rem;
    }
    .infos {
        width: auto;
        align-items: flex-end;
        flex-direction: column;
        .icon {
            margin-top: 15px;
            margin-left: 0;
            width: 17px;
            height: 17px;
        }
    }
    .arrows {
        display: none;
    }
    .images {
        cursor: none;
    }
}

@media (min-width: $desktop-large) {
    .slider {
        width: calc(((100% - 180px) * 7 / 12) + 80px);
        top: $header-height-big;
    }
    .nav {
        height: 190px;
        width: 190px;
        padding: 20px 50px;
    }
}

@media (min-width: $desktop-xxl) {
    .slider {
        width: calc(((100% - 180px) * 8 / 12) + 80px);
    }
}
</style>
