const express = require("express");
const router = express.Router();

const CardController = require("../controllers/cardController");

router.post(
  "/users/:userId/boards/:boardId/lists/:listId",
  CardController.createCard
);

router.get("/users/:userId/boards/:boardId/lists", CardController.readCard);

router.put(
  "/users/:userId/boards/:boardId/lists/:listId/cards/:cardId",
  CardController.updateCard
);

router.delete(
  "/users/:userId/boards/:boardId/lists/:listId/cards/:cardId",
  CardController.deleteCard
);

module.exports = router;
