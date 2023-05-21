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

const registerUser = async (user) => {
  return await knex("users").insert({
    email: user.email,
    password: user.encryptedPassword,
    salt: user.salt,
  });
};

const getCredentials = async (email) => {
  let credentials = await knex
    .select("password", "salt")
    .from("users")
    .where("email", email);
  credentials = JSON.stringify(credentials);
  return JSON.parse(credentials);
};

module.exports = {
  getCredentials,
  registerUser,
};
