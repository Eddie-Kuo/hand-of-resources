const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Pokemon } = require('../lib/models/Pokemon');

describe('pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('post route', async () => {
    //* add in model once its created to add total count into the test to make sure post works
    const pokemon = new Pokemon({
      name: 'mewtwo',
      type: 'psychic',
    });
    const res = await request(app).post('/pokemons').send(pokemon);
    expect(res.body.name).toEqual(pokemon.name);
    expect(res.body.type).toEqual(pokemon.type);
    const count = await Pokemon.countPokemon();
    expect(count).toEqual(6);
    expect(res.status).toBe(200);
  });

  test('get all route', async () => {
    const res = await request(app).get('/pokemons');
    expect(res.body.length).toEqual(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
    });
  });
  test('get/:id', async () => {
    const res = await request(app).get('/pokemons/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
    });
  });

  test('/put/patch route', async () => {
    const pokemon = {
      name: 'pikachu',
      type: 'electric',
    };
    const res = await request(app).put('/pokemon/update').send(pokemon);
    expect(res.body).toEqual(pokemon);
  });

  afterAll(() => {
    pool.end();
  });
});
