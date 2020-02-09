import slides from '~/static/slides/slides.json';

export const state = () => ({
    loading: true,
    slides: slides.slides,
    timerSlide: 6000,
    tracks: null
});

export const getters = {
    getTracks: state => {
        return state.tracks
            ? state.tracks
                  .reduce((acc, track) => {
                      const trk = {
                          url: track.track.preview_url,
                          name: track.track.name,
                          img: track.track.album.images[0],
                          artist: track.track.artists[0].name
                      };
                      if (trk.url) {
                          acc.push(trk);
                      } else {
                          //   console.log('NO PREVIEW URL:', trk.artist, '-', trk.name);
                      }
                      return acc;
                  }, [])
                  .sort(() => Math.random() - 0.5)
            : null;
    }
};

export const mutations = {
    setLoading(state, loading) {
        state.loading = loading;
    },
    setTracks(state, tracks) {
        state.tracks = tracks;
    }
};

// export const actions = {};
