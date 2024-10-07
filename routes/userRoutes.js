const express = require('express');
const router = express.Router();
const { registerUser, getUsers, loginUser, getUserById, updateUser, deleteUser } = require('../controller/userController');

router.post('/', registerUser)
router.get('/', getUsers)
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
