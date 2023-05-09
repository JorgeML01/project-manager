const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { isEmail, isPassword } = require("./utils/validator");
const { getUser } = require("./services/users");
const { getBoards } = require("./services/boards");
const { getLists } = require("./services/lists");
const { getCards } = require("./services/cards");

app.use(bodyParser.json());
app.use(express.static(__dirname));

//! No usar class componentes sino function componentes de react.

//* LOGIN.
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

//* GET boards.
app.get("/users/:userId/boards", async function (req, res) {
  const userId = req.params.userId;
  const boards = await getBoards(userId);
  console.log(boards);

  // Tengo que parsear la respuesta.
  // Porque está en otro tipo de dato.
  //const boardsJson = json.parse(boards);
  res.json(boards); //! Creo que aquí igual ya me lo está retornando como json de todos modos. Entonces sólo es cuando use ese response...
  //res.json(boardsJson);
});

// * GET lists.
app.get("/users/:userId/boards/:boardId/lists", async function (req, res) {
  const boardId = req.params.boardId;
  const lists = await getLists(boardId);
  console.log(lists);

  let cards = [];

  for (let i = 0; i < lists.length; i++) {
    const listId = lists[i].id;
    const cardsInList = await getCards(listId);
    cards.push({ listId: listId, cards: cardsInList });
  }
  console.log("\n\n\nCARDS");
  console.log(cards[0].cards[0].name);
  console.log(cards[0].cards[1].name);
  console.log(cards[0].cards[2].name);
  console.log(cards[0].listId);
  res.json(cards);
});

//* CRUD de cards.
//! TODO:
app.get("/users/:userId/boards/:boardId/cards", async function (req, res) {
  //const userId = req.params.userId;
  //const boardId = req.params.boardId;
  //const cards = await getCards(userId, boardId);
  //res.send(cards);
});

app.listen(3000);
