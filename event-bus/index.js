const express = require("express");

const axios = require("axios");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const events = [];

app.get("/events", (req, res) => {
  res.status(200).send(events);
});
app.post("/events", (req, res, next) => {
  const event = req.body;
  events.push(event);
  //posts
  axios.post("http://localhost:4000/events", event);
  //comments
  axios.post("http://localhost:4001/events", event);
  //query
  axios.post("http://localhost:4002/events", event);
  //moderation
  axios.post("http://localhost:4003/events", event);
});

app.listen(4005, () =>
  console.log("listening on port 4005")
);
