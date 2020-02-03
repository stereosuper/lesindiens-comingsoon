<template>
    <footer class="container">
        <div>
            <a target="_blank" rel="noopener nofollower" href="https://www.instagram.com/studio_lesindiens/">
                Instagram
            </a>
            <a target="_blank" rel="noopener nofollower" href="https://dribbble.com/lesindiens">
                Dribbble
            </a>
        </div>
        <a target="_blank" rel="noopener nofollower" href="mailto:hello@lesindiens.fr">hello@lesindiens.fr</a>
        <div>
            <a target="_blank" rel="noopener nofollower" href="telto:0285526962">02 85 52 69 62</a>
            <a target="_blank" rel="noopener nofollower" href="https://goo.gl/maps/t3qxQYgVFbBw8Ytw9">
                11, impasse Juton 44000 Nantes
            </a>
        </div>
    </footer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
footer {
    width: 100%;
    padding: 40px $gutter 50px;
}
a {
    display: inline-block;
    margin-bottom: 20px;
    margin-right: 15px;
}
@media (min-width: $tablet) {
    footer {
        display: flex;
        justify-content: flex-end;
        width: percentage(9/12);
        padding: 45px $gutter 45px 0;
    }
    a {
        margin-bottom: 0;
        &:last-child {
            margin-right: 0;
        }
    }
}

@media (min-width: $desktop-small) {
    footer {
        width: percentage(7/12);
        justify-content: space-between;
        padding: 65px $gutter;
    }
}
</style>
