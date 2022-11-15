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

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) from dogs');
    return Number(rows[0].count);
  }

  static async post({ name, breed, age }) {
    const { rows } = await pool.query(
      `
INSERT INTO dogs (name, breed, age)
VALUES ($1, $2, $3)
RETURNING *
`,
      [name, breed, age]
    );
    return new Dog(rows[0]);
  }

  static async getDogs() {
    const { rows } = await pool.query('SELECT * FROM dogs');
    return rows.map((row) => new Dog(row));
  }

  static async getDogById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM dogs
    WHERE id = $1
    `,
      [id]
    );
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
