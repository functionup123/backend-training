const BookController = require("../models/bookModel1")
const { findOne, findOneAndUpdate } = require("../models/userModel")
const bookModel1 = BookController.bookModel1
const authorModel = BookController.authorModel
const createBook1 = async function (req, res) {
    let saveBookData = req.body
    let savedData = await bookModel1.create(saveBookData)
    res.send({ msg: savedData })
}
const createAuthors = async function (req, res) {
    let saveAuthorData = req.body
    let finalAuthorData = await authorModel.create(saveAuthorData)
    res.send({ msg: finalAuthorData })
}
//List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one after 
//another- first query will find the author_id for "Chetan Bhagat”. Then next query will 
//get the list of books with that author_id )
const getBooksChetan = async function (req, res) {
    let allBooks = await authorModel.findOne({ author_name: "Chetan Bhagat" }).select({ author_id: 1, _id: 0 })
    let listOfBooks = await bookModel1.find(allBooks)
    res.send({ listOfBooks })
}
//find the author of “Two states” and update the book price to 100;  Send back the 
//author_name and updated price in response.  ( This will also need 2  queries- 1st will be
// a findOneAndUpdate. The second will be a find query aith author_id from previous query)
const updatePrice = async function (req, res) {
    let findAuthor = await bookModel1.findOneAndUpdate({ name: "Two states" }, { $set: { price: 100 } }, { new: true })
    let getAuthors = await authorModel.find({ author_id: findAuthor.author_id }).select({ author_name: 1, _id: 0 })
    res.send({ getAuthors })
}
//Find the books which costs between 50-100(50,100 inclusive) and respond back with the
 //author names of respective books.. bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
//bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a 
//map(or forEach) loop and get all the authorName corresponding to the authorId’s 
//( by querying authorModel)

const findBookPrice = async function (req, res) {
    let bookfind = await bookModel1.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1 })
    let data = bookfind.map(x => x.author_id)
    let allData = await authorModel.find({ author_id: data }).select({ author_name: 1, _id: 0 })
    res.send(allData)
}
module.exports.createAuthors = createAuthors
module.exports.createBook1 = createBook1
module.exports.getBooksChetan = getBooksChetan
module.exports.updatePrice = updatePrice
module.exports.findBookPrice = findBookPrice