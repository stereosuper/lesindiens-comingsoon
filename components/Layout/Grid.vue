<template>
    <div class="grid" :style="{ padding: `0 ${margin}px` }">
        <div v-for="c in col" :key="c" class="col" :style="{ padding: `0 ${gutter}px` }">
            <div class="inner"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        col: {
            type: Number,
            required: true
        },
        gutter: {
            type: Number,
            required: true
        },
        margin: {
            type: Number,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.grid {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    pointer-events: none;
    z-index: 10;
}
.col {
    position: relative;
    flex: 1 1 auto;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(white, 0.2);
        width: 1px;
    }
    &:first-child {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(white, 0.2);
            width: 1px;
        }
    }
}
.inner {
    height: 100%;
    width: 100%;
    background-color: rgba(red, 0.2);
}
</style>
