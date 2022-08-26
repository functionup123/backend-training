const { default: mongoose } = require("mongoose")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
//The authorId is present in the request body. If absent send an error message that this detail is required
//The publisherId is present in the request body. If absent send an error message that this detail is required

const createBook = async function (req, res) {
    let book = req.body
    let findAuthor = await authorModel.findById(book.author1)
    let findpublisher = await publisherModel.findById(book.Publisher)
    if (book.author_id == undefined || book.publisher_id == undefined) {
        res.send("plz give a  id of author and publisher")
    }

    // If present, make sure the authorId is a valid ObjectId in the author collection. If not then send an error message that the author is not present.
    else if (findAuthor == null || findpublisher == null) {
        res.send("plz enter valid id of publisher and author")
    }
    let bookCreated = await bookModel.create(book)
    res.send({ data: bookCreated })
}

const getBooksData = async function (req, res) {
    let books = await bookModel.find()

    res.send({ data: books })
}

const getBooksWithAuthorAndPublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({ data: specificBook })
}
const getupdateBooks=async function(req,res){
    let publisherName=await publisherModel.find({name:{$in:['Penguin','HarperCollins']}})
    .select("_id")
    let update=await bookModel.updateMany({publisher_id:publisherName},
        {$set:{isHardCover:true}})
    let authorRating=await authorModel.find({rating:{$gt:3.5}}).select("_id")
    let updatePrice=await bookModel.updateMany({author_id:authorRating},{$inc:{price:10}})
    res.send({update,updatePrice})   
}


module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksWithAuthorAndPublisherDetails = getBooksWithAuthorAndPublisherDetails
module.exports.getupdateBooks=getupdateBooks