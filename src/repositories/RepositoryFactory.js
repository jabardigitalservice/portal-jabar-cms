import authRepository from './authRepository';

const repositories = {
  auth: authRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
