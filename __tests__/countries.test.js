const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');

describe('countries routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('/GET', async () => {
    const res = await request(app).get('/api/v1/countries');
    expect(res.length).toEqual(6);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      populationMillions: expect.any(Number),
      location: expect.any(String),
    });
  });

  test('/POST', async () => {
    const country = {
      name: 'england',
      populationMillions: 56,
      location: 'Europe',
    };
    const res = await request(app).post('/api/v1/countries').send(country);
    expect(res.body.name).toEqual(country.name);
    expect(res.body.populationMillions).toEqual(country.populationMillions);
    expect(res.body.location).toEqual(country.location);
  });
  afterAll(() => {
    pool.end();
  });
});
