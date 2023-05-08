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

async function getBoards(user_id) {
  const boards = await knex("boards").select("*").where("user_id", user_id);
  return boards;
}

module.exports = {
  getBoards,
};
