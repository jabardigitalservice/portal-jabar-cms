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
};
