import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';
import login from './modules/login';
// 页面loading
import loading from './modules/loading';
// 权限
// import authority from './modules/authority';

Vue.use(Vuex);

const router = new Vuex.Store({
    modules: {
        loading,
        login
    },
    getters,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage, // vuex内存持久化 ---sessionStorage
            reducer (val) {
                if(val.login.isUserLoggedIn === false) { // return empty state when user logged out
                    return ""
                }
                return val
            }
        })
    ]
});

export default router;



// WEBPACK FOOTER //
// ./src/store/index.js