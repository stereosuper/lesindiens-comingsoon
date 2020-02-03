<template>
    <div class="slider">
        <div class="images">
            <img src="img/one.jpg" alt="" />
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
export default {};
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
    flex: 0 1 100%;
    overflow: hidden;
    img {
        object-fit: cover;
        max-width: none;
        width: 100%;
        height: 100%;
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
        height: 100%;
        flex-shrink: 0;
        width: 50%;
        margin-right: -10px;
    }
}

@media (min-width: $desktop-small) {
    .slider {
        position: relative;
        width: percentage(7/12);
    }
    .nav {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 190px;
        width: 190px;
        padding: 20px 50px;
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
        width: calc(#{percentage(7/12)} + 90px - 10px);
        margin-right: -90px;
    }
}
</style>
