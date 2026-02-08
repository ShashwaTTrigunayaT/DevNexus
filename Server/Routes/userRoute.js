const express = require('express');
const USER=require('../models/userModel');
const {handleUserSignup,handleUserSignin}=require("../service/auth");
const { isLoggedIn }=require("../middleware/auth");
const { get } = require('mongoose');
const {getProfile,updateProfile}=require("../Controllers/userController");
const {getProfilebyuserID}=require("../Controllers/userController");
const {changePassword}=require("../Controllers/userController");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile-images", 
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};



const router = express.Router();

router.post('/register', handleUserSignup);
router.post('/login', handleUserSignin);
router.get("/", isLoggedIn("token"),(req, res) => res.json({ user: req.user }));
router.get("/profile", isLoggedIn("token"),getProfile);
router.patch("/profile",isLoggedIn("token"), upload.single("profileImage"),updateProfile);
router.patch("/password", isLoggedIn("token"), changePassword);

router.get("/:userID", isLoggedIn("token"), getProfilebyuserID);




router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});



module.exports = router;
          