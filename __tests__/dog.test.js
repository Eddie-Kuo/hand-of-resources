const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Dog } = require('../lib/models/Dog');

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('post dog', async () => {
    const dog = new Dog({
      name: 'lucy',
      breed: 'corgi',
      age: 2,
    });
    const res = await request(app).post('/dogs').send(dog);
    expect(res.body.name).toEqual(dog.name);
    expect(res.body.breed).toEqual(dog.breed);
    expect(res.body.age).toEqual(dog.age);
    const count = await Dog.count();
    expect(count).toEqual(7);
    expect(res.status).toEqual(200);
  });

  test('get all', async () => {
    const res = await request(app).get('/dogs');
    expect(res.body.length).toEqual(6);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
      age: expect.any(Number),
    });
  });

  test('get by id', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      breed: expect.any(String),
      age: expect.any(Number),
    });
  });

  test('update', async () => {
    const res = await request(app).put('/dogs/1').send({
      name: 'ollie',
      breed: 'corgi',
      age: 2,
    });
    expect(res.body.name).toEqual('ollie');
    expect(res.body.breed).toEqual('corgi');
    expect(res.body.age).toEqual(2);
  });

  test('delete', async () => {
    const res = await request(app).delete('/dogs/1');
    expect(res.status).toEqual(204);
  });
  afterAll(() => {
    pool.end();
  });
});

//* next is the delete test for resource 2
