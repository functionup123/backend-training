//const cartModels = require('../models/cartModels');
const { toCollectionName } = require('mongoose/lib/utils')
const cartModel = require('../models/cartModels')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const { isValid, isValidObjectId,isValidRequestBody, isValidNum} = require('../validation/validation.js')
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
//-----------------------------------validation for userId------------------------------
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        const isValidUser = await userModel.findById({ _id: userId })
        if (!isValidUser) return res.status(404).send({ status: false, message: "user not found" })

        if (!isValid(productId)) return res.status(400).send({ status: false, message: "product Id must be present in request Body.." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "invalid product Id.." })
        const product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) return res.status(400).send({ status: false, message: "product not found or may be deleted..." })
        const productPrice = product.price
        if (cartId) {
            if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid cart Id.." })
        }
        const PresentCart = await cartModel.findOne({ _id: cartId, userId: userId })
   //  return res.status(200).send({status:true,msg:"cart with the product",data:PresentCart})
        if (PresentCart) {
            let alreadyProductsId = PresentCart.items.map(x => x.productId)
            if (alreadyProductsId.includes(productId)) {
                let updatedCart = await cartModel.findOneAndUpdate({ "items.productId":productId, userId: userId }, { $inc: { "items": 1, totalPrice: productPrice } }, { new: true })
                return res.status(200).send({ status: true, message: "items added successfully", data: updatedCart })
            }
            ///// chetan manocha 18lakh 
           
        
        else{
        let updatedCart = await cartModel.findOneAndUpdate({ userId: userId }, { $push: { items: productDetails }, $inc: { totalItems:1, totalPrice: productPrice } }, { new: true })
                return res.status(200).send({ status: true, message: "items added ", data: updatedCart })
            }
        
        }

        const cartCreate = {
            userId: userId,
            items:[productDetails],
            totalItems:1,
            totalPrice: productPrice
        }
        const cartCreated = await cartModel.create(cartCreate)
        return res.status(201).send({ status: true, message: "cart created successfully", data: cartCreated })
       //  let PresentCartwithproduct=await cartModel.findOne({"items.productId":productId, userId: userId })
 
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
//--------------------------------------update cart---------------------------------------------------//

const updateCart = async function (req, res) {
    try {
        const userId = req.params.userId
        const { cartId, productId, removeProduct } = req.body
//---------------------validation for userId--------------------------------------------------------//

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        if (! await userModel.findOne({ _id: userId })) return res.status(404).send({ status: false, message: "user does not exist.." })
//-----------------------------------------validation for cartId---------------------------------------

        if (!cartId) return res.status(400).send({ status: false, message: "Provide cartId " })
        if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid cart Id.." })
        const cart1 = await cartModel.findOne({ $or: [{ _id: cartId }/*, { userId: userId }*/] })
        if (!cart1) return res.status(404).send({ status: false, message: "cart does not exist.." })
        if (cart1.items.length == 0) return res.status(404).send({ status: false, message: "No Product Present In the Cart" })
//-----------------------------------------------validations for productId-------------------------------------

        if (!productId) return res.status(400).send({ status: false, message: "Provide productId " })
        if (!isValid(productId)) return res.status(400).send({ status: false, message: "product Id must be present in request Body.." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: "invalid product Id.." })

//-----------------founding the product--------------------------------//

        const findProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!findProduct) return res.status(404).send({ status: false, message: "product details not found or may be deleted" })

//----------------------------------------checking if the product present in the cart or not---------------------//

        const cart = await cartModel.findOne({ $or: [{ "items.productId": productId, userId: userId }, { "items.productId": productId, _id: cartId }] })
        if (!cart) return res.status(404).send({ status: false, message: "This Product not present in the following Cart" })
//------------------------------removedproduct key is mandetory------------------------------------//
        if (!removeProduct) return res.status(400).send({ status: false, message: "Provide removeProduct field " })
        if (!isValid(removeProduct)) return res.status(400).send({ status: false, message: "remove Product must be present in request Body.." })
    //    if (!isValidNum(removeProduct)) return res.status(400).send({ status: false, message: "remove Product should contain 0 and 1 only.." })
//------------------get the price from product---------------------------------------------------//

        const reducePrice = findProduct.price
        //Find and store the quantity form  the cart Model to store quantity variables
const quantity = cart.items.filter(x => x.productId == productId)[0].quantity

if(removeProduct==0){
    const deleteProduct= await cartModel.findOneAndUpdate({"items.productId":productId,userId:userId},{$pull:{items:{productId:productId},$inc:{totalItems:-1,totalprice:-reducePrice*quantity}}},{new:true})
    return res.status(200).send({status:true,msg:" product deleted successfully",data:deleteProduct})
}

 if(removeProduct==1){
   if(quantity>1){let reducedProduct=await cartModel.findOneAndUpdate({"items.productId":productId,userId:userId},{$inc:{"items.quantity":-1,totalPrice:-reducePrice}},{new:true})
   return res.status(200).send({status:true,msg:" product removed successfully",data:reducedProduct})
}

  else{
    const deleteProduct= await cartModel.findOneAndUpdate({"items.productId":productId,userId:userId},{$pull:{items:{productId:productId},$inc:{totalItems:-1,totalprice:-reducePrice*quantity}}},{new:true})
    return res.status(200).send({status:true,msg:" product deleted successfully",data:deleteProduct})
 }
    }
    }
    catch (err) {
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

    // const deleteCart = async function(req, res){
    //     try {
    //      const userId = req.params.userId
    //      if (!isValidRequestBody(userId)) return res.send({ status: false, message: "Please enter valid UserId" })
     
    //      const  userExist = await userModel.findById(userId)
    //      if (!userExist) return res.status(404).send({ status: false, msg: "user not found" })
    //      let cartExist = await cartModel.findById({ userId:userExist.userId})
    //      if (!cartExist) return res.status(404).send({ status: false, msg: "user not found" })
     
    //      const cartDeleted = await cartModel.findOneAndUpdate({userId:cartExist.userId}, {$set:{item:[], totalPrice:0, totalItems:0}}, {new: true})
    //      return res.status(204).send({ status: true, msg: "Cart is empty", data: cartDeleted })
     
    //     } catch (err) {
    //      return res.status(500).send({ status: false, error: err.message })
    //     }}

    const deleteCart = async function (req, res) {
        try {
            let userId = req.params.userId
    
            if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "user id is invalid" }) }
    
            let idCheck = await cartModel.findOne({ userId: userId })
    
            if (!idCheck) { return res.status(404).send({ status: false, message: `cart of ${userId} not found` }) }
           
    
            let checkDelete = await cartModel.findOne({ userId: userId, items: [] })
    
            if (checkDelete) { return res.status(404).send({ status: false, message: "cart already deleted" }) }
    
    
            let deleteCart = await cartModel.findOneAndUpdate(
                { userId: userId },
                { $set: { items: [], totalItems: 0, totalPrice: 0 } },
                { new: true }
            )
    
            return res.status(204).send({ status: true, message: "cart deleted successfully" ,data:deleteCart})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }



module.exports={createCart ,updateCart, getCart , deleteCart}