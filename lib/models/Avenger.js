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

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM avengers
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Avenger(rows[0]);
  }

  static async update(id, newAttr) {
    const avenger = await Avenger.getById(id);
    if (!avenger) return null;
    const updateData = { ...avenger, ...newAttr };
    const { rows } = await pool.query(
      `
      UPDATE avengers
      SET name = $2, rating = $3, weakness = $4
      WHERE id = $1
      RETURNING *
      `,
      [id, updateData.name, updateData.rating, updateData.weakness]
    );
    return new Avenger(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM avengers
    WHERE id = $1
    `,
      [id]
    );
    return new Avenger(rows[0]);
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
