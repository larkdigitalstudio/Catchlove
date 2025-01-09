import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workshopSchema = new Schema(
  {
    logo: {
      type: String
    },
    name: {
      type: String,
      required: true, // Ensures name is provided
      trim: true, // Removes extra spaces before and after the name
    },
    abn: {
      type: String,
      required: true, // Ensures ABN is provided
      unique: true, // Ensures ABN is unique in the system
    },
    address: {
      streetNumber: {
        type: String,
        required: true,
      },
      streetName: {
        type: String,
        required: true,
      },
      suburb: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      lowercase: true, // Makes email lowercase for consistency
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, // Validates email format
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensures username is unique
      trim: true, // Trims extra spaces from username
    },
    password: {
      type: String,
      required: true, // Password should be hashed before saving to the database
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the last update date
    },
  },
  { timestamps: true } // Mongoose automatically adds 'createdAt' and 'updatedAt' fields
);

// Create the Workshop model
const Workshop = mongoose.model('Workshop', workshopSchema);

export default Workshop;