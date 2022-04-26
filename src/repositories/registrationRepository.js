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
  /**
   * Authorize invitation token
   * @param {string} token
   * @returns {Promise}
   */
  authorizeInvitationToken(token) {
    return Repository.post(`${resource}/authorize`, { token });
  },
};
