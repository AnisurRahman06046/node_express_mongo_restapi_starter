import { Schema, model, Document } from "mongoose";
import { IUser, UserStatus } from "./User.interfaces";

// Define the Mongoose schema for IUser
const userSchema = new Schema<IUser & Document>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is missing'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is missing'],
    },
    userName: {
      type: String,
      required: [true, 'User Name is missing'],
      unique: true, // Ensure unique usernames
    },
    email: {
      type: String,
      required: [true, 'Email is missing'],
      unique: true, // Ensure unique emails
      match: [/\S+@\S+\.\S+/, 'Email is invalid'], // Simple email validation
    },
    password: {
      type: String,
      required: [true, 'Password is missing'],
    },
    presentAddress: {
      type: {
        street: String,
        city: String,
        state: String,
        postCode: String,
        country: String,
      },
      required: false,
    },
    permanentAddress: {
      type: {
        street: String,
        city: String,
        state: String,
        postCode: String,
        country: String,
      },
      required: false,
    },
    contactInfo: {
      type: {
        phoneNumber: String,
        emergencyContact: String,
      },
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.PENDING,
    },
    passwordChangedCount: {
      type: Number,
      default: 0,
    },
    passwordHistory: [
      {
        oldPassword: String,
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    loginCount: {
      type: Number,
      default: 0,
    },
    loginHistory: [
      {
        ipAddress: String,
        loginAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model based on the schema
export const User = model<IUser & Document>('User', userSchema);
