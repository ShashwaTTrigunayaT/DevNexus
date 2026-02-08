const express = require('express');
const USER = require('../models/userModel');
const { uploadToCloudinary } = require("../utils/cloudinaryUpload");
const { createHmac } = require("crypto");
async function getProfile(req, res) {
    try {
        const userId = req.user._id;
        const user = await USER.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch profile" });
    }
}
async function updateProfile(req, res) {
    try {
        console.log("Update Profile Request Body:", req.body);
        const userId = req.user._id;
        const { name, profileImage, bio, role, skills, githubLink } = req.body;
        let newProfileImageURL = profileImage;


        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            newProfileImageURL = result.secure_url;
        }
        
        let skillsFinal = skills;
        if (typeof skills === "string") {
            try {
                skillsFinal = JSON.parse(skills);
            } catch (e) {
                skillsFinal = skills;
            }
        }
        const updatedUser = await USER.findByIdAndUpdate(userId, { name, profileImage: newProfileImageURL, bio, role, skills: skillsFinal, githubLink }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update profile" });
    }
}


async function changePassword(req, res) {
    console.log("Change Password Request Body:", req.body);
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const user = await USER.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ verify current password
    const currentHash = createHmac("sha256", user.salt)
      .update(currentPassword)
      .digest("hex");

    if (currentHash !== user.password) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // ✅ set new password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully " });
  } catch (err) {
     console.log(err);
    return res.status(500).json({ error: err.message });
 
  }
}
async function getProfilebyuserID(req, res) {
    console.log("Get Profile by UserID Request Params:", req.params);
    try {
        const userId = req.params.userID;
        const user = await USER.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch profile" });
    }
}

module.exports = { getProfile, updateProfile, changePassword, getProfilebyuserID };
