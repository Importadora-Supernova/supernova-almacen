import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

//import templates
import LoginLayout from './layout/LoginLayout.vue'
import DashboardLayout from './layout/DashboardLayout.vue'

Vue.component('login-layout', LoginLayout);
Vue.component('dashboard-layout', DashboardLayout);

axios.defaults.baseURL = 'https://programacion.importadorasupernova.com';
axios.defaults.timeout = 100000;

new Vue({
    vuetify,
    router,
    axios,
    store,
    render: h => h(App)
}).$mount('#app')