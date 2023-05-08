const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { isEmail, isPassword } = require("./utils/validator");
const { getUser } = require("./services/users");
const { getBoards } = require("./services/boards");

app.use(bodyParser.json());

//Línea agregada con chatgpt para que funcionen los contenidos estáticos y así poder tener el CSS.
app.use(express.static(__dirname));

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

// GET boards.
//! La ruta creo que sería otra porque depende del user.
//! Supongo que tendría que usar params y ese tipo de cosas.
app.get("/users/:userId/boards", async function (req, res) {
  const userId = req.params.userId;
  const boards = await getBoards(userId);
  console.log(boards);
  res.json(boards);
});
// CRUD de cards.
//! TODO:

app.listen(3000);
