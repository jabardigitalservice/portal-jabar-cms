import Repository from './Repository';

const resource = '/template';

export default {
  /**
   * Get account submission template
   * @returns {Promise}
   */
  getAccountSubmissionTemplate() {
    return Repository.get(`${resource}/account-submission`);
  },
};
