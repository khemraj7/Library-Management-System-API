const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Borrow', borrowSchema);
