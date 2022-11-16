const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Show } = require('../lib/models/Show');

describe('routes for shows', () => {
  beforeEach(() => {
    return setup(pool);
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
  afterAll(() => {
    pool.end();
  });
});
