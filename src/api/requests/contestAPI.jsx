import performRequest from "../axios";

export const contestAPI = {
  getContest: async (id) => {
    return await performRequest(`contest/${id}`, "GET");
  },

  getContests: async () => {
    return await performRequest("contest", "GET");
  },

  getUserContests: async () => {
    return await performRequest("user/contest/0", "GET");
  },

  createContest: async (body) => {
    return await performRequest("contest", "POST", body);
  },

  editContest: async (id, body) => {
    return await performRequest(`contest/${id}`, "PATCH", body);
  },

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

  getContestRanks: async (id, page) => {
    return await performRequest(`contest/${id}/ranks/${page}`, "GET");
  },

  getGlobalRanks : async (page) => {
    return await performRequest(`globalrankings/DEV/${page}`)
  },

  createAnnouncement: async (id, body) => {
    return await performRequest(`announcements/${id}`, "POST", body);
  },

  getAnnouncements: async (id) => {
    return await performRequest(`announcements/${id}`, "GET");
  },

  searchUser: async (id, searchField, name, filterSearch) => {
    return await performRequest(`user/contest/${id}?search=${searchField}&${name}=${filterSearch}`, "GET");
  }
};