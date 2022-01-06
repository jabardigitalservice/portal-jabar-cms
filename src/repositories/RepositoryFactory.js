import authRepository from './authRepository';
import agendaRepository from './agendaRepository';

const repositories = {
  auth: authRepository,
  agenda: agendaRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
