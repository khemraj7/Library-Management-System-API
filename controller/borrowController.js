const Borrow = require('../models/borrow');

// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const borrowRecord = new Borrow(req.body);
        await borrowRecord.save();
        res.status(201).json(borrowRecord);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Return a borrowed book
const returnBook = async (req, res) => {
    try {
        const borrowRecord = await Borrow.findOne({ userID: req.body.userID, bookID: req.body.bookID });
        if (!borrowRecord) {
            return res.status(404).json({ message: 'Borrow record not found' });
        }

        borrowRecord.returnDate = req.body.returnDate || Date.now();
        await borrowRecord.save();
        res.json(borrowRecord);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// List all borrowed books
const getBorrowedBooks = async (req, res) => {
    try {
        const borrowRecords = await Borrow.find({}).populate('userID bookID');
        res.json(borrowRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    borrowBook,
    returnBook,
    getBorrowedBooks
}
