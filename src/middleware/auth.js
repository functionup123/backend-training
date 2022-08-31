const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    //check the token in request header
    //validate this token
    try {
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];

        //If no token is present in the request header return error. This means the user is not logged in.
        if (!token) return res.send({ status: false, msg: "token must be present" });
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });
        req.loggedInUser = decodedToken.userId
        next()
       
    }
    catch (err) {
        res.status(500).send(err)
    }
}


const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    try {
        let userToModify = req.params.userId
        if (userToModify != req.loggedInUser) {
            return res.status(401).send({ msg: " UnAuthorized User !" })
        }
        next()
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise

