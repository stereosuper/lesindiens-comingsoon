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

@media (min-width: $tablet) {
    header {
        width: percentage(3/12);
        padding: 45px $gutter;
    }
}

@media (min-width: $desktop-small) {
    header {
        width: percentage(5/12);
        padding: 65px $gutter;
    }
}
</style>
