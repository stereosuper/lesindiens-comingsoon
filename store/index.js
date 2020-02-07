import slides from '~/static/slides/slides.json';

export const state = () => ({
    loading: true,
    slides: slides.slides,
    timerSlide: 6000
});

// export const getters = () => {};

export const mutations = {
    setLoading(state, loading) {
        state.loading = loading;
    }
};

// export const actions = {};
