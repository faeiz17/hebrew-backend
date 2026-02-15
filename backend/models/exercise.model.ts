import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOption {
  hebrew: string;
  english: string;
  isCorrect: boolean;
}

export interface IExercise extends Document {
  _id: mongoose.Types.ObjectId;
  storyId: mongoose.Types.ObjectId;
  question: string;
  options: IOption[];
  level: "easy" | "medium" | "hard";
}

const ExerciseSchema = new Schema<IExercise>({
  storyId: { type: Schema.Types.ObjectId, ref: "Story", required: true },
  question: { type: String, required: true },
  options: [
    {
      hebrew: { type: String, required: true },
      english: { type: String, required: true },
      isCorrect: { type: Boolean, required: true, default: false },
    },
  ],
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
});

const Exercise: Model<IExercise> = mongoose.model<IExercise>("Exercise", ExerciseSchema);
export default Exercise;
