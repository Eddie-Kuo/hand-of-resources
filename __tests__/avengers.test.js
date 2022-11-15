const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const { Avenger } = require('../lib/models/Avenger');

describe('avengers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('post route', async () => {
    const avenger = new Avenger({
      name: 'black widow',
      rating: 9,
      weakness: 'praying mantis',
    });
    const res = await request(app).post('/avengers').send(avenger);
    expect(res.body.name).toEqual(avenger.name);
    expect(res.body.rating).toEqual(avenger.rating);
    expect(res.body.weakness).toEqual(avenger.weakness);
    const count = await Avenger.count();
    expect(count).toEqual(6);
  });

  afterAll(() => {
    pool.end();
  });
});
