<template>
    <footer class="container">
        <div>
            <a target="_blank" rel="noopener nofollower" href="https://www.instagram.com/studio_lesindiens/">
                Instagram
            </a>
            <a target="_blank" rel="noopener nofollower" href="https://dribbble.com/lesindiens">
                Dribbble
            </a>
            <a target="_blank" rel="noopener nofollower" href="https://trustfolio.co/profil/les-indiens-GM1RnahBov">
                Trustfolio
            </a>
        </div>
        <a target="_blank" rel="noopener nofollower" href="mailto:hello@lesindiens.fr">hello@lesindiens.fr</a>
        <div class="contact">
            <a target="_blank" rel="noopener nofollower" href="telto:0780975135">07 80 97 51 35 </a>
            <span class="point">•</span>
            <a target="_blank" rel="noopener nofollower" href="https://goo.gl/maps/rKycM5jPCM2umRGe6">
                4, rue Voltaire — 44000 Nantes
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

.point {
    display: none;
}
@media (min-width: $tablet) {
    footer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 50px $gutter;
    }
    a {
        margin-bottom: 0;
        margin-right: 15px;
    }
    .contact {
        a {
            margin-right: 0;
        }
    }
    .point {
        display: inline-block;
        margin: 0 3px;
    }
}

@media (min-width: $desktop-small) {
    footer {
        position: fixed;
        top: 0;
        right: 40px;
        justify-content: space-between;
        align-items: center;
        width: calc((100% - 80px) * 9 / 12);
        height: $header-height;
        padding: 0 $gutter;
        background-color: $black;
        z-index: 10;
    }
}

@media (min-width: $desktop-large) {
    footer {
        right: 90px;
        width: calc((100% - 180px) * 7 / 12);
        height: $header-height-big;
    }
}

@media (min-width: $desktop-xxl) {
    footer {
        width: calc((100% - 180px) * 5 / 12);
        right: calc(((100% - 180px) * 3 / 12) + 90px);
    }
}
</style>
