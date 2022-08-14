const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

const createNewBookList=async function(req,res){
    let bookInfo=req.body
   let allBookData=await UserModel.create(bookInfo)
   res.send({msg:allBookData})
}
const getBookList= async function(req,res){
    let getBookData=await UserModel.find()
    res.send({msg:getBookData})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.createNewBookList=createNewBookList
module.exports.getBookList=getBookList