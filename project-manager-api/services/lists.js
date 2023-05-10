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
  let lists = await knex("lists").select("*").where("board_id", board_id);
  lists = JSON.stringify(lists);
  lists = JSON.parse(lists);
  return lists;
}

module.exports = {
  getLists,
};
