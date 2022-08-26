const newUserModel=require("../models/newUserModel.js")

const createNewUser=async function(req,res,next){
const userData=req.body
let savedData=await newUserModel.create(userData)
res.send({msg:savedData})

}
module.exports.createNewUser=createNewUser