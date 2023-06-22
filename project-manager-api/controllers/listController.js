const { createList } = require("../services/lists");

async function CreateList(req, res) {
  const { name, board_id } = req.body;

  try {
    const newListId = await createList(name, board_id);
    res
      .status(201)
      .json({ id: newListId, message: "List created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  CreateList,
};
