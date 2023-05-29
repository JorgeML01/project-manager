const BoardServices = require("../services/boards");

// Read all used boards.
async function getBoards(req, res) {
  const userId = req.params.userId;
  const boards = await BoardServices.getBoards(userId);
  console.log(boards);
  res.json(boards);
}

module.exports = {
  getBoards,
};
