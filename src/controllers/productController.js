const productModel=require("../models/productModel.js")

const createproduct=async function(req,res,next){
const productData=req.body
let savedData=await productModel.create(productData)
res.send({msg:savedData})

}
module.exports.createproduct=createproduct