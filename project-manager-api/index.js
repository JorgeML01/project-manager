const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const BoardRouter = require("./Routes/boardRoutes");
const UserRouter = require("./Routes/userRoutes");
const CardRouter = require("./Routes/cardRoutes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(BoardRouter);
app.use(UserRouter);
app.use(CardRouter);

app.listen(3000);
