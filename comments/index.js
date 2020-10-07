const express = require("express");

const bodyParser = require("body-parser");

const { randomBytes } = require("crypto");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res, next) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comment = { id: commentId, content };

  const comments = commentsByPostId[req.params.id] || [];

  comments.push(comment);
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () =>
  console.log("listeming on port 4001")
);
