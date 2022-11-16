const pool = require('../utils/pool');

class Show {
  id;
  title;
  episodes;
  rating;
  constructor({ id, title, episodes, rating }) {
    this.id = id;
    this.title = title;
    this.episodes = episodes;
    this.rating = rating;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM shows');
    return rows.map((row) => new Show(row));
  }

  static async post({ title, episodes, rating }) {
    const { rows } = await pool.query(
      `
      INSERT INTO shows (title, episodes, rating)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, episodes, rating]
    );
    return new Show(rows[0]);
  }
  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM shows');
    return Number(rows[0].count);
  }
}
module.exports = { Show };
