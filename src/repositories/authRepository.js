import Repository from './Repository';

const resource = '/auth';

export default {
  /**
   * Login with email and password
   * @param {Object} payload
   * @returns {Promise}
   */
  login(payload) {
    return Repository.post(`${resource}/login`, payload);
  },
  /**
   * Get new token
   * @param {Object} payload
   * @returns {Promise}
   */
  refreshToken(payload) {
    return Repository.post(`${resource}/refresh`, payload);
  },
};
