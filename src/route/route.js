const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/register", userController.createUser)

//router.get('/user/:userId/profile', authentication, authorization, getUserDetails)




router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;