const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getDB } = require("./db.js");

let { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  if (process.env.NODE_ENV !== "production") {
    JWT_SECRET = "temporaryjwtsecretfordevonly";
    console.log(
      "Missing Environment variable JWT_SECRET.Using Unsafe Dev Secret"
    );
  } else {
    console.log("Missing env var JWT_SECRET. Authentication Disabled");
  }
}

const routes = express.Router();
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

const origin = process.env.UI_SERVER_ORIGIN || "http://localhost:3000";
routes.use(cors({ origin, credentials: true }));

async function calculateHash(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

routes.post('/signin', async (req, res) => {
  if (!JWT_SECRET) {
    res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
  }

  const payload = req.body.payload;
  if (!googleToken) {
    res.status(400).send({ code: 400, message: 'Missing Credentials' });
    return;
  }
  const { username, password } = payload;
  const credentials = {};
  const db = getDB();
  const result = await db.collection('Users').find({ username });
  if (result.username === username) {
    const hash = calculateHash(password);
    if (hash === req.passwordHash) {
      credentials.signedIn = true;
      credentials.username = username;
    }
  }
  const token = jwt.sign(credentials, JWT_SECRET);
  res.cookie('jwt', token, { httpOnly: true, domain: process.env.COOKIE_DOMAIN });
  res.json(credentials);
});

function getUser(req) {
  const token = req.cookies.jwt;
  if (!token) {
    return { signedIn: false };
  }
  try {
    credentials = jwt.verify(token, JWT_SECRET);
    return credentials;
  } catch (error) {
    return { signedIn: false };
  }
}

routes.post('/user', (req, res) => {
  res.send(getUser(req));
})

module.exports = { routes, getUser, }