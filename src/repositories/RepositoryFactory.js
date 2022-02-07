import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import newsRepository from './newsRepository';
import mediaRepository from './mediaRepository';
import tagRepository from './tagRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  news: newsRepository,
  media: mediaRepository,
  tag: tagRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
