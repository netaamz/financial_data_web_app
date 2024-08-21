import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jwt
import { UserModel } from '../models/Users.js';

const router = express.Router();

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Route
router.post('/', async (req, res) => {
  const { password, email, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new UserModel({ password: hashedPassword, email, name });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return user info and token
    res.json({
      message: 'Login successful',
      token, // Include the token in the response
      user: { id: user._id, name: user.name, email: user.email } // Include user info
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login', error });
  }
});

export default router;
