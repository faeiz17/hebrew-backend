import { Story, IStory } from "../models/index.js";

export class StoryService {
    async createStory(storyData: Partial<IStory>): Promise<IStory> {
        return Story.create(storyData);
    }

    async getAllStories(): Promise<IStory[]> {
        return Story.find().lean().exec();
    }

    async getStoriesByLevel(level: string): Promise<IStory[]> {
        return Story.find({ level }).lean().exec();
    }

    async getStoryById(id: string): Promise<IStory | null> {
        return Story.findById(id).lean().exec();
    }

    async updateStory(id: string, storyData: Partial<IStory>): Promise<IStory | null> {
        return Story.findByIdAndUpdate(id, storyData, {
            new: true,
            runValidators: true,
        }).exec();
    }

    async deleteStory(id: string): Promise<boolean> {
        const result = await Story.findByIdAndDelete(id);
        return !!result;
    }
}

export const storyService = new StoryService();
