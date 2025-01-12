import Customer from "../models/Customer.js";
import Workshop from "../models/Workshops.js";
//import Workorder from "../models/Workorder"; commented out until workorder model is created
import bcrypt from "bcryptjs";



//update customer controller
export const updateCustomer = async (req, res) => {
  const {customerId} = req.params;  // customer ID is passed in the URL
  const {
    abn,
    name,
    email,
    password,
    website,
    address,
    phoneNumber,
    contacts,
  } = req.body;

  try {
    // Find the customer by their ID
    const customer = await Customer.findById(customerId);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Ensure ABN is not updated
    if (abn && abn !== customer.abn) {
      return res.status(400).json({ message: 'ABN cannot be changed.' });
    }

    // Check if the email is already registered with another customer
    if (email && email !== customer.email) {
      const existingCustomerWithEmail = await Customer.findOne({ email });
      if (existingCustomerWithEmail && existingCustomerWithEmail._id.toString() !== customer._id.toString()) {
        return res.status(400).json({ message: 'Email already registered with another customer.' });
      }
    }

    // Update the customer fields with the new values provided in the request body
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.password = password ? await bcrypt.hash(password, 10) : customer.password;  // Hash the password if provided
    customer.website = website || customer.website;
    customer.address = address || customer.address;
    customer.phoneNumber = phoneNumber || customer.phoneNumber;
    customer.contacts = contacts || customer.contacts;

    // Save the updated customer document
    await customer.save();

    // Respond with the updated customer info
    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// workshop update controller
export const updateWorkshop = async (req, res) => {
    const { workshopId } = req.params; // Workshop ID is passed in the URL
    const {
      logo,
      name,
      abn,
      password,
      website,
      address,
      phoneNumber,
    } = req.body;
  
    try {
      // Find the workshop by its ID
      const workshop = await Workshop.findById(workshopId);
  
      if (!workshop) {
        return res.status(404).json({ message: 'Workshop not found' });
      }
  
      // Ensure ABN is not updated
      if (abn && abn !== workshop.abn) {
        return res.status(400).json({ message: 'ABN cannot be changed.' });
      }
  
      // Update the workshop fields with the new values provided in the request body
      workshop.logo = logo || workshop.logo;
      workshop.name = name || workshop.name;
      workshop.password = password ? await bcrypt.hash(password, 10) : workshop.password; // Hash the password if provided
      workshop.website = website || workshop.website;
      workshop.address = address || workshop.address;
      workshop.phoneNumber = phoneNumber || workshop.phoneNumber;
  
      // Save the updated workshop document
      await workshop.save();
  
      // Respond with the updated workshop info
      res.status(200).json({ message: 'Workshop updated successfully', workshop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };