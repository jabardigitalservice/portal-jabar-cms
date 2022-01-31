import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import newsRepository from './newsRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  news: newsRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
