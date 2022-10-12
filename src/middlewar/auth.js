const jwt=require('jsonwebtoken')
const userModel=require('../models/userModel')
const {isValidObjectId } = require("../validation/validation")
const authentication= async function(req,res,next){
    try {
        let token=req.header('Authorization').split(" ")[1];
        console.log(req.header)
        if(!token)return res.send({status:false,msg:"Token is require "})
let decodedtoken= await jwt.verify(token,"e-website@project5")
if(!decodedtoken) return  res.status(401).send({status:false,msg:"invalid token "})
req.decodedUserId=decodedtoken.userId
next()
  } catch (err) {
        return res.status(500).send({status:false,message:err.message})
        
    }
}



const authorization = async function(req, res, next){
    try{
       const userId = req.params.userId
       const decodedUserId = req.decodedUserId
       if(! isValidObjectId(userId)) return res.status(400).send({status: false, message:"Invalid user Id"})
       if(! await userModel.findOne({_id: userId})) return res.status(404).send({status: false, message:"User not found"})
       if(userId != decodedUserId ) return res.status(403).send({status: false, message:"You are not Authorized"})

       next()

    }
    catch(err){
        return res.status(500).send({ status: false, error: err.message })
    }
}





module.exports={authentication,authorization}