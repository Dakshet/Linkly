const URL = require("../models/url");
const { getShortIDValue } = require("./url");

async function getHomePage(req, res) {
    try {

        if (req.user) {
            const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });

            return res.render("home", {
                urls: allUrls,
                BASE_URL: process.env.BASE_URL,
                user: req.user,
                image: req.user.profileImageURL,
                shortId: getShortIDValue(),
            });
        }
        else {
            return res.render("home")
        }

    } catch (error) {
        console.log(error.message);
        // return res.render("login")
    }
}

async function getLoginPage(req, res) {
    try {

        return res.render("login");

    } catch (error) {
        console.log(error.message);
    }
}

async function getSignupPage(req, res) {
    try {

        return res.render("signup");

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    getHomePage,
    getLoginPage,
    getSignupPage,
}