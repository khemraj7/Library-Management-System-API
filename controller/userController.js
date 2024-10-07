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

module.exports = {
    registerUser,
    getUsers,
    loginUser
}