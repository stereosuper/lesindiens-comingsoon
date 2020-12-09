<template>
    <div class="player">
        <div class="disque">
            <div ref="jaquette" class="jaquettes">
                <div class="jaquette" :style="{ backgroundImage: `url(${jaquetteUrl})` }"></div>
            </div>
        </div>
        <div class="info">
            <h1>{{ track.name }}</h1>
            <h2>{{ track.artists[0].name }}</h2>
        </div>

        <div class="controls">
            <button aria-label="Reload musique" class="track prev" @click="reload">
                <Icon name="backward" />
            </button>
            <button aria-label="Play / Pause" class="track" @click="togglePlay">
                <Icon v-show="playing" name="pause" />
                <Icon v-show="!playing" name="play" />
            </button>
        </div>
        <div class="timer">
            {{ displayTime }}
        </div>
        <audio ref="player" :src="trackUrl" @ended="audioEnd" @canplay="readyToPlay"></audio>
    </div>
</template>
<script>
export default {
    props: {
        track: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        playing: false,
        ready: false,
        time: 0,
        rafTime: null
    }),
    computed: {
        trackName() {
            return this.track ? this.track.name : '';
        },
        trackUrl() {
            return this.track ? this.track.preview_url : '';
        },
        artistName() {
            return this.track ? this.track.artist : '';
        },
        jaquetteUrl() {
            return this.track ? this.track.album.images[0].url : '';
        },
        displayTime() {
            return this.time.toFixed(2);
        }
    },
    methods: {
        audioEnd() {
            this.reload();
        },
        timeUpdate() {
            this.time = this.$refs.player.currentTime;
        },
        reload() {
            this.$refs.player.pause();
            this.$refs.player.currentTime = 0;
            this.playing = false;
            this.time = 0;
        },
        readyToPlay() {
            if (this.trackUrl === '' || !this.$refs.player) return;
            if (!this.ready) this.ready = true;
        },
        togglePlay() {
            if (!this.ready) return;
            if (this.playing) {
                this.$refs.player.pause();
                this.playing = false;
                this.stopTimer();
            } else {
                this.$refs.player.play();
                this.playing = true;
                this.launchTimer();
            }
        },
        stopTimer() {
            cancelAnimationFrame(this.rafTime);
            this.rafTime = null;
        },
        launchTimer() {
            this.rafTime = requestAnimationFrame(this.updateTime);
        },
        updateTime() {
            if (!this.rafTime) return;
            this.time = this.$refs.player.currentTime;
            requestAnimationFrame(this.updateTime);
        }
    }
};
</script>
<style lang="scss" scoped>
h1 {
    text-align: center;
    font-size: 3rem;
}
h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 30px;
}
.player {
    margin-bottom: 60px;
}

button {
    &:focus {
        outline: none;
    }
}

.timer {
    text-align: center;
    margin-top: 50px;
    font-size: 3rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}
.disque {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 170px;
    flex: 0 0 170px;
    margin: 0 auto 30px;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 50%;
        border: 1px solid #323336;
    }
}
.jaquettes {
    position: relative;
    width: 150px;
    height: 150px;
    &::after {
        content: '';
        position: absolute;
        top: 60px;
        left: 60px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: $black;
        z-index: 4;
    }
}

.jaquette {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;
    z-index: 2;
    &.next-jaquette {
        opacity: 0;
        z-index: 1;
    }
}

.time {
    margin-left: auto;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    button {
        border: none;
    }
}

.track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    margin: 0 20px;
    .icon {
        width: 20px;
        height: 20px;
        color: #b3b3b3;
        &.icon-play {
            position: relative;
            left: 3px;
        }
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 50%;
        background-color: #323336;
        z-index: -1;
        transition: background-color 0.2s ease-in-out;
    }
    &:hover,
    &:focus {
        &::after {
            background-color: #44464a;
        }
    }
}
</style>
