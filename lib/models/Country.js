const pool = require('../utils/pool');

class Country {
  id;
  name;
  population_millions;
  location;
  constructor({ id, name, population_millions, location }) {
    this.id = id;
    this.name = name;
    this.populationMillions = population_millions;
    this.location = location;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM countries WHERE id = $1', [
      id,
    ]);
    return new Country(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM countries');
    return rows.map((row) => new Country(row));
  }

  static async post({ name, populationMillions, location }) {
    const { rows } = await pool.query(
      `
      INSERT INTO countries (name, population_millions, location)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, populationMillions, location]
    );
    return new Country(rows[0]);
  }
}
module.exports = { Country };
