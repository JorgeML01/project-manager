const BoardServices = require("../services/boards");

// Read all used boards.
async function getBoards(req, res) {
  const userId = req.params.userId;
  const boards = await BoardServices.getBoards(userId);
  console.log(boards);
  res.json(boards);
}

async function createBoard(req, res) {
  //const token = localStorage.getItem("accessToken");
  //const decodedToken = decodeToken(token);
  //const id = decodedToken.id;
  const id = 13;

  const { name, description } = req.body;

  console.log("b");
  try {
    const newBoard = await BoardServices.createBoard(name, id, description);
    res.json(newBoard);
  } catch (error) {
    console.log("a");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getBoards,
  createBoard,
};
