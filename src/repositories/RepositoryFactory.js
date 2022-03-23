import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import areaRepository from './areaRepository';
import newsRepository from './newsRepository';
import mediaRepository from './mediaRepository';
import tagRepository from './tagRepository';
import registrationRepository from './registrationRepository';
import userRepository from './userRepository';
import registrationRepository from './registrationRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  area: areaRepository,
  news: newsRepository,
  media: mediaRepository,
  tag: tagRepository,
  registration: registrationRepository,
  user: userRepository,
  registration: registrationRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
