import React, { useState, useEffect } from "react";

import axios from "axios";

function CommentList({ id }) {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${id}/comments`
    );
    setComments(res.data);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const renderComments = (() => {
    return comments.map((comment) => (
      <li key={comment.id}>{comment.content}</li>
    ));
  })();
  return (
    <div>
      <div>{`${comments.length} comments`}</div>
      <ul>{renderComments}</ul>
    </div>
  );
}

export default CommentList;
