import Customer from "../models/Customer.js";
//import Workorder from "../models/Workorder.js"; commented out until workorder model is created
import bcrypt from "bcryptjs";

// add customer controller
// used to add customer from workshop portal, generates customer a generic login with their email and password being the same as their workshopId
export const addCustomer = async (req, res) => {
    const { workshopId, abn, name, email, password, website, address, phoneNumber, contacts } = req.body;
  
    try {
      // Validate required fields
      if (!workshopId || !abn || !name || !email) {
        return res.status(400).json({ message: 'Workshop ID, ABN, Name, Email, and Password are required.' });
      }
  
      // Check if the ABN is already registered
      const existingCustomer = await Customer.findOne({ abn });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Customer already registered with this ABN.' });
      }
  
      // Set password to workshopId by default if not provided
      const finalPassword = password || workshopId.toString(); // Using workshopId as password if not provided
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(finalPassword, salt);
  
      // Create a new customer instance
      const newCustomer = new Customer({
        workshopId,
        abn,
        name,
        email,
        password: hashedPassword,
        website: website || '',
        address: address || {},
        phoneNumber: phoneNumber || '',
        contacts: contacts || [],
      });
  
      // Save the new customer to the database
      await newCustomer.save();
  
      // Respond with success
      res.status(201).json({ message: 'Customer added successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };