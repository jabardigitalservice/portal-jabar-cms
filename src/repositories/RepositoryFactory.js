import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import areaRepository from './areaRepository';
import newsRepository from './newsRepository';
import mediaRepository from './mediaRepository';
import tagRepository from './tagRepository';
import userRepository from './userRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  area: areaRepository,
  news: newsRepository,
  media: mediaRepository,
  tag: tagRepository,
  user: userRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
