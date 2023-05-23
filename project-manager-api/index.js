const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const BoardRouter = require("./Routes/boardRoutes");
const UserRouter = require("./Routes/userRoutes");
const CardRouter = require("./Routes/cardRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Configurar CORS
app.use(cors());

app.use(BoardRouter);
app.use(UserRouter);
app.use(CardRouter);

app.listen(3001);
