export default {
    bind: ({ alt, src }, binding, vnode) => {
        vnode.context.$store.commit('imageLoaded/addImage', {
            alt,
            src
        });
    },
    inserted: (el, binding, vnode) => {
        const imageIsLoaded = () => {
            vnode.context.$store.commit('imageLoaded/addLoadedImage', {
                alt: el.alt,
                src: el.src
            });
            el.removeEventListener('load', imageIsLoaded, false);
        };
        el.addEventListener('load', imageIsLoaded, false);
    }
};
