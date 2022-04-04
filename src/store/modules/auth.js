import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import { getAllCookies, removeAllCookies, setCookies } from '@/common/helpers/cookies';

const authRepository = RepositoryFactory.get('auth');
const userRepository = RepositoryFactory.get('user');

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    permissions: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!(state.token && state.user);
    },
    user(state) {
      return state.user;
    },
    permissions(state) {
      return state.permissions;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
  },
  actions: {
    // Get user info and permissions
    async getUser({ dispatch }) {
      const token = getAllCookies();
      if (!Object.keys(token).length) return;

      try {
        const [userResponse, permissionsResponse] = await Promise.all([
          userRepository.getUser(),
          authRepository.getPermissions(),
        ]);

        const { data: user } = userResponse.data;
        const { permissions } = permissionsResponse.data.data;

        dispatch('setToken', token);
        dispatch('setUser', user);
        dispatch('setPermissions', permissions);
      } catch (error) {
        dispatch('setToken', null);
        dispatch('setUser', null);
        dispatch('setPermissions', []);
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
        dispatch('setPermissions', []);

        if (error.response) {
          throw error.response;
        }
        throw error;
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
      dispatch('setPermissions', []);
    },
    /**
     * Get new token
     * @param {Object} payload
     */
    async refreshToken({ dispatch }, payload) {
      try {
        const response = await authRepository.refreshToken(payload);
        setCookies(response.data);
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
    /**
     * Set user permissions
     * @param {Object} payload - The object contains user permissions
     */
    setPermissions({ commit }, payload) {
      commit('SET_PERMISSIONS', payload);
    },
  },
};
