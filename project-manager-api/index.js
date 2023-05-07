const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { isEmail, isPassword } = require("./utils/validator");
const { getUser } = require("./services/users");
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
//! TODO:

app.listen(3000);
