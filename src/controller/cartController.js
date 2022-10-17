const cartModels = require('../models/cartModels');
const cartModel = require('../models/cartModels')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const { isValid, isValidObjectId,isValidRequestBody, isValidPrice} = require('../validation/validation.js')
//------------------------------------create cart--------------------------------------------------------//
const createCart = async function (req, res) {
    try {
        let userId = req.params.userId
        let productId = req.body.productId
        let cartId = req.body.cartId

        let productDetails = {
            productId,
            quantity: 1
        }
   if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        const isValidUser = await userModel.findById({ _id: userId })
        if (!isValidUser) return res.status(404).send({ status: false, message: "user not found" })

        if (!isValid(productId)) return res.status(400).send({ status: false, message: "product Id must be present in request Body.." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "invalid product Id.." })
        const product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return res.status(400).send({ status: false, message: "product not found or may be deleted..." })
        const productPrice = product.price
if(cartId){
        if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid product Id.." })  
    } 
    const cart = await cartModel.findOne({ _id: cartId, isDeleted: false })
    if (cart) {
        let productId1=cart.items.map(x=>x.productId)
      
        if(productId1.include(productId)){
            let updatecart= await cartModel.findOneAndUpdate({_id:productId ,userId:userId},{ $inc: {quantity: 1, totalPrice: productPrice } },{new:true})
            return res.status(200).send({ status: true, message: " success", data: updatecart })
        }
    }

    const createcart={
        userId:userId,
        items:[productDetails],
        totalItems:1,
        totalPrice:productPrice
    }
const newcart= await cartModel.create(createcart)
  console.log(newcart)
return res.status(201).send({status:true,message:"successfully create new cart",data:newcart})
 } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}














//---------------------------------getCart------------------------------------------------------------//
const getCart = async function(req, res){
    try {
        const userId = req.params.userId
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "invalid user Id" })
        let findUserId = await userModel.findById({ _id: userId })
        if (!findUserId) return res.status(404).send({ status: false, msg: "user not found" })

        let cartExist = await cartModel.findById({ _id: userId })
        if (!cartExist) return res.status(404).send({ status: false, msg: "user not found" })
        return res.status(200).send({ status: true, msg: "Cart found Successfully", data: cartExist })
    } catch (error) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
    //-----------------------------------------delete-----------------------------------------------//

    const deletecart = async function(req, res){
        try {
         const userId = req.params.userId
         if (!isValidRequestBody(userId)) return res.send({ status: false, message: "Please enter valid UserId" })
     
         let userExist = await userModel.findById({ _id: userId })
         if (!userExist) return res.status(404).send({ status: false, msg: "user not found" })
     
         let cartExist = await cartModel.findById({ userId: userId })
         if (!cartExist) return res.status(404).send({ status: false, msg: "user not found" })
     
         const cartDeleted = await cartModel.findByOneAndUpdate({_id: cartExist._id}, {item:[], totalPrice:0, totalItems:0}, {new: true})
         return res.status(204).send({ status: true, msg: "Cart is empty", data: cartDeleted })
     
        } catch (error) {
         return res.status(500).send({ status: false, error: err.message })
        }
    }
module.exports={createCart , getCart , deletecart}