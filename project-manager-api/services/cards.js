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

async function createCard(name, description, list_id) {
  let lastPositionResult = await knex("cards")
    .where({ list_id }) // Filtrar por list_id
    .max("position as maxPosition")
    .first();
  let lastPosition = lastPositionResult.maxPosition || 0;
  const position = lastPosition + 1;

  let card = await knex("cards").insert({
    name,
    description,
    list_id,
    position,
  });

  card = JSON.stringify(card);
  card = JSON.parse(card);
  return card;
}

async function getCards(list_id) {
  let cards = await knex("cards").select("*").where("list_id", list_id);
  cards = JSON.stringify(cards);
  cards = JSON.parse(cards);
  return cards;
}

//! Fix position when delete.
async function deleteCard(id) {
  await knex("cards").where("id", id).del();
}

async function updateCard(cardId, name, description, listId, position) {
  let result = await knex("cards")
    .where({ id: cardId })
    .update({ name, description, list_id: listId, position });
  result = JSON.stringify(result);
  result = JSON.parse(result);
  return result;
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  updateCard,
};
