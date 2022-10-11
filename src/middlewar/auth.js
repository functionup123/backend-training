const jwt=require('jsonwebtoken')
const userModel=require('../models/userModel')
const { ValidName, isValidPassword, isValidString, ValidEmail,  isValid, isValidObjectId } = require("../validation/validation")
const authentication=async function(req,res,next){
    try {
        let token=req.header('Authorization');
        if(!token)return res.send({status:false,msg:"not authentic "})
let decodedtoken= await jwt.verify(token,"e-website@project5")
if(!decodedtoken) return  res.status(401).send({status:false,msg:"not auth"})
req.userId=decodedtoken.userId

next()

    } catch (err) {
        return res.status(500).send({status:false,message:err.message})
        
    }
}
module.exports={authentication}