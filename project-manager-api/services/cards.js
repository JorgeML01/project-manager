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

async function getCards(list_id) {
  const cards = await knex("cards").select("*").where("list_id", list_id);
  return cards;
}

async function deleteCard(id) {
  await knex("cards").where("id", id).del();
}

module.exports = {
  getCards,
  deleteCard,
};
