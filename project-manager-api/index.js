const express = require("express");
const app = express();

//Línea agregada con chatgpt para que funcionen los contenidos estáticos y así poder tener el CSS.
app.use(express.static(__dirname));
//"/" es una ruta por defecto.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000);
