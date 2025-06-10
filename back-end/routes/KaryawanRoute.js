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

router.get("/", verifyUser, getLaporans);
router.get("/:id", verifyUser, getLaporanById);
router.post("/", verifyUser, createLaporan);
router.patch("/:id", verifyUser, updateLaporan);
router.delete("/:id", verifyUser, deleteLaporan);

export default router;