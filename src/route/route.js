const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authentication } = require("../middlewar/auth");


router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/user/:userId/profile",authentication, userController.getUser)
router.put("/user/:userId/profile",  userController.updateUserDetails)
router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;