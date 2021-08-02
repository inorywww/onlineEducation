import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);

import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

import Echarts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('v-chart',Echarts)

import 'hover.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/reset.scss';

Vue.use(ElementUI);
import api from './api'
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
    components: {
        App
    },
}).$mount('#app')
