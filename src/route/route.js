const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/user/:userId/profile", userController.getUser)

router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;