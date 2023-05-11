const cardServices = require("../services/cards");
const { getLists } = require("../services/lists");

// Create card.
async function createCard(req, res) {
  const { name, description } = req.body;
  const listId = req.params.listId;

  try {
    const newCard = await cardServices.createCard(name, description, listId);
    res.json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Read cards and lists from a board.
async function readCard(req, res) {
  const boardId = req.params.boardId;
  const lists = await getLists(boardId);

  let cards = [];

  for (let i = 0; i < lists.length; i++) {
    const listId = lists[i].id;
    const listName = lists[i].name;
    const cardsInList = await cardServices.getCards(listId);
    cards.push({ listId: listId, listName: listName, cards: cardsInList });
  }

  res.json(cards);
}

// Update card.
async function updateCard(req, res) {
  const cardId = req.params.cardId;
  const listId = req.params.listId;
  const { name, description, position } = req.body;
  const result = await cardServices.updateCard(
    cardId,
    name,
    description,
    listId,
    position
  );
  res.json(result);
}

// Delete card.
async function deleteCard(req, res) {
  const cardId = req.params.cardId;
  const result = await cardServices.deleteCard(cardId);
  res.json(result);
}

module.exports = {
  createCard,
  readCard,
  updateCard,
  deleteCard,
};
