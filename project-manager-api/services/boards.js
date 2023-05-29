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

async function getBoardsByEmail(email) {
  try {
    const boards = await knex("boards")
      .join("users", "users.id", "=", "boards.user_id")
      .select("*")
      .where("users.email", email);
    boards = JSON.stringify(boards);
    boards = JSON.parse(boards);
    return boards;
  } catch (error) {
    console.error("Error al obtener los boards:", error);
    throw error;
  }
}

module.exports = {
  getBoards,
  getBoardsByEmail,
};
