const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// Register a new user
const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users (with pagination)
const getUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const users = await User.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login and JWT token generation
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get user By id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user details
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'user not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'user removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    getUsers,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
}