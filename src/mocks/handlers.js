/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

const BASE_URL = process.env.VUE_APP_API_URL;

const handlers = [
  rest.post(`${BASE_URL}/v1/auth/login`, (req, res, ctx) => res(
    ctx.status(401),
  )),

  // rest.post(`${BASE_URL}/v1/auth/login`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     access_token: 'asdasdasd',
  //     refresh_token: '123123123',
  //     exp: '123123',
  //   }),
  // )),

  // rest.get(`${BASE_URL}/v1/auth/me`, (req, res, ctx) => res(
  //   ctx.status(200),
  //   ctx.json({
  //     data: {
  //       id: '121212',
  //       username: 'bangun',
  //     },
  //   }),
  // )),
];

export { handlers };
