const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const blogRoutes = require("./app/routes/blogRoutes");
const homeRoutes = require("./app/routes/homeRoutes");

const app = express();
// connect to mongodb
// xcPFQMFzMUhTjYCY
const port = process.env.PORT || 3000;
const dbURI =
  "mongodb+srv://bilalkarakollu:xcPFQMFzMUhTjYCY@cluster0.ueolyde.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => app.listen(port))
  .catch((err) => {
    res.redirect("/404");
  });

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", homeRoutes);
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Error Page" });
});
