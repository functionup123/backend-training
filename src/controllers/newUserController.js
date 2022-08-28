const newUserModel=require("../models/newUserModel.js")

const createNewUser=async function(req,res){
let userData=req.body
let header=req.headers.isfreeappuser
let headertwo=Boolean(header)
console.log(headertwo)
userData.isfreeappuser=headertwo
let savedData=await newUserModel.create(userData)
res.send({msg:savedData})

}
module.exports.createNewUser=createNewUser