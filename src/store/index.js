import Vue from 'vue'
import Vuex from 'vuex'

//modules
import overlay from './modules/Overlay'
import modalAlert from './modules/ModalAlert'
import traslados from './modules/traslados'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        overlay,
        modalAlert,
        traslados,
        login
    },

    state: {

    },
    mutations: {



    },
    actions: {



    },
    getters: {

    }
})