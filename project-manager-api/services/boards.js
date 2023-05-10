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
  let boards = await knex("boards").select("*").where("user_id", user_id);
  boards = JSON.stringify(boards);
  boards = JSON.parse(boards);
  return boards;
}

module.exports = {
  getBoards,
};
