import Repository from './Repository';

const resource = '/news';

export default {

  /**
   * Get news data
   * @param {object} params
   *
   * @property {string} start_date - filter news by start date
   * @property {string} end_date - filter news by end date
   * @property {number, string} per_page - how many news data to show
   * @property {number, string} page - filter news by page number
   * @property {string} type - filter news by type
   * @property {string} sort_by - sort news by property
   * @property {string} sort_order - sort order ['asc', 'desc']
   * @property {string} cat - filter news by category
   *
   * @returns {Promise}
   */
  getNews(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
