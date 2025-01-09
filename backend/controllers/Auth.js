import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';
import Workshop from '../models/Workshops.js';
import e from 'express';

// Customer login controller
export const CustLogin = async (req, res) => {
  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email});
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create a JWT token
    const token = jwt.sign({ id: customer._id, email:customer.email }, process.env.JWT_SECRET, {expiresIn: '1h' });
    res.status(200).json({message:"Login Successful", token });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Workshop login controller
export const WorkLogin = async (req, res) => {
  try {
    // Find the workshop by email
    const workshop = await Workshop.findOne({ email });
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    // Compare the password
    const isMatch = await bcrypt.compare(password, workshop.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create a JWT token
    const token = jwt.sign({ id: workshop._id, email: workshop.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.status(200).json({ message: 'Login Successful', token });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
}
