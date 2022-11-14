const pool = require('../utils/pool');

class Pokemon {
  id;
  name;
  type;
  constructor({ id, name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  static async getPokemonById(id) {
    const { rows } = await pool.query('SELECT * FROM pokemon WHERE id = $1', [
      id,
    ]);
    return new Pokemon(rows[0]);
  }

  static async getPokemon() {
    const { rows } = await pool.query('SELECT * FROM pokemon');
    return rows.map((row) => new Pokemon(row));
  }

  static async insertPokemon({ name, type }) {
    const { rows } = await pool.query(
      'INSERT INTO pokemon (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Pokemon(rows[0]);
  }

  static async countPokemon() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM pokemon');
    return Number(rows[0].count);
  }
}

module.exports = { Pokemon };
