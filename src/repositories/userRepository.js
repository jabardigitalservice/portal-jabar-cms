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
};
