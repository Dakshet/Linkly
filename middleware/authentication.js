const { verifiedTokenForUser } = require("../Services/authentication");

function checkAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }


        try {
            const userPayload = verifiedTokenForUser(tokenCookieValue);

            req.user = userPayload;

        } catch (error) {
            console.log(error.message)
        }

        return next();
    }
}

module.exports = {
    checkAuthenticationCookie,
}