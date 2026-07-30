import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDir = path.join(process.cwd(), "public", "uploads", "videos");

// Create directory automatically
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed video formats
const allowedVideoTypes = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
  "video/x-msvideo", // .avi
  "video/x-matroska", // .mkv
];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    // Generate unique filename
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${extension}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedVideoTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only MP4, WEBM, MOV, AVI and MKV video files are allowed."),
      false,
    );
  }
  cb(null, true);
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    files: 20,
    fileSize: 500 * 1024 * 1024,
  },
});

export default uploadVideo;
