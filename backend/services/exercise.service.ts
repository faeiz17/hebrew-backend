import { Exercise, IExercise, Story } from "../models/index.js";

export class ExerciseService {
    async createExercise(exerciseData: Partial<IExercise>): Promise<IExercise> {
        const story = await Story.findById(exerciseData.storyId);
        if (!story) {
            throw new Error("Story not found");
        }

        if (story.level !== exerciseData.level) {
            throw new Error("Exercise level does not match story level");
        }

        return Exercise.create(exerciseData);
    }

    async getAllExercises(): Promise<IExercise[]> {
        return Exercise.find()
            .populate("storyId", "hebrew english transliteration")
            .lean()
            .exec();
    }

    async getExercisesByLevel(level: string): Promise<IExercise[]> {
        return Exercise.find({ level })
            .populate("storyId", "hebrew english transliteration")
            .lean()
            .exec();
    }

    async getExercisesByStoryId(storyId: string): Promise<IExercise[]> {
        return Exercise.find({ storyId })
            .populate("storyId", "hebrew english transliteration")
            .lean()
            .exec();
    }

    async getExerciseById(id: string): Promise<IExercise | null> {
        return Exercise.findById(id)
            .populate("storyId", "hebrew english transliteration")
            .lean()
            .exec();
    }

    async updateExercise(id: string, exerciseData: Partial<IExercise>): Promise<IExercise | null> {
        return Exercise.findByIdAndUpdate(id, exerciseData, {
            new: true,
            runValidators: true,
        }).exec();
    }

    async deleteExercise(id: string): Promise<boolean> {
        const result = await Exercise.findByIdAndDelete(id);
        return !!result;
    }
}

export const exerciseService = new ExerciseService();
