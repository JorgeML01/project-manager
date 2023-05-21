require("dotenv").config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.HOST,
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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
