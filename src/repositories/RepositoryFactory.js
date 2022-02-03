import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import newsRepository from './newsRepository';
import mediaRepository from './mediaRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  news: newsRepository,
  media: mediaRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
