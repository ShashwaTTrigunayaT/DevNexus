const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profile-images" },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

module.exports = { uploadToCloudinary };
