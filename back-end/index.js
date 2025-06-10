import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

// Routes
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import DashboardRoute from "./routes/DashboardRoute.js";
import OTPRoute from "./routes/OTPRoutes.js";
import EmailVerificationRoute from "./routes/EmailVerificationRoute.js";
import ForgotPasswordRoute from "./routes/ForgotPasswordRoute.js";
import PdfRoute from "./routes/pdfRoute.js";
import LaporanRoute from "./routes/LaporanRoute.js";
import KaryawanRoute from "./routes/KaryawanRoute.js";
import ChecklistRoute from "./routes/ChecklistRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  // Use force: true in development to reset tables on schema changes
  // await db.sync({ force: true }); 
  await db.sync();
})();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        secure: 'auto',
        // Set cookie expiry, e.g., 1 day
        maxAge: 24 * 60 * 60 * 1000 
    },
  })
);

// FIXED: Using standardized base paths for API routes
app.use(LaporanRoute);
app.use(UserRoute);
app.use(KaryawanRoute);
app.use(ChecklistRoute);
app.use(AuthRoute);
app.use(DashboardRoute);
app.use(OTPRoute);
app.use(EmailVerificationRoute);
app.use(ForgotPasswordRoute);
app.use(PdfRoute);

// store.sync(); // This is redundant if you already sync the db

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});