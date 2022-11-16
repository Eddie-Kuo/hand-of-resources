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

  static async deletePokemon(id) {
    const { rows } = await pool.query(
      `DELETE FROM pokemon 
    WHERE id = $1 
    RETURNING *`,
      [id]
    );
    return new Pokemon(rows[0]);
  }

  static async updatePokemon(id, newAttr) {
    const pokemon = await Pokemon.getPokemonById(id);
    if (!pokemon) return null;
    const updateData = { ...pokemon, ...newAttr };
    const { rows } = await pool.query(
      `UPDATE pokemon
        SET name = $2, type = $3
        WHERE id = $1
        RETURNING *
        `,
      [id, updateData.name, updateData.type]
    );
    return new Pokemon(rows[0]);
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
