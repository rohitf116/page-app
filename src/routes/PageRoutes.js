const express = require("express");
const {
    getPages,getPageHtmlWithHeaders
} = require("../controller/pageController");


const router = express.Router();
router
.route("/")
.get(getPages); //working
router
.route("/:id/html")
.get(getPageHtmlWithHeaders); //working

module.exports = router;