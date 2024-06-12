import axiosClient from "./axiosClient";

const bannerAPI = {
  async getBanners() {
    const url = `banners`;
    return await axiosClient.get(url);
  },
  async addBanner(params) {
    const url = `banners`;
    return await axiosClient.post(url, params);
  },
  async deleteBanner(id) {
    const url = `banners/${id}`;
    return await axiosClient.delete(url);
  },
};

export default bannerAPI;
