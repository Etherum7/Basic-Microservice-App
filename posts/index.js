const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const posts = {};

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/posts", (req, res, next) => {
  
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () =>
  console.log("listening on port 4000")
);
