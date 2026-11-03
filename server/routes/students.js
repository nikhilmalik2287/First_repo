import { Router } from "express";
import Student from "../models/Student.js";

const router = Router();

// GET /api/students?search=abc  -> list (optionally filtered)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { rollNo: { $regex: search, $options: "i" } },
            { course: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/students/:id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

// POST /api/students
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Roll number already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/students/:id
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Roll number already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/students/:id
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

export default router;
