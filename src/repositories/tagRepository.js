import Repository from './Repository';

const resource = '/tags';

export default {
  getTagSuggestions(params = {}) {
    return Repository.get(`${resource}`, { params });
  },
};
