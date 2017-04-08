/**
 * store of vuex
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import route from './modules/module-route'

// use modules
const store = new Vuex.Store({
    modules: {
        route
    }
})

export default store