const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/register", userController.createUser)

router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;