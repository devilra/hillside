import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectVideos,
  deleteUploadedVideo,
  deleteUploadedMainImage,
  deleteUploadedGalleryImage,
  uploadMainImage,
  uploadGalleryImages,
} from "../controllers/projectController.js";
import { upload } from "../config/cloudinary.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import uploadVideo from "../middleware/videoUpload.js";
import uploadImage from "../middleware/imageUpload.js";

const router = express.Router();

// Define multer fields for image upload files
const uploadFields = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 30 },
]);

// Public routes for frontend visibility
router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post(
  "/upload-videos",
  authenticateToken,
  uploadVideo.array("videos", 20),
  uploadProjectVideos,
);
router.delete("/delete-video", authenticateToken, deleteUploadedVideo);
// Admin-only protected dashboard CRUD routes
router.post("/", authenticateToken, createProject);
router.post(
  "/upload-main-image",
  authenticateToken,
  uploadImage.single("mainImage"),
  uploadMainImage,
);

router.post(
  "/upload-gallery-images",
  authenticateToken,
  uploadImage.array("galleryImages", 30),
  uploadGalleryImages,
);
router.delete("/delete-main-image", authenticateToken, deleteUploadedMainImage);

router.delete(
  "/delete-gallery-image",
  authenticateToken,
  deleteUploadedGalleryImage,
);
router.put("/:id", authenticateToken, updateProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;
