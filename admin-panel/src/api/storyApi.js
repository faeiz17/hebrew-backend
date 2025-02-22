import API from "./axiosInstance";

// CRUD for Stories
export const getStories = async () => (await API.get("/stories")).data;
export const getStoryById = async (id) =>
  (await API.get(`/stories/${id}`)).data;
export const getStoriesByLevel = async (level) =>
  (await API.get(`/stories/level/${level}`)).data;
export const createStory = async (storyData) =>
  (await API.post("/stories", storyData)).data;
export const updateStory = async (id, storyData) =>
  (await API.put(`/stories/${id}`, storyData)).data;
export const deleteStory = async (id) =>
  (await API.delete(`/stories/${id}`)).data;
