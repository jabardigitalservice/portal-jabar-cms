import Repository from './Repository';

const resource = '/registration-invitations';

export default {
  /**
   * Authorize invitation token
   * @param {string} token
   * @returns {Promise}
   */
  authorizeInvitationToken(token) {
    return Repository.post(`${resource}/authorize`, { token });
  },
};
