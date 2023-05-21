require("dotenv").config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.HOST,
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
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
  console.log(cards);
  return cards;
}

async function deleteCard(id) {
  const cardToDelete = await knex("cards").where("id", id).first();
  const listId = cardToDelete.list_id;
  const position = cardToDelete.position;

  // Eliminar la tarjeta de la base de datos.
  await knex("cards").where("id", id).del();

  // Actualizar las posiciones de las tarjetas restantes en la misma lista.
  await knex("cards")
    .where("list_id", listId)
    .where("position", ">", position)
    .decrement("position", 1);

  return { success: true };
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
