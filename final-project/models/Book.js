import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    publicationYear: Number,
    author: String,
    description: String,
    price: Number,
    image: String, 
    seller: String,
    sold: { type: Boolean , default: false },
    created: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
