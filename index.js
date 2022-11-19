const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Blog = require("./app/models/blog");
const blogRoutes = require("./app/routes/blogRoutes");

const app = express();
// connect to mongodb
// xcPFQMFzMUhTjYCY

const dbURI =
  "mongodb+srv://bilalkarakollu:xcPFQMFzMUhTjYCY@cluster0.ueolyde.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => {
    res.redirect("/blogs");
  });

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Error Page" });
});
