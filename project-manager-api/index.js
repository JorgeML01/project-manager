const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//Línea agregada con chatgpt para que funcionen los contenidos estáticos y así poder tener el CSS.
app.use(express.static(__dirname));
//"/" es una ruta por defecto.
app.get("/", function (req, res) {
  //console.log(req.query);
  //console.log(req.body);
  res.send("Hola");
});

app.post("/:name", function (req, res) {
  console.log(req.body);
  console.log(req.params);
  res.send("abc3");
});

app.listen(3000);
