const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');

            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = await User.create({ email, password });

        console.log('New User created');
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            console.log('User not found');
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {

            console.log('Invalid credentials');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Only one response will be sent
        console.log('User logged in');

        return res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });


    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

exports.logout = (req, res) => {
    try {
       

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
