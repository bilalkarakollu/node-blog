const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create = (req, res) => {
  const { title, snippet, body } = req.body;
  let errorCount = 0;
  let errorMessage = {};

  if (title === "") {
    errorCount++;
    errorMessage.title = "Title cannot be empty";
  }
  if (snippet === "") {
    errorCount++;
    errorMessage.snippet = "Snippet cannot be empty";
  }
  if (body === "") {
    errorCount++;
    errorMessage.body = "Body cannot be empty";
  }

  if (errorCount > 0) {
    res.render("create", {
      title: "Create Blog",
      data: req.body,
      errorMessage: errorMessage,
    });
    return;
  }

  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.redirect("/blogs");
  });
};

const blog_update_page = (req, res) => {
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
};

const blog_create_page = (req, res) => {
  res.render("create", {
    title: "Create Blog",
    data: null,
    errorMessage: null,
  });
};

const blog_update = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render("update", { title: "Update Blog", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_detail = (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Post Detail", post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_create,
  blog_update_page,
  blog_create_page,
  blog_update,
  blog_detail,
  blog_delete,
};
