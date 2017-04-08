/**
 * entry
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// admin-lte
import 'bootstrap'
import 'admin-lte/bootstrap/css/bootstrap.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'admin-lte/dist/js/app'
import './libs/ionicons-2.0.1/scss/ionicons.scss'
import 'font-awesome/scss/font-awesome.scss'

// vue vuex vue-route
Vue.use(VueRouter)
import routes from './routes'
const router = new VueRouter({routes})
import store from './vuex/store'

router.afterEach(to => {
    store.dispatch('setRoute', to)
})

import App from './components/app/app.vue'

// start app
new Vue({
    el: '.app',
    render: (h) => h(App),
    router,
    store
})



