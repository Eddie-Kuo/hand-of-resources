const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('create route', async () => {
    const newPokemon = {
      //* add in model once its created to add total count into the test to make sure post works
      name: 'mewtwo',
      type: 'psychic',
    };
    const res = await request(app).post('/pokemon').send(newPokemon);
    expect(res.body.name).toEqual(newPokemon.name);
    expect(res.body.type).toEqual(newPokemon.type);
  });
  afterAll(() => {
    pool.end();
  });
});
