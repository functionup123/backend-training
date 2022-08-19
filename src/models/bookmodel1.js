const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    author_id: {
        type: Number,
        required: true
    },
    author_name: String,
    age: Number,
    address: String
},

    { timestamps: true });

const bookSchema1 = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    author_id: Number,
    price: Number,
    ratings: Number
},

    { timestamps: true });
module.exports.authorModel = mongoose.model('author', authorSchema)//autors
module.exports.bookModel1 = mongoose.model('book1', bookSchema1)//book1