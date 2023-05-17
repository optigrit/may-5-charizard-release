import performRequest from "../../axios";

export const courseAPI = {
  createCourse: async (body) => {
    return await performRequest("course", "POST", body);
  },

  updateCourse: async (body, id) => {
    return await performRequest(`course/${id}`, "PATCH", body);
  },

  getSpecificCourse: async (id) => {
    return await performRequest(`course/${id}`, "GET");
  },

  updateImageAndTrailer: async (body, id) => {
    return await performRequest(`course/links/${id}`, "PATCH", body);
  },

  updateCourseStatus: async (body, id) => {
    return await performRequest(`updateStatus/${id}`, "PATCH", body);
  },

  getCoursesByPage: async (id) => {
    return await performRequest(`courses/${id}`, "GET");
  },

  searchCourse: async (searchKeyword) => {
    return await performRequest(`courses/1?search=${searchKeyword}`, "GET");
  },

  deleteCourse: async (id) => {
    return await performRequest(`course/${id}`, "DELETE");
  },

  getUserCourses: async (page) => {
    return await performRequest(`user/courses/${page}`, "GET");
  },
};
