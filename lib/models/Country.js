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

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM countries WHERE id = $1 RETURNING *',
      [id]
    );
    return new Country(rows[0]);
  }

  static async update(id, newAttr) {
    const country = await Country.getById(id);
    if (!country) return null;
    const updateData = { ...country, ...newAttr };
    const { rows } = await pool.query(
      `
    UPDATE countries
    SET name = $2, population_millions = $3, location = $4
    WHERE id = $1
    RETURNING *
    `,
      [id, updateData.name, updateData.populationMillions, updateData.location]
    );
    return new Country(rows[0]);
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
