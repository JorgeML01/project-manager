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

async function getBoards(user_id) {
  let boards = await knex("boards").select("*").where("user_id", user_id);
  boards = JSON.stringify(boards);
  boards = JSON.parse(boards);
  return boards;
}

module.exports = {
  getBoards,
};
