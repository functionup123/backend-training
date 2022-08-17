const mongoose = require('mongoose');
const bookModel=new mongoose.Schema({
bookname:{
    type:String,
    required: true
},
authorName:String,
prices:{
    indianPrice: String,
    europePrice: String,
},
year:{
    type:Number,
    default:2021
},
tags:[String],
totalPages:Number,
stockAvailable:Boolean

},{timestamp:true});









module.exports = mongoose.model('bookCollection', bookModel)