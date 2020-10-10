import React from "react";

function CommentList({ comments }) {
  const renderComments = (() => {
    return comments.map((comment) => {
      if (comment.status === "pending") {
        return (
          <li key={comment.id}>
            <em>This comment awaits moderation</em>
          </li>
        );
      } else if (comment.status === "rejected") {
        return (
          <li key={comment.id}>
            <em>This comment is rejected</em>
          </li>
        );
      } else {
        return <li key={comment.id}>{comment.content}</li>;
      }
    });
  })();
  return (
    <div>
      <div>{`${comments.length} comments`}</div>
      <ul>{renderComments}</ul>
    </div>
  );
}

export default CommentList;
