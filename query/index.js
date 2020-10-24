const express = require("express");

const bodyParser = require("body-parser");

const axios = require("axios");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const postsWithComments = {};

const handleRequest = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    postsWithComments[id] = {
      id: id,
      title: title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { content, id, postId, status } = data;
    postsWithComments[postId].comments.push({
      id,
      content,
      status,
    });
  } else if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;

    let commentsArray = postsWithComments[postId].comments;

    let comment = commentsArray.find(
      (comment) => comment.id === id
    );
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(postsWithComments);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleRequest(type, data);
  console.log(postsWithComments);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening on port 4002");
  const res = await axios.get(
    "http://event-bus-clusterip-serv:4005/events"
  );
  for (let event of res.data) {
    handleRequest(event.type, event.data);
  }
});
