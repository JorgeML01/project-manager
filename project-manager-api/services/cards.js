// Código para conectarse a la base de datos usando knex.
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "ExperienciaUsuario++",
    database: "trellodb",
  },
});

//* Create.
//! TODO:
async function createCard() {
  return 0;
}

//* Read.
async function getCards(list_id) {
  const cards = await knex("cards").select("*").where("list_id", list_id);
  return cards;
}

//* Delete.
async function deleteCard(id) {
  await knex("cards").where("id", id).del();
}

//* Update.
//! TODO:
async function updateCard(cardId, name, description, listId, position) {
  const result = await knex("cards")
    .where({ id: cardId })
    .update({ name, description, list_id: listId, position });
  return result;
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  updateCard,
};
