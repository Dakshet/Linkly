const express = require("express");
const { getHomePage, getLoginPage, getSignupPage } = require("../controllers/staticController");

const router = express.Router();

router.get("/", getHomePage)
router.get("/login", getLoginPage)
router.get("/signup", getSignupPage)
router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})


module.exports = router;