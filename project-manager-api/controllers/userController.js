const { registerUser, getCredentials } = require("../services/users");
const { isEmail, isPassword } = require("../utils/validator");
const HTTPCodes = require("../utils/HTTPCodes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
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

      const [newUserId] = await registerUser({
        ...req.body,
        encryptedPassword,
        salt,
      });

      console.log("SE REGISTRÓ");
      res.send({
        success: true,
        newUserId,
      });
    }
  } catch (error) {
    console.log("Ya existe el usuario");
    res
      .status(HTTPCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
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
      const [credentials] = await getCredentials(email);

      console.log("credentials", credentials);
      const encryptedPassword = crypto
        .pbkdf2Sync(password, credentials.salt, 30000, 64, "sha256")
        .toString("base64");

      if (encryptedPassword == credentials.password) {
        // generate
        const accessToken = jwt.sign({ email }, process.env.TOKEN_KEY, {
          expiresIn: "1d",
        });

        const refreshToken = jwt.sign({ email }, process.env.TOKEN_KEY, {
          expiresIn: "1m",
        });

        // try {
        //   res.cookie("testCookie", "cookie1");
        //   console.log("Cookie set successfully:", req.cookies.testCookie);
        // } catch (e) {
        //   console.log("Error setting cookie:", e);
        // }

        res.send({
          success: true,
          data: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        res.status(HTTPCodes.UNAUTHORIZED).send({
          message: "Contrasena incorrecta",
        });
      }
    }
  } catch (e) {
    // logging
    // writeFile(exception e)

    // alerts/notifications
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      message: "Try again later",
    });
  }
}

module.exports = {
  login,
  register,
};
