import performRequest from "../axios";

export const coursesAPI = {
    createCourse: async (body) => {
        let res = await performRequest("course", "POST", body)
        return res
    },
    updateCourse: async (body, id) => {
        let res = await performRequest(`course/${id}`, "PATCH", body)
        return res
    },
    updateImageAndTrailer: async(body, id) => {
        let res = await performRequest(`course/links/${id}`, "PATCH", body)
        return res
    },
    getSpecificCourse: async (id) => {
        let res = await performRequest(`course/${id}`, "GET")
        return res
    },
    updateCourseStatus: async (body, id) => {
        let res = await performRequest(`updateStatus/${id}`, "PATCH", body)
        return res
    },
    removeFromWishList: async (id) => {
        let res = await performRequest(`course/stage/${id}`, "DELETE")
        return res
    },
    removeCourseFromCart: async (id) => {
        let res = await performRequest(`course/stage/${id}`, "DELETE")
        return res
    },
    getCoursePrices: async () => {
        let res = await performRequest(`price`, "GET")
        return res
    },
    getCourses: async (stageType) => {
        let res = await performRequest(`courses/stage/${stageType}`, "GET")
        return res
    },
    addCourseToWishListOrCart: async (stageType, id) => {
        let res = await performRequest(`course/stage/${id}`, "POST", {stage: stageType})
        return res
    },
    getCoursesByPage: async (id) => {
        let res = await performRequest(`courses/${id}`, "GET")
        return res
    },
}