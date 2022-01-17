export default {
  namespaced: true,
  state: {
    isOpen: false,
    type: 'info',
    message: '',
  },
  getters: {
    open(state) {
      return state.isOpen;
    },
    message(state) {
      return state.message;
    },
    type(state) {
      return state.type;
    },
  },
  mutations: {
    SET_OPEN(state, payload) {
      state.isOpen = payload;
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_type(state, payload) {
      state.type = payload;
    },
  },
  actions: {
    showAlert({ commit }, payload) {
      commit('SET_type', payload.type);
      commit('SET_MESSAGE', payload.message);
      commit('SET_OPEN', true);
    },
    closeAlert({ commit }) {
      commit('SET_MESSAGE', '');
      commit('SET_type', 'info');
      commit('SET_OPEN', false);
    },
  },
};
