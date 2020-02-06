export const state = () => ({
    loading: true,
    hasMouse: false
});

// export const getters = () => {};

export const mutations = {
    setLoading(state, loading) {
        state.loading = loading;
    },
    setHasMouse(state, hasMouse) {
        state.hasMouse = hasMouse;
    }
};

// export const actions = {};
