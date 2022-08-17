const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const book1SolController=require("../controllers/book1SolController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)
router.post("/createbook1",book1SolController.createbook1)
router.get("/bookList",book1SolController.bookList)
router.get("/getBookInYear",book1SolController.getBookInYear)
router.get("/getParticularBooks",book1SolController.getParticularBooks)
router.get("/getXINRBooks",book1SolController.getXINRBooks)
router.get("/getRandomBooks",book1SolController.getRandomBooks)
module.exports = router;