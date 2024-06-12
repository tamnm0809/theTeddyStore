import axiosClient from "./axiosClient";

const customerAPI = {
  async getCustomers(params) {
    const url = `customers`;
    return await axiosClient.get(url, { params });
  },
  async updateActiveCustomer(data) {
    const url = `customers/active`;
    return await axiosClient.post(url, data);
  },
};

export default customerAPI;
