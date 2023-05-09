// Código para conectarse a la base de datos usando knex.
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "ExperienciaUsuario++",
    database: "trellodb",
  },
});

async function getLists(board_id) {
  const lists = await knex("lists").select("*").where("board_id", board_id);
  return lists;
}

module.exports = {
  getLists,
};

// knex envía resultRow entonces hay que parsearlo a json.
// El json lo devolvemos al frontend.
