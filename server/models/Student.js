import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rollNo: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    course: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1, max: 5 },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
