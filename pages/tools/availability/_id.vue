<template>
    <div class="wrap">
        <div v-if="loading">
            <h1>
                Je cherche ...
            </h1>
        </div>
        <div v-if="playlist" class="result">
            <h1>{{ playlist.name }}</h1>
            <h3>{{ playlist.description }}</h3>
            <div class="tracks">
                <div v-if="tracksWithoutPreview">
                    <h2>
                        Chansons sans preview ❌
                    </h2>
                    <div v-for="t in tracksWithoutPreview" :key="t.track.name" class="song">
                        {{ `${t.track.artists[0].name} - ${t.track.name}` }}
                    </div>
                </div>
                <div v-if="tracksWithPreview">
                    <h2>
                        Chansons avec preview ✅
                    </h2>
                    <div v-for="t in tracksWithPreview" :key="t.track.name" class="song">
                        {{ `${t.track.artists[0].name} - ${t.track.name}` }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="notFound">
            <h1>
                La playlist n'existe pas, vérifie si l'URI est bon !
            </h1>
        </div>
        <nuxt-link v-if="!loading" to="/tools" class="button">
            Back to tools
        </nuxt-link>
    </div>
</template>

<script>
export default {
    layout: 'empty',
    data: () => ({
        loading: true,
        playlist: null,
        notFound: false,
        tracks: null
    }),
    computed: {
        tracksWithoutPreview() {
            if (!this.tracks) return null;
            return this.tracks.filter(t => !t.track.preview_url);
        },
        tracksWithPreview() {
            if (!this.tracks) return null;
            return this.tracks.filter(t => t.track.preview_url);
        }
    },
    async created() {
        const id = this.$route.params.id.split(':')[2];
        await this.$axios
            .post('/.netlify/functions/getPlaylistById', {
                id
            })
            .then(res => {
                this.playlist = res.data.playlist;
                this.tracks = this.playlist.tracks.items;
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
    justify-content: center;
    min-height: 100vh;
    padding: 120px;
}
.button {
    font-size: 2rem;
    color: $black;
    background-color: $white;
    border: none;
    align-self: center;
    padding: 15px 25px;
    border-radius: 3px;
    margin: 30px;
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
.tracks {
    width: 100%;
    display: flex;
    justify-content: space-around;
    > div {
        width: 40%;
    }
}
</style>
