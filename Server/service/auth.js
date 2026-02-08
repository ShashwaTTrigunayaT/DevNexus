const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel"); // Changed USER to User for consistency
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Helper to Create Token
function createUserToken(user) {
    const Payload = {
        _id: user._id,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    };
    return jwt.sign(Payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// Helper to Validate Token
function validateToken(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

   

    await User.create({
      name,
      email,
      password,
      
    });

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (error) {
    console.error("Error in handleUserSignup:", error);
    if (error.code === 11000) {
        return res.status(409).json({ message: "User already exists with this email" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleUserSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }
        
        const user = await User.matchPassword(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = createUserToken(user);
        if (!token) {
            return res.status(500).json({ error: 'Error creating token' });
        }

        const name = user.name;
        const profileImage = user.profileImage;

        // FIXED: Cookie settings for Localhost
        return res.cookie("token", token, {
            httpOnly: true,
            secure: false, // <--- MUST BE FALSE FOR LOCALHOST
            sameSite: "lax", // <--- BETTER FOR LOCALHOST
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .json({
            message: "Login successful",
            token,
            user: { // Structured neatly
                name,
                profileImage,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleUserSignin,
    createUserToken,
    validateToken,
    handleUserSignup
};