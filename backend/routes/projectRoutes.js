import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { upload } from '../config/cloudinary.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define multer fields for image upload files
const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 }
]);

// Public routes for frontend visibility
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin-only protected dashboard CRUD routes
router.post('/', authenticateToken, uploadFields, createProject);
router.put('/:id', authenticateToken, uploadFields, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router;
