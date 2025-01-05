const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Add User Function
const addUser = async () => {
    try {
        // User details
        const name = 'Luna';
        const email = 'luna@example.com';
        const password = 'Luna13!';
        const role = 'student'; // Change to 'teacher' or 'student' as needed

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save user to database
        await newUser.save();
        console.log('User added successfully');
        process.exit(0); // Exit script
    } catch (error) {
        console.error('Error adding user:', error.message);
        process.exit(1); // Exit script with failure
    }
};

// Run the functions
connectDB().then(addUser);
