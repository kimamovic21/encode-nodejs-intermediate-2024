import Book from "../models/Book.js";


export const getAllBooks = async (req, res) => {
    const books = await Book.find({ }).select('-__v');

    res.status(200).send(books);
};


export const createBook = async (req, res) => {
    const { title, publicationYear, author, description, price } = req.body;
    const image = req.file ? req.file.path : null;
    const seller = req.user.id; 

    try {
        const book = new Book({ title, publicationYear, author, description, price, image, seller });

        await book.save();
        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send('Could not save book');
    }
};


export const getBookById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.findById(id);

        if (book) {
            return res.status(200).send(book);
        } else {
            return res.status(404).send(`Could not find book with id: ${id}`);
        };
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};


export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, publicationYear, author, description, price } = req.body;
    
    try {
        const image = req.file.path ? req.file.path : null;
        const userId = req.user.id;
        
        const updatedBook = await Book.findOneAndUpdate(
            { _id: id, seller: userId }, 
            { title, publicationYear, author, description, price, image }, 
            { new: true }
        );

        if (updatedBook) {
            return res.status(200).send(updatedBook);
        } else {
            return res.status(404).send(`Could not update book with id: ${id}`);
        }
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};


export const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findOneAndDelete({ _id: id, seller: req.user.id });

        if (deletedBook) {
            return res.status(204).send();
        } else {
            return res.status(404).send(`Could not delete book with id: ${id}`);
        };
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};


export const buyBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        
        if (book.seller !== req.user.id) {
            await Book.findByIdAndUpdate(id, { sold: true });
            return res.status(200).send('Book bought successfully!');
        } else {
            return res.status(403).send('Cannot buy your own book!');
        };
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again!');
    };
};
