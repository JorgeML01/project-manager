const { registerUser, getCredentials } = require("../services/users");
const { isEmail, isPassword } = require("../utils/validator");
const HTTPCodes = require("../utils/HTTPCodes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email, password } = req.body;
  const errorMessages = [];

  if (!isEmail(email)) {
    errorMessages.push("Email is not valid");
  }

  if (!isPassword(password)) {
    errorMessages.push("Password is not valid");
  }

  if (errorMessages.length) {
    res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
  } else {
    const salt = crypto.randomBytes(128).toString("base64");
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 30000, 64, "sha256")
      .toString("base64");

    // req.body
    /*
    {
      email: ""
      password: ""
    }
    */
    const [newUserId] = await registerUser({
      ...req.body,
      encryptedPassword,
      // salt: salt,
      salt,
    });

    console.log("SE REGISTRÓ");
    res.send({
      success: true,
      newUserId,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  // 0. TODO: middleware

  // 1. verificacion de los parametros (formato)
  const errorMessages = [];
  if (!isEmail(email)) {
    errorMessages.push("Email is not valid");
  }

  if (!isPassword(password)) {
    errorMessages.push("Password is not valid");
  }

  if (errorMessages.length) {
    res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
  } else {
    try {
      const [credentials] = await getCredentials(email);

      const encryptedPassword = crypto
        .pbkdf2Sync(password, credentials.salt, 30000, 64, "sha256")
        .toString("base64");

      if (encryptedPassword === credentials.password) {
        // generate token
        //!jwt.sign({ email });
        res.send({
          success: true,
        });
      } else {
        res.status(HTTPCodes.UNAUTHORIZED).send({
          message: "Incorrect password",
        });
      }
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
        message: "Internal server error",
      });
    }
  }

  // 2. TODO: ejecucion del procedimiento
  // 2.1 validacion en base de datos

  // 3. TODO: mandar una respuesta para cada escenario

  // 4. TODO: control de excepciones try catch
}

module.exports = {
  login,
  register,
};
