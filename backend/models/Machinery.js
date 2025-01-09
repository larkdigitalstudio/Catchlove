import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Machinery Schema
const machinerySchema = new Schema(
  {
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: 'Workshop', // References the Workshop model
      required: true, // Ensures the machine is linked to a workshop
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer', // References the Customer model
      required: true, // Ensures the machine is linked to a customer
    },
    assetType: {
      type: String,
      required: true, // Specifies the type of asset (e.g., Excavator, Forklift)
      trim: true,
    },
    serialNumber: {
      type: String,
      required: true, // Ensures serial number is mandatory
      unique: true, // Prevents duplication of serial numbers
      trim: true,
    },
    registration: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true, // Ensures the machine has a name
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    modelId: {
      type: String,
      trim: true,
    },
    modelNumber: {
      type: String,
      trim: true,
    },
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically sets the updated date
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Create the Machinery model
const Machinery = mongoose.model('Machinery', machinerySchema);

export default Machinery;
