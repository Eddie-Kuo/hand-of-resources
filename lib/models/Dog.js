const pool = require('../utils/pool');

class Dog {
  id;
  name;
  breed;
  age;
  constructor({ id, name, breed, age }) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.age = age;
  }

  static async post({ name, breed, age }) {
    const { rows } = await pool.query(
      `
insert into dogs (name, breed, age)
values ($1, $2, $3)
returning *
`,
      [name, breed, age]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
