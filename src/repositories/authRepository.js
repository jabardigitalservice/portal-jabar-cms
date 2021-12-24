import Repository from './Repository';

const resource = '/auth';

export default {
  /**
   * Get authenticated user data
   * @returns {Promise}
   */
  getUser() {
    return Repository.get(`${resource}/me`);
  },
  /**
   * Login with email and password
   * @param {Object} payload
   * @returns {Promise}
   */
  login(payload) {
    return Repository.post(`${resource}/login`, payload);
  },
};
