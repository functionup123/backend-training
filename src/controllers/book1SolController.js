const book1Sol=require("../models/book1Sol")
const createbook1= async function(req,res){
    const bookData=req.body
    let savedBookData=await book1Sol.create(bookData)
    res.send({msg:savedBookData})
}
const bookList=async function(req,res){
    let allBooks=await book1Sol.find().select({bookname:1,authorName:1,_id:0})
    res.send({msg:allBooks})
}
const getBookInYear=async function(req,res){
    let bookYear=req.query.year
    let allBooksYear=await book1Sol.find({year:bookYear})
    res.send({msg:allBooksYear})
}
const getParticularBooks=async function(req,res){
   let value=req.body
    let particularBook=await book1Sol.find(value)
    res.send({msg:particularBook})
}
const getXINRBooks=async function(req,res){
    let sortByPrice= await book1Sol.find({$or:[{ indianPrice:300},{indianPrice:100}]})
    res.send({msg:sortByPrice})
}
const getRandomBooks =async function(req,res){
let randomBooks=await book1Sol.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]})
res.send({msg:randomBooks})
}
module.exports.createbook1=createbook1
module.exports.bookList=bookList
module.exports.getBookInYear=getBookInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks