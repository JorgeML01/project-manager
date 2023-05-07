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

async function getUser(email) {
  // Conexión con base de datos.

  // Vamos a tener una lista de usuarios donde se cumpla esta condición.
  const users = await knex("users").where("email", email);
  return users;
}

// Función para el GET boards.
async function getBoards(user_id) {
  // Extraemos los boards de ese user de la base de datos.
  //! TODO:
  return 0;
}

module.exports = {
  getUser,
};
