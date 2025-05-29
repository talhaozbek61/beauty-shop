import bcrypt from "bcryptjs";

import User from "../models/user-model.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    generateJWTToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log(`Error in create user: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateJWTToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "Sign In Successful",
    });
  } catch (error) {
    console.log(`Error in Sign In: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Sign Out successfully" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log(`Error in Checking Auth: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
