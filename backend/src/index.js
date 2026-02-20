import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import job from "./lib/crons.js";

dotenv.config();

console.log("Starting backend...");

import authRoutes from "./routes/authRoutes.js";
import conditionRoutes from "./routes/conditionRoutes.js";

import { connectDB } from "./lib/db.js";

console.log("Routes imported successfully");

const app = express();
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/conditions", conditionRoutes);

console.log("Routes registered");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
