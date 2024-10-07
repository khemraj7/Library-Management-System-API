const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan')
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

//check logs
app.use(morgan('common'))

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/borrow', borrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
