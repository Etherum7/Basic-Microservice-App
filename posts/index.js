const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const axios = require("axios");

const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const posts = {};

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/posts", async (req, res, next) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };

  res.status(201).send(posts[id]);
  const event = { type: "PostCreated", data: posts[id] };
  await axios.post(
    "http://event-bus-clusterip-serv:4005/events",
    event
  );
});

app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.status(200).send({});
});
app.listen(4000, () => {
  //console.log("Updating Deployment method 1");
  console.log("Updating Deployment method 2");
  console.log("listening on port 4000");
});
