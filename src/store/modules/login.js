const state = {
  isUserLoggedIn: true,
}

const mutations = {
  LOGOUT(state, bool) {
    state.isUserLoggedIn = bool;
  }
}

const actions = {
}

export  default {
  state,
  mutations,
  actions
}


// WEBPACK FOOTER //
// ./src/store/modules/login.js