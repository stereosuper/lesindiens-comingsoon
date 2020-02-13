<template>
    <div class="error">
        <div>
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.icon-arrow {
    width: 20px;
    height: 9px;
}
</style>
