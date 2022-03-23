import Repository from './Repository';

const resource = '/registration-invitations';

export default {
  /**
   * Create invitation
   * @param {Object} body
   * @property {string} email
   * @returns {Promise}
   */
  createInvitation(body) {
    return Repository.post(`${resource}`, body);
  },
};
