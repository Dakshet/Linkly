require('dotenv').config()
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

// Import
const { handleToDB } = require("./connection");
const urlRoute = require("./routes/url");
const path = require("path")
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const { checkAuthenticationCookie } = require('./middleware/authentication');


// MongoDB connection
handleToDB(MONGODB_URL).then(() => {
    console.log("DB Connected")
}).catch((error) => {
    console.log(error);
})


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));


// Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


// Cors


// Routes
app.use("/url", urlRoute);

app.use("/", staticRoute);

app.use("/user", userRoute);


// Listen
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});