import express from "express";
import {
  getLaporans,
  getLaporanById,
  createLaporan,
  updateLaporan,
  deleteLaporan,
} from "../controllers/LaporanController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// FIXED: Standardized API path
router.get('/laporans', verifyUser, getLaporans);
router.get('/laporans/:id', verifyUser, getLaporanById);
router.post('/laporans', verifyUser, createLaporan);
router.patch('/laporans/:id', verifyUser, updateLaporan);
router.delete('/laporans/:id', verifyUser, deleteLaporan);

export default router;