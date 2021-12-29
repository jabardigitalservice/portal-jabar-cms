import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import { getAllCookies, removeAllCookies, setCookies } from '../../lib/js-cookie';

const authRepository = RepositoryFactory.get('auth');

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    isAuthenticated(state) {
      return !!(state.token && state.user);
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async getUser({ dispatch }) {
      const token = getAllCookies();
      if (!Object.keys(token).length) return;

      try {
        const response = await authRepository.getUser();
        dispatch('setToken', token);
        dispatch('setUser', response.data.data);
      } catch (error) {
        dispatch('setToken', null);
        dispatch('setUser', null);
      }
    },
    /**
     * Logging user in
     * @param {Object} payload - The object contains email and password
     * @returns {Promise}
     */
    async login({ dispatch }, payload) {
      try {
        const response = await authRepository.login(payload);
        await Promise.all([
          setCookies(response.data),
          dispatch('setToken', response.data),
          dispatch('getUser', response.data),
        ]);
      } catch (error) {
        removeAllCookies();
        dispatch('setToken', null);
        dispatch('setUser', null);
        if (error.response?.status === 401) {
          throw new Error('Akun tidak dapat ditemukan.');
        }
        throw new Error('Terjadi kesalahan pada sistem.');
      }
    },
    /**
     * Clear all cookies
     * reset user and token
     */
    logout({ dispatch }) {
      removeAllCookies();
      dispatch('setToken', null);
      dispatch('setUser', null);
    },
    /**
     * Get new token
     * @param {Object} payload
     */
    async refreshToken({ dispatch }, payload) {
      try {
        const response = await authRepository.refreshToken(payload);
        setCookies(response.data);
        dispatch('setToken', response.data);
        dispatch('setUser', response.data);
        return response;
      } catch (error) {
        removeAllCookies();
        dispatch('setToken', null);
        dispatch('setUser', null);
        throw new Error(error);
      }
    },
    /**
     * Set user data
     * @param {Object} payload - The object contains user data obtained from the api's response
     */
    setUser({ commit }, payload) {
      commit('SET_USER', payload);
    },
    /**
     * Set token
     * @param {Object} payload - The object contains access token, refresh token and expiration
     */
    setToken({ commit }, payload) {
      commit('SET_TOKEN', payload);
    },
  },
};
