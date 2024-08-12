const express = require("express");
const { handleGenerateShortURL, redirectURLUsingShortId, getAnalytics } = require("../controllers/url");
const { body } = require("express-validator");

const router = express.Router();


router.post("/generateshorturl", [
    body("url", "URL is required!").isURL()
], handleGenerateShortURL)

router.get("/:id", redirectURLUsingShortId)

router.get("/getanalytics/:id", getAnalytics)


module.exports = router;