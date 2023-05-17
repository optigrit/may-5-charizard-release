import performRequest from "../../axios";

export const contestRankAPI = {
  getContestRanks: async (id, page) => {
    return await performRequest(`contest/${id}/ranks/${page}`, "GET");
  },

  getGlobalRanks: async (page) => {
    return await performRequest(`globalrankings/DEV/${page}`);
  },
};
