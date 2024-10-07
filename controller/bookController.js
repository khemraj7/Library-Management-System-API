const Book = require('../models/book');

// Add a new book
const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const books = await Book.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update book details
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}