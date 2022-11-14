const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('post dog', async () => {
    const dog = {
      name: 'lucy',
      breed: 'corgi',
      age: 2,
    };
    const res = await request(app).post('/dogs').send(dog);
    expect(res.body.length).toEqual(7);
    expect(res.body[0]).toEqual({
      name: expect.any(String),
      breed: expect.any(String),
      age: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
