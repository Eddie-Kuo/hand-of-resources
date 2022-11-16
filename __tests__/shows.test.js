const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Show } = require('../lib/models/Show');

describe('routes for shows', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('update', async () => {
    const res = await request(app).put('/shows/1').send({
      title: 'friends',
      episodes: 236,
      rating: 9,
    });
    expect(res.body.title).toEqual('friends');
    expect(res.body.episodes).toEqual(236);
    expect(res.body.rating).toEqual(9);
  });

  test('post route', async () => {
    const show = new Show({
      title: 'you',
      episodes: 30,
      rating: 8,
    });
    const res = await request(app).post('/shows').send(show);
    expect(res.body.title).toEqual(show.title);
    expect(res.body.episodes).toEqual(show.episodes);
    expect(res.body.rating).toEqual(show.rating);
    const count = await Show.count();
    expect(count).toEqual(7);
  });

  test('get all route', async () => {
    const res = await request(app).get('/shows');
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      episodes: expect.any(Number),
      rating: expect.any(Number),
    });
    const count = await Show.count();
    expect(count).toEqual(6);
  });
  test('get by id', async () => {
    const res = await request(app).get('/shows/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      episodes: expect.any(Number),
      rating: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
