<template>
    <div class="wrap">
        <div v-if="loading">
            <h1>
                Je cherche ...
            </h1>
        </div>
        <nuxt-link v-if="!loading" to="/tools" class="button backto">
            Back to tools
        </nuxt-link>
        <div v-if="track" class="result">
            <Player :track="track" />
        </div>
        <div v-if="notFound">
            <h1>
                La chanson n'existe pas, vérifie si l'URI est bon !
            </h1>
        </div>
    </div>
</template>

<script>
import Player from '~/components/Player';
export default {
    components: {
        Player
    },
    layout: 'empty',
    data: () => ({
        loading: true,
        track: null,
        notFound: false
    }),
    async created() {
        const id = this.$route.params.id.split(':')[2];
        await this.$axios
            .post('/.netlify/functions/getTrackById', {
                id
            })
            .then(res => {
                this.track = res.data.track;
                this.loading = false;
            })
            .catch(err => {
                this.notFound = true;
                this.loading = false;
            });
    }
};
</script>
<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 25px 120px;
}
.button {
    font-size: 2rem;
    color: $black;
    background-color: $white;
    border: none;
    align-self: center;
    padding: 15px 25px;
    border-radius: 3px;
    margin: 0 30px;
    &:hover {
        background-color: rgba($white, 0.9);
    }
}
h1 {
    text-align: center;
    font-size: 5rem;
}
h2 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 30px;
    margin-top: 30px;
}
h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
}
.song {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 10px;
}
.result {
    flex-grow: 1;
    display: flex;
    align-items: center;
}
.tracks {
    width: 100%;
    display: flex;
    justify-content: space-around;
    > div {
        width: 40%;
    }
}
</style>
