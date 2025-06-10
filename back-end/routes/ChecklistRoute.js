import express from 'express';
// FIXED: Implemented full CRUD routes for Checklists
import {
    getChecklists,
    getChecklistById,
    createChecklist,
    updateChecklist,
    deleteChecklist,
} from '../controllers/ChecklistController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/checklists', verifyUser, getChecklists);
router.get('/checklists/:id', verifyUser, getChecklistById);
router.post('/checklists', verifyUser, createChecklist);
router.patch('/checklists/:id', verifyUser, updateChecklist);
router.delete('/checklists/:id', verifyUser, deleteChecklist);

export default router;