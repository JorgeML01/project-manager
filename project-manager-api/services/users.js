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
  let users = await knex("users").where("email", email);
  users = JSON.stringify(users);
  users = JSON.parse(users);
  return users;
}

module.exports = {
  getUser,
};
