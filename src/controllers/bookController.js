const bookModel= require("../models/bookModel.js")
const createNewBookList=async function(req,res){
    let bookInfo=req.body
   let allBookData=await bookModel.create(bookInfo)
   res.send({msg:allBookData})
}
const getBookList= async function(req,res){
    let getBookData=await bookModel.find({year:"1994"})
    res.send({msg:getBookData})
}
module.exports.createNewBookList=createNewBookList
module.exports.getBookList=getBookList