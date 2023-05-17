import performRequest from "../../axios";

export const courseStageAPI = {
  getCourses: async (stageType) => {
    return await performRequest(`courses/stage/${stageType}`, "GET");
  },

  addCourseToWishListOrCart: async (id, stageType) => {
    return await performRequest(`course/stage/${id}`, "POST", {
      stage: stageType,
    });
  },

  removeFromWishListOrCart: async (id) => {
    return await performRequest(`course/stage/${id}`, "DELETE");
  },
};
