import Book from "../models/Book.js";


export const getAllBooks = async (req, res) => {
    const books = await Book.find({ }).select('-__v');

    res.status(200).send(books);
};


export const createBook = async (req, res) => {
    const book = new Book({ ...req.body, seller: req.user.id});

    try {
        await book.save();
        return res.status(201).send(book);
    } catch (error) {
        return res.status(500).send('Could not save book');
    };
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

    try {
        const updatedBook = await Book.findOneAndUpdate({ _id: id, seller: req.user.id }, req.body);

        if (updatedBook) {
            return res.status(200).send('Book successfully updated!');
         } else {
            return res.status(404).send(`Could not update book with id: ${id}`);
         };
    } catch (error) {
        res.status(500).send('Something went wrong. Please try again!');
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
