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

async function createList(name, board_id) {
  try {
    const newList = {
      name,
      board_id,
    };

    const result = await knex("lists").insert(newList);
    const createdListId = result[0];

    console.log("List created with ID:", createdListId);

    return createdListId;
  } catch (error) {
    console.log("Error creating list:", error);
    throw error;
  }
}

module.exports = {
  getLists,
  createList,
};
