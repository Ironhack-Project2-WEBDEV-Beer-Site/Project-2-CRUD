const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
