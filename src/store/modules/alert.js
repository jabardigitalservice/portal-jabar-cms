export default {
  namespaced: true,
  state: {
    isOpen: false,
    variant: 'info',
    message: '',
  },
  getters: {
    open(state) {
      return state.isOpen;
    },
    message(state) {
      return state.message;
    },
    variant(state) {
      return state.variant;
    },
  },
  mutations: {
    SET_OPEN(state, payload) {
      state.isOpen = payload;
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_VARIANT(state, payload) {
      state.variant = payload;
    },
  },
  actions: {
    showAlert({ commit }, payload) {
      commit('SET_VARIANT', payload.variant);
      commit('SET_MESSAGE', payload.message);
      commit('SET_OPEN', true);
    },
    closeAlert({ commit }) {
      commit('SET_MESSAGE', '');
      commit('SET_VARIANT', 'info');
      commit('SET_OPEN', false);
    },
  },
};
