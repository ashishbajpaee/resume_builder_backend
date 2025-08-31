import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { 
  createResume, 
  deleteResume, 
  getResumeById, 
  getUserResume, 
  updateResume 
} from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';

const resumeRouter = express.Router();

resumeRouter.post('/', protect, createResume);
resumeRouter.get('/', protect, getUserResume);
resumeRouter.get('/:id', protect, getResumeById);

resumeRouter.put('/:id', protect, updateResume);
resumeRouter.put('/:id/upload-image', protect, uploadResumeImages);

resumeRouter.delete('/:id', protect, deleteResume);

export default resumeRouter;
