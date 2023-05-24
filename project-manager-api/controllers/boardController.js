const BoardServices = require("../services/boards");

// Read all used boards.
async function getBoards(req, res) {
  const userId = req.params.userId;
  const boards = await BoardServices.getBoards(userId);
  console.log(boards);
  res.json(boards);
}

async function getBoardsByEmail(email) {
  try {
    const boards = await knex("boards")
      .join("users", "users.id", "=", "boards.user_id")
      .select("*")
      .where("users.email", email);

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
