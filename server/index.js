import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import studentRoutes from "./routes/students.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Student Management API is running"));
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdb";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
