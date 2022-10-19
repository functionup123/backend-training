const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authentication,authorization } = require("../middlewar/auth");
const productController=require("../controller/productController")
const cartController=require("../controller/cartController")
const orderController=require('../controller/orderController')
//-------------------------userApi------------------------//
router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/user/:userId/profile",authentication, userController.getUser)
router.put("/user/:userId/profile",authentication,authorization,userController.updateUserDetails)
//-----------------------productApi-------------------------------/

router.post('/products', productController.createProduct)
router.get('/products/:productId',productController.getProductsById)

router.delete('/products/:productId',productController.deleteProduct)
router.get('/products', productController.getProduct)

router.put('/products/:productId',productController.updateProductDetails);
//-----------------------------------cart-------------------------------------------//
router.post('/users/:userId/cart',cartController.createCart)
router.put('/users/:userId/cart', cartController.updateCart)

router.delete('/users/:userId/cart',cartController.deleteCart)

//------------------------- order api ----------------------------//
router.post('/users/:userId/orders',orderController.createOrder)

router.put('/users/:userId/orders',orderController.updateOrder)


router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;