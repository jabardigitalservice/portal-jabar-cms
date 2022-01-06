import Repository from './Repository';

const resource = '/events';

export default {

  /**
   * Get events data
   * @param {object} params
   *
   * @property {string} start_date - filter events by start date
   * @property {string} end_date - filter events by end date
   * @property {number, string} per_page - how many events data to show
   * @property {number, string} page - filter events by page number
   *
   * @returns {Promise}
   */
  getEvents(params = {}) {
    return Repository.get(`${resource}`, { params });
  },

  /**
   * Get event data by event ID
   * @param {number, string} id - ID of the event data
   *
   * @returns {Promise}
   */
  getEventsById(id = null) {
    return Repository.get(`${resource}/${id}`);
  },

};
