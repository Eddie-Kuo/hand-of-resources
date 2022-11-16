const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');

describe('countries routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('/POST', async () => {
    const country = {
      name: 'england',
      population_millions: 56,
      location: 'Europe',
    };
    const res = await request(app).post('/api/vi/countries').send(country);
    expect(res.body.name).toEqual(country.name);
    expect(res.body.population_millions).toEqual(country.population_millions);
    expect(res.body.location).toEqual(country.location);
  });
  afterAll(() => {
    pool.end();
  });
});
