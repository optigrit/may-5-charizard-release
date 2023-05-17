import performRequest from "../../axios";

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

  searchUser: async (id, searchField, name, filterSearch) => {
    return await performRequest(
      `user/contest/${id}?search=${searchField}&${name}=${filterSearch}`,
      "GET"
    );
  },
};
