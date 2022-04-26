import Repository from './Repository';

const resource = '/media';

export default {
  /**
   * Upload media
   * @param {Object} formData
   * @returns {Promise}
   */
  uploadMedia(formData) {
    return Repository.post(`${resource}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
