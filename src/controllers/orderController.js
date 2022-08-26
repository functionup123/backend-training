const orderModel=require("../models/orderModel.js")

const createOrder=async function(req,res,next){
const orderData=req.body
let savedData=await productModel.create(orderData)
res.send({msg:savedData})

}
module.exports.createOrder=createOrder