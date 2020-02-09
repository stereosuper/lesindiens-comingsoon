import Vue from 'vue';
import Icon from '~/components/Layout/Icon';
import imageLoaded from '~/plugins/directives/imageLoaded';
// NOTE: Here's how to import superComponents
import { useSacVue, useSuperWindowVue } from '@stereorepo/sac';

Vue.prototype.$stereosuper = {
    ...Vue.prototype.$stereosuper,
    namespace: 'stereosuper'
};

const isDevEnv = process.env.NODE_ENV !== 'production';
Vue.config.performance = isDevEnv;

// Set Vue.use here
// NOTE: Here's an example of how to use superComponents like superWindowVue
Vue.use(useSacVue);
Vue.use(useSuperWindowVue);

Vue.directive('imageLoaded', imageLoaded);

// Set Vue.component here
Vue.component('Icon', Icon);
