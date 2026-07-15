import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET
);

let storage;

if (isCloudinaryConfigured) {
  // Configure Cloudinary SDK
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Configure Multer Storage for Cloudinary
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'real-estate-projects',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [{ width: 1200, crop: 'limit' }],
    },
  });
  console.log('[CLOUDINARY] Cloudinary initialized for direct asset uploads.');
} else {
  // Setup local uploads folder for fallback storage
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Fallback to local disk storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  console.log('[CLOUDINARY] Credentials not set in env. Falling back to local disk storage.');
}

export const upload = multer({ storage: storage });
export { cloudinary };
