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

  /**
   * Get News data by ID
   * @param {string, number} id
   *
   * @returns {Promise}
   */
  getNewsById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

  /**
   * Get news status counter
   * @returns {Promise}
   */
  getStatusCounter() {
    return Repository.get(`${resource}/tabs`);
  },

  /**
   * Update news status
   * @param {string, number} id
   * @param {Object} status
   *
   * @property {string} status - news status containing one of these values ['PUBLISHED', 'REVIEW', 'DRAFT', 'ARCHIVED']
   * @returns {Promise}
   */
  updateNewsStatus(id, status) {
    return Repository.patch(`${resource}/${id}/status`, status);
  },

  /** Create news
   * @param {Object} body
   *
   * @property {string} title
   * @property {string} excerpt
   * @property {string} content
   * @property {string} image
   * @property {string} category
   * @property {string} status
   * @property {string} start_date
   * @property {string} end_date
   * @property {Array} tags
   * @property {number} area_id
   *
   * @returns {Promise}
   */
  createNews(body) {
    return Repository.post(`${resource}`, body);
  },

  /**
   * Delete event by id
   * @param {string, number} id
   *
   * @returns {Promise}
   */
  deleteNews(id = null) {
    return Repository.delete(`${resource}/${id}`);
  },
};
