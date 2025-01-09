import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Customer Schema
const customerSchema = new Schema(
  {
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: 'Workshop',  // References the Workshop model
      required: true, // Ensures the customer is associated with a specific workshop
    },
    abn: {
      type: String,
      required: true,
      unique: true,  // Ensures each customer has a unique ABN
    },
    name: {
      type: String,
      required: true,  // Ensures a customer name is provided
      trim: true,  // Removes extra spaces
    },
    website: {
      type: String,
      match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-]*)*$/, // Validates a URL format
    },
    address: {
      streetNumber: { type: String},
      streetName: { type: String},
      suburb: { type: String},
      state: { type: String},
      postCode: { type: String},
      country: { type: String},
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,  // Example validation for Australian phone numbers (10 digits)
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensures the email is unique
      lowercase: true,  // Converts email to lowercase
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, // Email validation regex
    },
    username: {
      type: String,
      required: true,
      unique: true,  // Ensures unique username
      trim: true, // Removes extra spaces
    },
    password: {
      type: String,
      required: true, // The password will be hashed before storing
    },
    contacts: [
      {
        firstName: { type: String},
        lastName: { type: String},
        position: { type: String},
        phoneNumber: {
          type: String,
          match: /^[0-9]{10}$/,  // Phone number validation
        },
        email: {
          type: String,
          match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, // Email validation
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically sets the updated date
    },
  },
  { timestamps: true } // Automatically handles 'createdAt' and 'updatedAt'
);

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
