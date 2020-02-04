<template>
    <header class="container">
        <div class="logo">
            <Icon name="logo" />
        </div>
        <span>Les Indiens</span>
    </header>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
header {
    display: flex;
    width: 100%;
    color: $white;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 35px $gutter;
}
.icon {
    width: 20px;
    height: 18px;
}
.logo {
    margin-right: 20px;
}

@media (min-width: $desktop-small) {
    header {
        position: fixed;
        top: 0;
        left: 40px;
        align-items: center;
        width: calc((100% - 80px) * 3 / 12);
        height: $header-height;
        padding: 0 $gutter;
        background-color: $black;
    }
}

@media (min-width: $desktop-large) {
    header {
        left: 90px;
        width: calc((100% - 180px) * 5 / 12);
        height: $header-height-big;
    }
}
</style>
