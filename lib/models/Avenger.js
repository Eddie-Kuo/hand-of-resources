const pool = require('../utils/pool');

class Avenger {
  id;
  name;
  rating;
  weakness;
  constructor({ id, name, rating, weakness }) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.weakness = weakness;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM avengers');
    return rows.map((row) => new Avenger(row));
  }

  static async post({ name, rating, weakness }) {
    const { rows } = await pool.query(
      `
    INSERT INTO avengers (name, rating, weakness)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [name, rating, weakness]
    );
    return new Avenger(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) from avengers');
    return Number(rows[0].count);
  }
}

module.exports = { Avenger };
