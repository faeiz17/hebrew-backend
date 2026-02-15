import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStory extends Document {
    _id: mongoose.Types.ObjectId;
    titleHebrew: string;
    titleEnglish: string;
    contentHebrew: string;
    contentEnglish: string;
    transliteration?: string;
    level: "easy" | "medium" | "hard";
}

const StorySchema = new Schema<IStory>({
    titleHebrew: { type: String, required: true },
    titleEnglish: { type: String, required: true },
    contentHebrew: { type: String, required: true },
    contentEnglish: { type: String, required: true },
    transliteration: { type: String, required: false },
    level: { type: String, enum: ["easy", "medium", "hard"], required: true },
});

const Story: Model<IStory> = mongoose.model<IStory>("Story", StorySchema);
export default Story;
