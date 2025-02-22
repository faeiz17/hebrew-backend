import API from "./axiosInstance";

// CRUD for Exercises
export const getExercises = async () => (await API.get("/exercises")).data;
export const getExerciseById = async (id) =>
  (await API.get(`/exercises/${id}`)).data;
export const getExercisesByLevel = async (level) =>
  (await API.get(`/exercises/level/${level}`)).data;
export const getExercisesByStoryId = async (storyId) =>
  (await API.get(`/exercises/story/${storyId}`)).data;
export const createExercise = async (exerciseData) =>
  (await API.post("/exercises", exerciseData)).data;
export const updateExercise = async (id, exerciseData) =>
  (await API.put(`/exercises/${id}`, exerciseData)).data;
export const deleteExercise = async (id) =>
  (await API.delete(`/exercises/${id}`)).data;
