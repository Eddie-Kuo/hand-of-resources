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

  test('get all route', async () => {
    const res = await request(app).get('/avengers');
    expect(res.body.length).toEqual(5);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      rating: expect.any(Number),
      weakness: expect.any(String),
    });
  });

  test('get by id', async () => {
    const res = await request(app).get('/avengers/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      rating: expect.any(Number),
      weakness: expect.any(String),
    });
  });

  test('update', async () => {
    const res = await request(app).put('/avengers/1').send({
      name: 'thor',
      rating: 8,
      weakness: 'insulators',
    });
    expect(res.body.name).toEqual('thor');
    expect(res.body.rating).toEqual(8);
    expect(res.body.weakness).toEqual('insulators');
  });

  afterAll(() => {
    pool.end();
  });
});

//! Next Steps
//* write out the get all/ get by id test routes
