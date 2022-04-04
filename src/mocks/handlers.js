/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';

const BASE_URL = process.env.VUE_APP_API_URL;

const handlers = [
  // rest.post(`${BASE_URL}/v1/auth/login`, (req, res, ctx) => res(
  //   ctx.status(401),
  //   ctx.json({
  //     message: 'Invalid credentials',
  //   }),
  // )),

  rest.post(`${BASE_URL}/v1/auth/login`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      exp: 1649047862,
    }),
  )),

  // rest.get(`${BASE_URL}/v1/users/me`, (req, res, ctx) => res(
  //   ctx.status(500),
  // )),

  rest.get(`${BASE_URL}/v1/users/me`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      data: {
        id: 'b5a35743-2d4b-4559-939a-2ba21c06f39c',
        name: 'Mock User',
        username: 'mockuser',
        email: 'mock@user.com',
        nip: '123456789012345672',
        occupation: 'Kepala Dinas',
        photo: 'https://media.newyorker.com/photos/5f01e383b975762d612e0ff3/2:2/w_746,h_746,c_limit/Barasch-Avatar.jpg',
        unit: {
          id: 26,
          name: 'Dinas Komunikasi dan Informatika',
        },
        role: {
          id: 2,
          name: 'Group Admin',
        },
        last_password_changed: null,
      },
    }),
  )),

  // rest.get(`${BASE_URL}/v1/auth/permissions`, (req, res, ctx) => res(
  //   ctx.status(500),
  //   ctx.json({
  //     data: {
  //       message: 'Invalid credentials',
  //     },
  //   }),
  // )),

  rest.get(`${BASE_URL}/v1/auth/permissions`, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      data: {
        permissions: [
          'event.manage',
          'news.archive',
          'news.manage',
          'news.publish',
          'user.cancel-invitation',
          'user.change-email',
          'user.deactivate',
          'user.invite',
          'user.manage',
          'user.request-to-be-admin',
          'user.set-as-admin',
        ],
      },
    }),
  )),

];

export { handlers };
