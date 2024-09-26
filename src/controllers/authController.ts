import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Searching for the admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password' });
    }

    // Verifying the password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password' });
    }

    // Generating JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Creating the new admin
    const newAdmin = new Admin({
      username,
      password, // Пароль здесь не нужно хешировать
    });

    // Saving the new admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
