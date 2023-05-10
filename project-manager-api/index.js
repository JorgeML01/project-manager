const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { isEmail, isPassword } = require("./utils/validator");
const { getUser } = require("./services/users");
const { getBoards } = require("./services/boards");
const { getLists } = require("./services/lists");
const {
  createCard,
  getCards,
  deleteCard,
  updateCard,
} = require("./services/cards");

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Login.
app.post("/login/", async function (req, res) {
  // 0. Middleware.

  // 1. Verificación de los parámetros (formato).
  const errors = [];
  if (!isEmail(req.body.email)) {
    errors.push("Email is not valid.");
  }

  if (!isPassword(req.body.password)) {
    errors.push("Password is not valid.");
  }

  // 2. Ejecución del procediento.
  // 2.1 Validación en base de datos.

  // En caso de que no hayan errores.
  if (!errors.length) {
    const user = await getUser(req.body.email);
    console.log(user);
  }

  // 3.  Mandar respuesta para cada escenario.

  // 4. Control de excepciones try-catch.

  res.send({
    sucess: true,
  });
});

// Read all used boards.
app.get("/users/:userId/boards", async function (req, res) {
  const userId = req.params.userId;
  const boards = await getBoards(userId);
  console.log(boards);
  res.json(boards);
});

// Create card.
app.post(
  "/users/:userId/boards/:boardId/lists/:listId",
  async function (req, res) {
    const { name, description } = req.body;
    const listId = req.params.listId;

    try {
      const newCard = await createCard(name, description, listId);
      res.json(newCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Read cards and lists from a board.
app.get("/users/:userId/boards/:boardId/lists", async function (req, res) {
  const boardId = req.params.boardId;
  const lists = await getLists(boardId);

  let cards = [];

  for (let i = 0; i < lists.length; i++) {
    const listId = lists[i].id;
    const listName = lists[i].name;
    const cardsInList = await getCards(listId);
    cards.push({ listId: listId, listName: listName, cards: cardsInList });
  }

  res.json(cards);
});

// Update card.
app.put(
  "/users/:userId/boards/:boardId/lists/:listId/cards/:cardId",
  async function (req, res) {
    const cardId = req.params.cardId;
    const listId = req.params.listId;
    const { name, description, position } = req.body;
    const result = await updateCard(
      cardId,
      name,
      description,
      listId,
      position
    );
    res.json(result);
  }
);

// Delete card.
app.delete(
  "/users/:userId/boards/:boardId/lists/:listId/cards/:cardId",
  async function (req, res) {
    const cardId = req.params.cardId;
    const result = await deleteCard(cardId);
    res.json(result);
  }
);

app.listen(3000);
