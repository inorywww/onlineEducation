import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import ElementUI from 'element-ui';
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
