import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';
import Workshop from '../models/Workshops.js';
import express from 'express';

// Customer login controller
export const CustLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email});
    if (!customer) {
        console.log("Customernotfound");
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
    console.log(req.body);
    const { email, password } = req.body;
    console.log(req.body);
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

// register customer controller
export const registerCustomer = async (req, res) => {
    const { email, password, name, phoneNumber, workshopId, abn, address, website, contacts } = req.body;
  
    try {
      // Check if the email or ABN is already registered
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Customer already registered with this email.' });
      }
  
      const existingABN = await Customer.findOne({ abn });
      if (existingABN) {
        return res.status(400).json({ message: 'Customer already registered with this ABN.' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new customer instance
      const newCustomer = new Customer({
        workshopId,
        abn,
        email,
        password: hashedPassword,
        name,
        phoneNumber,
        address: {
          streetNumber: address?.streetNumber,
          streetName: address?.streetName,
          suburb: address?.suburb,
          state: address?.state,
          postCode: address?.postCode,
          country: address?.country,
        },
        website,
        contacts: contacts || [], // Default to an empty array if not provided
      });
  
      // Save the customer to the database
      await newCustomer.save();
  
      res.status(201).json({ message: 'Customer registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  // register workshop controller
  export const registerWorkshop = async (req, res) => {
    const { email, password, name, abn, phoneNumber, address } = req.body;
  
    // Log the request body for debugging
    console.log(req.body);
  
    // Validate required fields
    if (!email || !password || !name || !abn || !phoneNumber || !address) {
      return res.status(400).json({ message: 'All fields, including address, are required.' });
    }
  
    // Validate address fields
    const { streetNumber, streetName, suburb, state, postCode, country } = address;
    if (!streetNumber || !streetName || !suburb || !state || !postCode || !country) {
      return res.status(400).json({ message: 'Complete address details are required.' });
    }
  
    try {
      // Check if the email is already registered
      const existingWorkshop = await Workshop.findOne({ email });
      if (existingWorkshop) {
        return res.status(400).json({ message: 'Workshop already registered with this email.' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new workshop instance
      const newWorkshop = new Workshop({
        email,
        password: hashedPassword,
        name,
        abn,
        phoneNumber,
        address: {
          streetNumber,
          streetName,
          suburb,
          state,
          postCode,
          country,
        },
      });
  
      // Save the workshop to the database
      await newWorkshop.save();
  
      res.status(201).json({ message: 'Workshop registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  