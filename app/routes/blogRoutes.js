const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.redirect("/blogs");
  });
});

router.post("/updatepost/", (req, res) => {
  const { id, title, snippet, body } = req.body;
  Blog.findByIdAndUpdate(id, {
    title: title,
    snippet: snippet,
    body: body,
  })
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render("update", { title: "Update Blog", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Post Detail", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
