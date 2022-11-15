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
  });
  afterAll(() => {
    pool.end();
  });
});
