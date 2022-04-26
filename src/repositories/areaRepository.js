import Repository from './Repository';

const resource = '/areas';

export default {
  /**
   * Get areas
   * @param {Object} params
   *
   * @property {string} q - filter area by keyword
   * @property {string} depth - area depth
   * @property {string} parent_code_kemendagri - kemendagri code
   * @property {number, string} per_page - how many data to show
   *
   * @returns {Promise}
   */
  getAreas(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
