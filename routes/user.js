const express = require("express");
const { createUser, loginUser } = require("../controllers/user");
const multer = require('multer')
const path = require("path")

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/images"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })


router.post("/signup", upload.single('profileImage'), createUser);

router.post("/signin", loginUser);


module.exports = router;