export default {
    bind: ({ alt, src }, binding, vnode) => {
        vnode.context.$store.commit('imageLoaded/addImage', {
            alt,
            src
        });
    },
    inserted: (el, binding, vnode) => {
        const imageIsLoaded = () => {
            console.log('yay event fired');

            vnode.context.$store.commit('imageLoaded/addLoadedImage', {
                alt: el.alt,
                src: el.src
            });
            el.removeEventListener('load', imageIsLoaded, false);
        };
        console.log('im putting the event');
        // el.addEventListener('load', imageIsLoaded, false);
        var img = new Image();
        img.addEventListener('load', imageIsLoaded, false);
        img.src = el.src;
        el.src = img.src;
    }
};
