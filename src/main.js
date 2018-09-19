import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/css/common.css';
/*引入公共样式*/
import Vuex from 'vuex';
import stores from './store/store' ;
import {Button, Message} from 'element-ui';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

import "./assets/css/ionicons.min.css";

Vue.use(Button)

library.add(faSignOutAlt, brands);

Vue.component('font-awesome-icon', FontAwesomeIcon)
// 将 Message 直接挂在 Vue 实例上
Vue.prototype.$message = Message

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false
const store = new Vuex.Store(stores);
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
