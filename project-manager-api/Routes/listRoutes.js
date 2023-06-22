const express = require("express");
const router = express.Router();

const ListController = require("../controllers/listController");

router.post("/create/list", ListController.CreateList);

module.exports = router;
