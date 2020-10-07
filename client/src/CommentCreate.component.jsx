import React, { useState } from "react";

import axios from "axios";

function CommentCreate({ id }) {
  const [comment, setComment] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      `http://localhost:4001/posts/${id}/comments`,
      { content: comment }
    );
    setComment("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentCreate;
