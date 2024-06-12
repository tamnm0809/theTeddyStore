import axiosClient from "./axiosClient";

const rateAPI = {
  async getRatesPagination(params) {
    const url = `rates`;
    return await axiosClient.get(url, { params });
  },
  async deleteRate(id) {
    const url = `rates/${id}`;
    return await axiosClient.delete(url);
  },
};

export default rateAPI;
