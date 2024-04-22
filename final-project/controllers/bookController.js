import Book from "../models/Book.js";


export const getAllBooks = async (req, res) => {
    const books = await Book.find({ }).select('-__v');

    res.status(200).send(books);
};


export const createBook = async (req, res) => {
    const book = new Book(req.body);

    try {
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send('Could not save book');
    };
};


export const getBookById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.findById(id);

        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send(`Could not find book with id: ${id} `);
        };
    } catch (error) {
        res.status(404).send('Something went wrong. Please try again!');
    };
};


export const updateBook = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body);
        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(404).send(`Could not find book with id: ${id} `);
    };
};


export const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(`Could not delete book with id: ${id}!`);
    };
};


export const buyBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.findByIdAndUpdate(id, { sold: true });
    
        res.status(200).send(`Book with ${id} bought successfully!`);
    }
    catch (error) {
        res.status(500).send('Could not buy book!');
    };
};
