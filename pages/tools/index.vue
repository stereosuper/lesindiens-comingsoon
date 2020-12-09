<template>
    <div class="page">
        <div class="tools">
            <div class="tool">
                <h3>Availability test</h3>
                <p>Test to check if the songs in a playlist are available to preview during 30s</p>
                <input
                    v-model="playlistId"
                    type="text"
                    placeholder="Put here your playlist URI (ex: spotify:playlist:1lMang7eAN5NJs2qoq8bYk)"
                />
                <button
                    @click="
                        $router.push({
                            path: `/tools/availability/${playlistId}`
                        })
                    "
                >
                    Goooo
                </button>
            </div>
            <div class="tool">
                <h3>Preview a song</h3>
                <p>Listen to the 30s preview of a song. With a timer so you can track the lyrics</p>
                <input
                    v-model="songId"
                    type="text"
                    placeholder="Put here your song URI (ex: spotify:track:5My9zq8mVvDvnAzmYHfwBv)"
                />
                <button
                    @click="
                        $router.push({
                            path: `/tools/preview/${songId}`
                        })
                    "
                >
                    Goooo
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'empty',
    data: () => ({
        songId: null,
        playlistId: null
    })
};
</script>

<style lang="scss" scoped>
.tools {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.tool {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 80px 0;
}
h3 {
    font-size: 5rem;
    text-align: center;
}
input {
    height: 65px;
    border: 1px solid $white;
    padding: 25px;
    color: $white;
    border-radius: 5px;
    margin-bottom: 30px;
    margin-top: 30px;
    font-size: 2rem;
    &::placeholder {
        color: rgba($white, 0.6);
    }
    &:focus {
        outline: none;
    }
}
button {
    font-size: 2rem;
    color: $black;
    background-color: $white;
    border: none;
    align-self: center;
    padding: 15px 25px;
    border-radius: 3px;
    &:hover {
        background-color: rgba($white, 0.9);
    }
}
p {
    text-align: center;
    max-width: 390px;
    align-self: center;
    font-size: 1.8rem;
}
</style>
