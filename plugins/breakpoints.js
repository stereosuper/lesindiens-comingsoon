import Vue from 'vue';

const BREAKPOINTS = {
    xs: 400,
    s: 580,
    m: 768,
    l: 960,
    xl: 1100,
    large: 1280,
    xxl: Infinity
};

const init = function({ list = BREAKPOINTS, defaultBreakpoint = 'xxl' } = {}) {
    Vue.prototype.$breakpoints = {
        list,
        defaultBreakpoint: list[defaultBreakpoint]
    };
    return Vue.prototype.$breakpoints.defaultBreakpoint;
};

const defaultBreakpoint = init();

export { defaultBreakpoint };
