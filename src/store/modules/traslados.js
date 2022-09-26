import axios from 'axios'

export default {

    namespaced: true,

    state: {
        Traslados: [],
        loading: false,
        error: false,
    },
    mutations: {

        setData(state, data) {
            state.Traslados = data
        },

        setError(state) {
            state.error = true
            state.Data = []
        },

    },
    actions: {

        async getDataTraslados({ commit }) {
            try {

                const response = await axios.get('api/traslados', {
                    headers: {
                        'Bearer': sessionStorage.getItem('token')
                    }
                });

                if (response.status == 200) {
                    commit('setData', response.data)
                }

            } catch (e) {
                commit('setError')
            }
        }

    },
    getters: {

    }

}