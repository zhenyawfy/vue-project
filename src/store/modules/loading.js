const state = {
    mainLoading: false, // 内容区最外层loading
    tableLoading: false, // 请求列表loading
    detailTabsLoading: false, // 详情tab栏切换
    modelLoading: false, // 弹窗内部loading
    loginLoading: false, // 登录loading
}

const mutations = {
    SET_LOADING(state, data) {
        state[data.key] = data.value;
    },
    CLOSE_LOADING(state) {
        let loadingKey = '';
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                const element = state[key];
                if (element) {
                    loadingKey = key;
                    break;
                }
            }
        }
        // loading 状态只有一个，找到并干掉， 没有就算了
        if (loadingKey) {
            state[loadingKey] = false;
        }
    }
}

const actions = {
    // 设置内容区loading
    setMainLoading({ commit }, loading) {
        commit('SET_LOADING', {key: 'mainLoading', value: loading})
    },
    // 设置请求表格loading
    setTableLoading({ commit }, loading) {
        commit('SET_LOADING', {key: 'tableLoading', value: loading})
    },
    // 详情tabs栏切换
    setDetailTabsLoading({ commit }, loading) {
        commit('SET_LOADING', {key: 'detailTabsLoading', value: loading})
    },
    // 弹窗内部loading
    setModelLoading({ commit }, loading){
        commit('SET_LOADING', {key: 'modelLoading', value: loading})
    },
    // 登录loading
    setLoginLoading({ commit }, loading) {
        commit('SET_LOADING', {key: 'loginLoading', value: loading})
    }
}

export default {
    state,
    mutations,
    actions
}


// WEBPACK FOOTER //
// ./src/store/modules/loading.js