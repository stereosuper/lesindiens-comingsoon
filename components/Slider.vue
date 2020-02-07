<template>
    <div class="slider">
        <div ref="slider" class="images" @mouseenter="imIn" @mouseleave="imOut" @mousemove="mouseMove">
            <div
                v-for="s in slides"
                :key="s.title"
                class="image"
                :class="{ center: s.color }"
                :style="{ backgroundColor: s.color }"
            >
                <img :src="`slides/${s.image}`" :alt="s.title" />
            </div>
        </div>
        <div class="nav">
            <div class="inner-nav">
                <span class="category">Web design</span>
                <div class="infos">
                    <span class="name">Informatique Banque Populaire</span>
                    <Icon name="link" />
                </div>
                <div class="arrows">
                    <button class="prev">
                        <Icon name="chevron" />
                    </button>
                    <button class="next">
                        <Icon name="chevron" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        rect: null,
        over: false
    }),
    computed: {
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
        resizing(r) {
            if (r) return;
            this.rect = this.$refs.slider.getBoundingClientRect();
        }
    },
    mounted() {
        this.rect = this.$refs.slider.getBoundingClientRect();
    },
    methods: {
        imIn() {
            this.over = true;
            this.setDirection();
            this.$store.commit('cursor/setShowCursor', true);
        },
        imOut() {
            this.over = false;
            this.$store.commit('cursor/setShowCursor', false);
        },
        mouseMove() {
            if (!this.showCursor) this.$store.commit('cursor/setShowCursor', true);
            this.over = true;
            this.setDirection();
        },
        setDirection() {
            if (!this.over) return;
            const posFromElement = this.mousePos.x - this.rect.left;
            const side = posFromElement - this.rect.width / 2;
            const direction = side < 0 ? 'left' : 'right';
            if (this.iconDirection != direction) this.$store.commit('cursor/setIconDirection', direction);
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
.infos {
    display: flex;
    flex-direction: column;
    width: 50%;
    .icon {
        width: 14px;
        height: 14px;
        margin-top: 5px;
        color: $white;
    }
}
.nav {
    position: relative;
    flex-shrink: 0;
    padding: $gutter * 2;
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
}

.images {
    position: relative;
    flex: 0 1 100%;
    overflow: hidden;
    cursor: none;
}

.image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    img {
        object-fit: cover;
        max-width: none;
        width: 100%;
        height: 100%;
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
        .icon {
            margin-top: 15px;
            width: 17px;
            height: 17px;
        }
    }
    .arrows {
        display: none;
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
