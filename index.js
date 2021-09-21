const express = require("express");
const app = express();
const {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} = require("./db/posts");
const port = 3000;

app.use(express.json());

app.get("/api/posts", getAllPosts);

app.get("/api/posts/:id", getPostById);

app.post("/api/posts", addPost);

app.put("/api/posts/:id", updatePost);

app.delete("/api/posts/:id", deletePost);

app.listen(port, () => {
  console.log("Server is running at port", port);
});
