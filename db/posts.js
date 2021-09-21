const { query } = require("express");
const db = require("./db_config");

const getAllPosts = (req, res) => {
  db.query("select * from posts", (err, response) => {
    if (err) {
      console.log(err);
    } else if (response.rows.length === 0) {
      res.json({
        message: "No items to show",
      });
    } else {
      res.json(response.rows);
    }
  });
};

const getPostById = (req, res) => {
  const query = {
    text: "select * from posts where id=$1",
    values: [req.params.id],
  };
  db.query(query, (err, response) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else if (response.rows.length === 0) {
      res.status(404).end();
    } else {
      res.json(response.rows);
    }
  });
};

const addPost = (req, res) => {
  const post = req.body;
  const query = {
    text: "insert into posts (body) values ($1)",
    values: [post.body],
  };
  db.query(query, (err, response) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      res.json(post);
    }
  });
};

const updatePost = (req, res) => {
  const updated = req.body;
  const query = {
    text: "update posts set body=$1, liked=$2 where id=$3",
    values: [updated.body, updated.liked, req.params.id],
  };
  db.query(query, (err, response) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      res.json(updated);
    }
  });
};

const deletePost = (req, res) => {
  const query = {
    text: "delete from posts where id=$1",
    values: [req.params.id],
  };
  db.query(query, (err, response) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      res.status(204).end();
    }
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
