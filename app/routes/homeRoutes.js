const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.home_page);

router.get("/about", homeController.home_about);

module.exports = router;
