const mongoose = require('mongoose');



const bookSchema= new mongoose.Schema({
    bookName:{
     type:   String,
     required:true
    },
    authorName:String,
    category:String,
    year:String
    },{ timestamps: true});
    module.exports = mongoose.model('bookInfo', bookSchema)