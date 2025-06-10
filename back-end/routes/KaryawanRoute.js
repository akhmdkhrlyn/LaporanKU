import express from "express";
import {
  getKaryawans,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
} from "../controllers/KaryawanController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/karyawans', verifyUser, getKaryawans);
router.get('/karyawans/:id', verifyUser, getKaryawanById);
router.post('/karyawans', verifyUser, createKaryawan);
router.patch('/karyawans/:id', verifyUser, updateKaryawan);
router.delete('/karyawans/:id', verifyUser, deleteKaryawan);

export default router;