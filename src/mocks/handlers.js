/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

const handlers = [
  rest.get('/login', async (req, res, ctx) => res(ctx.status(200))),
];

export { handlers };
