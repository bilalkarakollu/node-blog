const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create);

router.post("/updatepost/", blogController.blog_update_page);

router.get("/create", blogController.blog_create_page);

router.get("/update/:id", blogController.blog_update);

router.get("/:id", blogController.blog_detail);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
