<template>
    <svg class="icon" :class="`icon-${name}`"><use v-bind="{ 'xlink:href': `#icon-${name}` }" /></svg>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.icon {
    fill: currentColor;
}
</style>
