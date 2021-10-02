
const state = {
    user: null,
    authStatus: false,
    apollo_token: null,
    token: localStorage.getItem("apollo-token") || null
};

const getters = {
    user: state => state.user,
    isAuth: state => !!state.user,
    authStatus: state => !!state.user,
};

const actions = {
    async login({ commit }, token) {
        commit('SET_TOKEN', token);
        await localStorage.setItem('apollo-token', "Bearer " + token)
        window.location.reload()

    },
    async currentUser({ commit }, userDetails) {
        await commit('CURRENT_USER', userDetails);
        await localStorage.setItem('user', !!userDetails)
    },

    logout({ commit }) {
        commit('LOGOUT');
        localStorage.clear()
        sessionStorage.clear()
        localStorage.setItem('user', false)
        window.location.reload()

    }
};
const mutations = {
    CURRENT_USER(state, payload) {
        state.user = payload
        state.authStatus = true;
        // console.log(state.user)
    },
    SET_TOKEN(state, payload) {
        state.token = payload;
    },

    LOGOUT(state) {
        state.user = {};
        state.authStatus = false;
        state.token = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}