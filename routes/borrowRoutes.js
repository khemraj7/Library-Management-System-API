const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getBorrowedBooks } = require('../controller/borrowController');
const auth = require('../middleware/authMiddleware');


router.post('/', auth, borrowBook)
router.get('/', auth, getBorrowedBooks)
router.post('/return', auth, returnBook);

module.exports = router;
