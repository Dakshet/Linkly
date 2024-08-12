const jwt = require("jsonwebtoken");

const JWT_SECURE = process.env.JWT_SECURE;
console.log(JWT_SECURE);

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }

    const token = jwt.sign(payload, JWT_SECURE);

    return token;
}

const verifiedTokenForUser = (token) => {
    const payload = jwt.verify(token, JWT_SECURE);

    return payload;
}

module.exports = {
    createTokenForUser,
    verifiedTokenForUser,
}