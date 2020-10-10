const express = require("express");

const bodyParser = require("body-parser");

const axios = require("axios");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { content, status } = data;
    if (content.includes("orange")) {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status: "rejected" },
      });
    } else {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status: "approved" },
      });
    }
    res.send({});
  }
});

app.listen(4003, () =>
  console.log("listening on port 4003")
);
