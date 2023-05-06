const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { isEmail, isPassword } = require("./utils/validator");
app.use(bodyParser.json());

//Línea agregada con chatgpt para que funcionen los contenidos estáticos y así poder tener el CSS.
app.use(express.static(__dirname));
//"/" es una ruta por defecto.
app.get("/", function (req, res) {
  //console.log(req.query);
  //console.log(req.body);
  res.send("Hola");
});

app.post("/login/", function (req, res) {
  console.log(req.body);

  // Verificación de los parámetros.abs
  if (isEmail(req.body.email)) {
    console.log("válido");
  } else {
    console.log("inválido");
  }

  if (isPassword(req.body.password)) {
    console.log("válido");
  } else {
    console.log("inválido");
  }

  // Ejecución del procediento.

  // Mandar respuesta para cada escenario.

  // Control de excepciones try-catch.

  res.send("abc");
});

app.listen(3000);
