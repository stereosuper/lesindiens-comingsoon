<template>
    <div class="playlist" :class="{ show: ready }">
        <div class="disque">
            <div ref="jaquette" class="jaquettes">
                <div class="jaquette" :style="{ backgroundImage: `url(${jaquetteUrl})` }"></div>
                <div
                    ref="nextJaquette"
                    class="jaquette next-jaquette"
                    :style="{ backgroundImage: `url(${nextJaquetteUrl})` }"
                ></div>
            </div>
            <svg class="progress" height="70" width="70">
                <circle
                    ref="circle"
                    class="progress-circle"
                    stroke-width="1"
                    stroke="white"
                    fill="transparent"
                    transform="matrix(0,-1,1,0,0,70)"
                    r="34"
                    cx="36"
                    cy="36"
                />
            </svg>
        </div>
        <div class="data">
            <span ref="name" class="name">{{ trackName }}</span>
            <span ref="artist" class="artist">{{ artistName }}</span>
            <div class="controls">
                <button aria-label="Précédente musique" class="track prev" @click="nextTrack(-1)">
                    <Icon name="backward" />
                </button>
                <button aria-label="Prochaine musique" class="track next" @click="nextTrack(1)">
                    <Icon name="backward" />
                </button>
                <button aria-label="Son allumé ou muet" class="sound" @click="toggleMute">
                    <Icon v-show="mute" name="mute" />
                    <Icon v-show="!mute" name="sound" />
                </button>
            </div>
        </div>
        <audio
            ref="player"
            :muted="mute"
            :src="trackUrl"
            @timeupdate="timeUpdate"
            @ended="audioEnd"
            @canplay="readyToPlay"
        ></audio>
    </div>
</template>
<script>
import { gsap } from 'gsap';
export default {
    data: () => ({
        mute: true,
        progress: 0,
        circum: 34 * 2 * Math.PI,
        current: 0,
        fake: false,
        fakeTween: null,
        skeudTween: null,
        currentRotation: 0,
        stoped: true,
        ready: false,
        trackUrl: '',
        jaquetteUrl: '',
        nextJaquetteUrl: ''
    }),
    computed: {
        dashOffset() {
            return this.circum - (this.progress / 100) * this.circum;
        },
        trackName() {
            return this.tracks ? this.tracks[this.current].name : '';
        },
        artistName() {
            return this.tracks ? this.tracks[this.current].artist : '';
        },
        tracks() {
            return this.$store.getters.getTracks;
        },
        isL() {
            if (!this.$store.state.superWindow) return false;
            return this.$store.state.superWindow.width >= this.$breakpoints.list.l;
        }
    },

    watch: {
        isL(l) {
            if (!l) {
                this.ready = false;
            }
        },
        dashOffset(d) {
            gsap.to(this.$refs.circle, {
                strokeDashoffset: d,
                duration: 0.5
            });
        },
        trackUrl() {
            this.stoped = false;
            this.$refs.player.muted = this.mute;
        }
    },
    mounted() {
        this.initPlaylist();
    },
    methods: {
        initPlaylist() {
            this.jaquetteUrl = this.tracks[this.current].img.url;
            this.trackUrl = this.tracks[this.current].url;
        },
        letsFakeIt() {
            this.fake = true;
            this.fakeLoop();
            this.launchSkeud();
        },
        fakeLoop() {
            this.fakeTween = gsap.to(this, {
                duration: 30,
                progress: 100,
                ease: 'none',
                onComplete: () => {
                    this.nextTrack(1);
                }
            });
        },
        stopTheFake() {
            this.fake = false;
            this.currentRotation = gsap.getProperty(this.$refs.jaquette, 'rotation');
            this.fakeTween.kill();
            this.$refs.player.currentTime = (this.$refs.player.duration * this.progress) / 100;
            this.$refs.player.play();
        },
        readyToPlay() {
            if (this.trackUrl === '' || !this.$refs.player) return;
            let playPromise = this.$refs.player.play() || Promise.reject('');
            playPromise
                .then(() => {
                    if (!this.ready) this.ready = true;
                    if (this.fake) this.fake = false;
                    this.launchSkeud();
                })
                .catch(() => {
                    this.$refs.player.muted = true;
                    // Video couldn't be autoplayed because of autoplay policy. Mute it and play.
                    playPromise = this.$refs.player.play() || Promise.reject('');
                    playPromise.catch(e => {
                        if (!this.ready) this.ready = true;
                        this.letsFakeIt();
                    });
                });
        },
        launchSkeud() {
            if (this.skeudTween) this.skeudTween.kill();
            this.skeudTween = gsap.fromTo(
                this.$refs.jaquette,
                {
                    rotation: this.currentRotation
                },
                {
                    duration: this.$refs.player.duration,
                    rotation: 1800,
                    ease: 'none'
                }
            );
            this.currentRotation = 0;
        },
        toggleMute() {
            if (this.fake) this.stopTheFake();
            this.mute = !this.mute;
            this.$refs.player.muted = this.mute;
        },
        audioEnd() {
            this.nextTrack(1);
        },
        timeUpdate() {
            if (!this.$refs.player || this.fake || this.stoped) return;
            const duration = this.$refs.player.duration;
            const currentTime = this.$refs.player.currentTime;
            this.progress = (currentTime / duration) * 100;
        },
        getNextIndex(dir) {
            if (dir > 0) {
                return this.current === this.tracks.length - 1 ? 0 : this.current + 1;
            } else {
                return this.current === 0 ? this.tracks.length - 1 : this.current - 1;
            }
        },
        nextTrack(direction) {
            if (this.transitionning) return;
            this.transitionning = true;
            gsap.set(this.$refs.nextJaquette, {
                opacity: 0,
                zIndex: '1'
            });
            this.stoped = true;
            this.$refs.player.pause();
            if (this.skeudTween) this.skeudTween.kill();
            if (this.fake) this.fakeTween.kill();
            this.progress = 0;

            const nextCurrent = this.getNextIndex(direction);

            this.nextJaquetteUrl = this.tracks[nextCurrent].img.url;

            const rotationToRemove = (gsap.getProperty(this.$refs.jaquette, 'rotation') % 360) + 360;

            const tlDisappear = new gsap.timeline({
                onComplete: () => {
                    this.transitionning = false;
                }
            });

            tlDisappear
                .set(
                    this.$refs.nextJaquette,
                    {
                        zIndex: '3'
                    },
                    'begin'
                )
                .to(
                    this.$refs.nextJaquette,
                    {
                        duration: 0.3,
                        opacity: 1
                    },
                    'begin'
                )
                .to(
                    this.$refs.jaquette,
                    {
                        duration: 0.5,
                        rotation: `-=${rotationToRemove}`,
                        onComplete: () => {}
                    },
                    'begin'
                )
                .to(
                    [this.$refs.artist, this.$refs.name],
                    {
                        duration: 0.5,
                        stagger: 0.1,
                        y: 10,
                        opacity: 0,
                        ease: 'power3.out'
                    },
                    'begin'
                )
                .add(() => {
                    this.current = nextCurrent;
                    this.jaquetteUrl = this.tracks[nextCurrent].img.url;
                    this.trackUrl = this.tracks[this.current].url;
                }, 'end')
                .to(
                    [this.$refs.artist, this.$refs.name],
                    {
                        duration: 0.5,
                        stagger: 0.1,
                        y: 0,
                        opacity: 1,
                        ease: 'power3.out'
                    },
                    'end'
                );
        }
    }
};
</script>
<style lang="scss" scoped>
button {
    &:focus {
        outline: none;
    }
}
.playlist {
    display: inline-flex;
    width: 100%;
    padding: 0 $gutter;
    opacity: 0;
    transition: opacity 1s $ease-out-timing-function;
    &.show {
        opacity: 1;
    }
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
    overflow: hidden;
    > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.jaquettes {
    position: relative;
    width: 50px;
    height: 50px;
    &::after {
        content: '';
        position: absolute;
        top: 20px;
        left: 20px;
        width: 10px;
        height: 10px;
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
    transition: opacity 0.3s ease-in-out;
    .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 16px;
        height: 11px;
        color: $white;
    }
    &:hover,
    &:focus {
        opacity: 0.7;
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
        transition: background-color 0.2s ease-in-out;
    }
    &.prev {
        margin-right: 8px;
    }
    &.next {
        .icon {
            transform: rotate(-180deg);
        }
    }
    &:hover,
    &:focus {
        &::after {
            background-color: #44464a;
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

.artist {
    color: #787878;
}

@media (min-width: $desktop-large) {
    .playlist {
        width: percentage(3/4);
    }
}
</style>
