const User = require("../models/user");

let success = false;

async function createUser(req, res) {
    try {

        // Destructure the request
        const { name, email, password } = req.body;


        // // User verification 
        // let user = await User.findOne({ email: req.body.email })
        // // let user = await User.deleteMany()

        // if (user) {
        //     success = false;
        //     return res.status(400).json({ success, Error: "User with this email Id are already present!" })
        // }


        // User store the data
        let user = await User.create({
            name,
            email,
            password,
            profileImageURL: `./images/${req.file.filename}`
        })


        // Final
        success = true;
        // return res.status(201).json({ success, user })
        return res.redirect("/login")


    } catch (error) {
        // console.log(error.message);
        success = false;
        // return res.status(500).json({ success, Error: error.message })
        return res.render("signup", {
            Error: error.message
        })
    }
}


async function loginUser(req, res) {
    try {

        // Destructure the request
        const { email, password } = req.body;


        // User store the data
        const token = await User.comparePasswordAndGenerateToken(email, password);

        // console.log(user)

        // Final
        success = true;
        // return res.status(201).json({ success, token })
        // return res.redirect("/login")
        return res.cookie("token", token).redirect("/")


    } catch (error) {
        success = false;
        return res.render("login", {
            Error: error.message
        })
    }
}

module.exports = {
    createUser,
    loginUser,
}