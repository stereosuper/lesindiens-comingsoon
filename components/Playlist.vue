<template>
    <div class="playlist">
        <div class="disque">
            <div class="jaquette" :style="{ backgroundImage: `url(${jaquetteUrl})` }"></div>
            <svg class="progress" height="70" width="70">
                <circle
                    ref="circle"
                    class="progress-circle"
                    stroke-width="1"
                    stroke="white"
                    fill="transparent"
                    r="34"
                    cx="36"
                    cy="36"
                />
            </svg>
        </div>
        <div class="data">
            <span>{{ trackName }}</span>
            <span>{{ artistName }}</span>
            <div class="controls">
                <button class="track prev" @click="prevTrack">
                    <Icon name="backward" />
                </button>
                <button class="track next" @click="nextTrack">
                    <Icon name="backward" />
                </button>
                <button class="sound" @click="toggleMute">
                    <Icon v-show="mute" name="mute" />
                    <Icon v-show="!mute" name="sound" />
                </button>
            </div>
        </div>
        <audio ref="player" @timeupdate="timeUpdate" @ended="audioEnd">
            <source :src="trackUrl" />
            Your browser does not support the audio element.
        </audio>
    </div>
</template>
<script>
import { gsap } from 'gsap/all';
export default {
    data: () => ({
        mute: true,
        progress: 0,
        circum: 34 * 2 * Math.PI,
        tracks: null,
        current: 0,
        timeLeft: '00'
    }),
    computed: {
        dashOffset() {
            return this.circum - (this.progress / 100) * this.circum;
        },
        jaquetteUrl() {
            return this.tracks ? this.tracks[this.current].img.url : '';
        },
        trackName() {
            return this.tracks ? this.tracks[this.current].name : '';
        },
        albumName() {
            return this.tracks ? this.tracks[this.current].album : '';
        },
        artistName() {
            return this.tracks ? this.tracks[this.current].artist : '';
        },
        trackUrl() {
            return this.tracks ? this.tracks[this.current].url : '';
        }
    },

    watch: {
        trackUrl() {
            this.$refs.player.load();
            this.$refs.player.muted = this.mute;
            this.$refs.player.play();
        }
    },
    async created() {
        const res = await this.$axios.get('/.netlify/functions/getPlaylist');
        this.tracks = res.data.playlist.items;
        this.tracks = this.reduceTracks(this.tracks);
    },
    methods: {
        toggleMute() {
            this.mute = !this.mute;
            this.$refs.player.muted = this.mute;
        },
        audioEnd() {
            this.nextTrack();
        },
        timeUpdate() {
            if (!this.$refs.player) return;
            console.log('update');

            const duration = this.$refs.player.duration;
            const currentTime = this.$refs.player.currentTime;
            this.progress = (currentTime / duration) * 100;
            gsap.to(this.$refs.circle, {
                strokeDashoffset: this.dashOffset,
                duration: 0.5
            });
        },
        nextTrack() {
            console.log('next');

            this.progress = 0;
            // gsap.set(this.$refs.circle, {
            //     strokeDashoffset: this.dashOffset
            // });
            this.current = this.current === this.tracks.length - 1 ? 0 : this.current + 1;
        },
        prevTrack() {
            this.progress = 0;
            // gsap.set(this.$refs.circle, {
            //     strokeDashoffset: this.dashOffset
            // });
            this.current = this.current === 0 ? this.tracks.length - 1 : this.current - 1;
        },
        reduceTracks(tracks) {
            return tracks
                .reduce((acc, track) => {
                    const trk = {
                        url: track.track.preview_url,
                        name: track.track.name,
                        // COMBAK: see if need album or artist name
                        img: track.track.album.images[0],
                        album: track.track.album.name,
                        artist: track.track.artists[0].name
                    };
                    if (trk.url) acc.push(trk);
                    return acc;
                }, [])
                .sort(() => Math.random() - 0.5);
        }
    }
};
</script>
<style lang="scss" scoped>
.playlist {
    display: inline-flex;
    width: 100%;
    padding: 0 $gutter;
}
.disque {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    flex: 0 0 70px;
    margin-right: 10px;
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

.data {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
}

.jaquette {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;
    &::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 20px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $black;
    }
}

.time {
    margin-left: auto;
}

.controls {
    display: flex;
    align-items: center;
    margin-top: 10px;
    button {
        border: none;
    }
}

.sound {
    position: relative;
    width: 16px;
    height: 11px;
    margin-left: 20px;
    .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 16px;
        height: 11px;
        color: $white;
    }
}

.track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    .icon {
        width: 6px;
        height: 6px;
        color: #b3b3b3;
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
    }
    &.prev {
        margin-right: 8px;
    }
    &.next {
        .icon {
            transform: rotate(-180deg);
        }
    }
}

.progress {
    position: absolute;
    top: 1px;
    bottom: -1px;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: visible;
}
.progress-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;

    // 213.62830044410595 is the circumference of the circle (radius * 2 * PI)
    stroke-dasharray: 213.62830044410595 213.62830044410595;
    stroke-dashoffset: 213.62830044410595;
}

@media (min-width: $desktop-large) {
    .playlist {
        min-width: percentage(3/4);
    }
}
</style>
