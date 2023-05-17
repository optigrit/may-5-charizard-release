import performRequest from "../../axios";

export const contestProblemAPI = {
  createProblem: async (id, body) => {
    return await performRequest(`problem/${id}`, "POST", body);
  },

  editProblem: async (id, body) => {
    return await performRequest(`problem/${id}`, "PATCH", body);
  },

  getProblem: async (id) => {
    return await performRequest(`problem/${id}`, "GET");
  },

  submitSolution: async (id, body) => {
    return await performRequest(`problem/${id}/submission`, "POST", body);
  },

  getSubmissions: async (id) => {
    return await performRequest(`problem/submissions/${id}`, "GET");
  },
};
