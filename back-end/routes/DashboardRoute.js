import express from "express";
import {
  getIncomeTotal,
  getExpenseTotal,
  getBalance,
  getRecentActivities,
  getMonthlySummary,
  getTransactionHistory,
  getMonthlyComparison,
  getChecklists
} from "../controllers/Dashboard.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/income-total", verifyUser, getIncomeTotal);
router.get("/expense-total", verifyUser, getExpenseTotal);
router.get("/balance", verifyUser, getBalance);
router.get("/recent-activities", verifyUser, getRecentActivities);
router.get("/monthly-summary", verifyUser, getMonthlySummary);
router.get("/transaction-history", verifyUser, getTransactionHistory);
router.get("/monthly-comparison", verifyUser, getMonthlyComparison);
router.get("/checklists", verifyUser, getChecklists);

export default router;