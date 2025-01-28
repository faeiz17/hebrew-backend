import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story", required: true },
  question: { type: String, required: true },
  options: [
    {
      hebrew: { type: String, required: true },
      english: { type: String, required: true },
      isCorrect: { type: Boolean, required: true ,default:false },
    },
  ],
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
});

// ✅ Use `export default` instead of `module.exports`
export default mongoose.model("Exercise", ExerciseSchema);
