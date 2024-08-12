const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require("../Services/authentication");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, {
    timestamps: true,
})


userSchema.pre("save", async function (next) {
    const user = this;

    const usersCheck = await User.find({ email: user.email })

    if (usersCheck.length > 0) {
        console.log(usersCheck.length)
        throw new Error("User with this email Id are already present!")
    }

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static('comparePasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error("User is not found!")
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const recentPassword = createHmac("sha256", salt).update(password).digest("hex");

    if (hashedPassword !== recentPassword) {
        throw new Error("Password doesn't match!")
    }

    const token = createTokenForUser(user);

    return token;
})



const User = model("user", userSchema);

module.exports = User;