import React from "react";

import PostCreate from "./PostCreate.component";

import PostList from "./PostList.component";
function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Post List</h1>
      <PostList />
    </div>
  );
}

export default App;
