const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (req, res) {
    //You can name the req, res objects anything.
    //but the first parameter is always the request 
    //the second parameter is always the response
    try {
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let savedData = await BookModel.create(data)
            res.status(201).send({ msg: savedData })
        }
        else res.status(400).send({ msg: "BAD REQUEST" })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
};


const loginUser = async function (req, res) {
    try {
        let userName = req.body.emailId;
        let password = req.body.password;

        let user = await userModel.findOne({ emailId: userName, password: password });
        if (!user)
            return res.send({
                status: false,
                msg: "username or the password is not corerct",
            });
        //else  res.status(201).send({ msg: "user created"})
        let token = jwt.sign(
            {

                userId: user._id.toString(),
                batch: "thorium",
                organisation: "FunctionUp",
            },
            "functionup-plutonium-very-very-secret-key"
        );
        res.setHeader("x-auth-token", token);
        res.status(200).send({ status: true, token: token });

    }
    catch (err) {
        console.log("error:", err.message)
        res.status(500).send({ msg: "serverb error", error: err.message })
    }
};




const getUserData = async function (req, res) {
    try {
        let userId = req.params.userId;
        let userDetails = await userModel.findById(userId);
        if (!userDetails)
            return res.send({ status: false, msg: "No such user exists" });

        res.status(200).send({ status: true, data: userDetails });
        // Note: Try to see what happens if we change the secret while decoding the token
    }
    catch (err) {
        res.status(500).send({ msg: "server error" })
    }
};


const updateUser = async function (req, res) {
    // Do the same steps here:
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    try {
        let userId = req.params.userId;
        let user = await userModel.findById(userId);
        //Return an error if no user with the given id exists in the db
        if (!user) {
            return res.send("No such user exists");
        }

        let userData = req.body;
        let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
        res.status(201).send({ status: updatedUser, data: updatedUser });
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message });
    }
}
const deleteUser = async function (req, res) {
    try {
        let userId = req.params.userId
        console.log(userId)
        let user = await userModel.findById(userId)
        if (!user) {
            return res.send("user not exit")
        }
//        else res.status(401).send("unauthorised user")
        let deleteUser = await userModel.findByIdAndUpdate(
            { _id: userId }, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ data: deleteUser })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message });
    }
}

const postMessage = async function (req, res) {
    try {
        let message = req.body.message
        // // Check if the token is present
        // // Check if the token present is a valid token
        // // Return a different error message in both these cases
        // let token = req.headers["x-auth-token"]
        // if(!token) return res.send({status: false, msg: "token must be present in the request header"})
        // let decodedToken = jwt.verify(token, 'functionup-thorium')

        // if(!decodedToken) return res.send({status: false, msg:"token is not valid"})

        //userId for which the request is made. In this case message to be posted.
        // let userToBeModified = req.params.userId
        //userId for the logged-in user
        //let userLoggedIn = decodedToken.userId

        //userId comparision to check if the logged-in user is requesting for their own data
        // if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

        let user = await userModel.findById(req.params.userId)
        if (!user) return res.status(404).send({ status: false, msg: 'No such user exists' })

        let updatedPosts = user.posts
        //add the message to user's posts
        updatedPosts.push(message)
        let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

        //return the updated user document
        return res.status(200).send({ status: true, data: updatedUser })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;