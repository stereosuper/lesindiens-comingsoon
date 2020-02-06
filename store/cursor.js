export const state = () => ({
    hasMouse: false,
    showCursor: false,
    mousePos: {
        x: 0,
        y: 0
    },
    iconDirection: 'left'
});

// export const getters = () => {};

export const mutations = {
    setHasMouse(state, hasMouse) {
        state.hasMouse = hasMouse;
    },
    setShowCursor(state, showCursor) {
        state.showCursor = showCursor;
    },
    setMousePos(state, mousePos) {
        state.mousePos = mousePos;
    },
    setIconDirection(state, iconDirection) {
        state.iconDirection = iconDirection;
    }
};
