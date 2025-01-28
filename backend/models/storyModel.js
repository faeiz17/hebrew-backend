import mongoose from "mongoose";

const StorySchema = new mongoose.Schema({
    hebrew: { type: String, required: true },
    english: { type: String, required: true },
    transliteration: { type: String, required: true },
    level: { type: String, enum: ["easy", "medium", "hard"], required: true },
});

// ✅ Use `export default` instead of `module.exports`
export default mongoose.model("Story", StorySchema);
