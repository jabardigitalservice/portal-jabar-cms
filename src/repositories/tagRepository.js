import Repository from './Repository';

const resource = '/tags';

export default {
  /**
   * Get tag suggestions
   * @param {Object} params
   *
   * @property {string} q - filter suggestions by keyword
   *
   * @returns {Promise}
   */
  getTagSuggestions(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
