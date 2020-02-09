export const state = () => ({
    allImages: [],
    allLoadedImages: []
});

export const getters = {
    areAllImagesLoaded: state => {
        return state.allLoadedImages.length === state.allImages.length;
    }
};

export const mutations = {
    addLoadedImage(state, image) {
        state.allLoadedImages.push(image);
    },
    addImage(state, image) {
        state.allImages.push(image);
    }
};

// export const actions = {};
