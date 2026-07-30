import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const mainDir = path.join(process.cwd(), "public", "uploads", "images", "main");

const galleryDir = path.join(
  process.cwd(),
  "public",
  "uploads",
  "images",
  "gallery",
);

fs.mkdirSync(mainDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });

const allowedImageTypes = [
  // JPEG
  "image/jpeg",
  "image/jpg",

  // PNG
  "image/png",

  // WebP
  "image/webp",

  // AVIF
  "image/avif",

  // TIFF
  "image/tiff",

  // BMP
  "image/bmp",

  // HEIC / HEIF
  "image/heic",
  "image/heif",

  // DJI RAW / Adobe DNG
  "image/x-adobe-dng",
  "image/dng",
  "application/x-adobe-dng",
];

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".bmp",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
  ".dng",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "mainImage") {
      cb(null, mainDir);
    } else {
      cb(null, galleryDir);
    }
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const fileName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedExtensions.includes(extension)
  ) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, AVIF, BMP, TIFF, HEIC, HEIF and DNG images are allowed.",
    ),
    false,
  );
};

const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    files: 31,
    fileSize: 100 * 1024 * 1024,
  },
});

export default uploadImage;
