import authRepository from './authRepository';
import agendaRepository from './agendaRepository';
import mediaRepository from './mediaRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
  media: mediaRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
