const express = require("express");
const router = express.Router();

const BoardController = require("../controllers/boardController");

router.get("/users/:userId/boards", BoardController.getBoards);

module.exports = router;
