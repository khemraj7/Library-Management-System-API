const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addBook)
router.get('/', getBooks)
router.get('/:id', getBookById)
router.put('/:id', auth, updateBook)
router.delete('/:id', auth, deleteBook);


module.exports = router;
