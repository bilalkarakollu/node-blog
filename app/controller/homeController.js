const Blog = require("../models/blog");

const home_page = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Blog Page Node Example", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const home_about = (req, res) => {
  res.render("about", { title: "About Page" });
};

module.exports = {
  home_page,
  home_about,
};
