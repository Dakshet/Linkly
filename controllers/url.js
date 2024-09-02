const { validationResult } = require("express-validator");
const URL = require("../models/url.js")
const shortid = require("shortid");
let success = false;
var shortID;

async function handleGenerateShortURL(req, res) {
    try {

        if (req.user) {
            //Destructure the request
            const { url } = req.body;


            //Validate the fields
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                success = false;
                return res.status(400).json({ success, Error: errors.array()[0].msg })
            }


            //Generate Short ID
            shortID = shortid();

            // await URL.deleteMany();
            //Store in the database
            const result = await URL.create({
                shortId: shortID,
                redirectURL: url,
                visitHistory: [],
                createdBy: req.user._id,
            })


            //Final
            success = true;
            const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
            // return res.render("home", {
            //     urls: allUrls,
            //     BASE_URL: process.env.BASE_URL,
            //     user: req.user,
            //     image: `.${req.user.profileImageURL}`,
            //     shortId: shortID,
            // });

            return res.redirect("/")
        }

        else {
            return res.redirect("/login")
        }


    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


function getShortIDValue() {
    return shortID;
}



async function redirectURLUsingShortId(req, res) {
    try {

        //Destructure the request
        const shortId = req.params.id;

        const result = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        })

        //Final
        success = true;

        // return res.status(201).json({ success, result: result })
        return res.redirect(result.redirectURL)



    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}


async function getAnalytics(req, res) {
    try {

        //Destructure the request
        const shortId = req.params.id;

        const result = await URL.findOne({ shortId });

        //Final
        success = true;

        return res.status(201).json({
            success, result: {
                totalClick: result.visitHistory.length,
                analytics: result.visitHistory
            }
        })
        // return res.redirect(result.redirectURL)



    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured!" })
    }
}



module.exports = {
    handleGenerateShortURL,
    redirectURLUsingShortId,
    getAnalytics,
    getShortIDValue,
}