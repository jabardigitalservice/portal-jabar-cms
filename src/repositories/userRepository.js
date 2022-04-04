import Repository from './Repository';

const resource = '/users';

export default {
  /**
   * Get authenticated user data
   * @returns {Promise}
   */
  getUser() {
    return Repository.get(`${resource}/me`);
  },

  /**
   * Get User by ID
   * @param {string, number} id
   *
   * @returns {Promise}
   */
  getUserById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * Create user by invitation
   * @param {Object} body
   * @property {string} name
   * @property {string} occupation
   * @property {string} nip
   * @property {string} password
   * @property {string} token
   * @returns {Promise}
   */
  createUser(body) {
    return Repository.post(`${resource}/register`, body);
  },

  /**
   * Update user
   */
  updateUser(body) {
    return Repository.put(`${resource}/me`, body);
  },

  /**
   * Update user password
   *
   * @param {Object} body
   *
   * @property {string} current_password
   * @property {string} new_password
   */
  updateUserPassword(body) {
    return Repository.put(`${resource}/me/change-password`, body);
  },

  /**
   * Upgrade user role
   */
  requestUpgradeRole() {
    return Repository.put(`${resource}/me/account-submission`);
  },

  /**
   * Check if user nip exists
   * @param {string} nip
   * @returns {Promise}
   */
  checkUserNIP(nip) {
    return Repository.post(`${resource}/check-nip-exists`, { nip });
  },

  /**
   * Get member list
   *
   * @param {Object} params
   * @property {string, number} per_page
   * @property {string, number} page
   *
   * @returns {Promise}
   */
  getMemberList(params) {
    return Repository.get(`${resource}`, { params });
  },

  /**
   * Set user as admin
   * @param {string, number} id
   * @param {string} password
   * @returns {Promise}
   */
  setAdmin(id, password) {
    return Repository.put(`${resource}/${id}/set-as-admin`, { password });
  },
};
