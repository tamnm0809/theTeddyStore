import axiosClient from "./axiosClient";

const categoryAPI = {
    async getAll(page, size) {
        const url = `getAllCategory?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async updateCategory(data) {
        const url = `updateCategory`;
        return await axiosClient
            .post(url, data);
    },
    async searchCategory(data) {
        const url = `searchCategory`;
        return await axiosClient
            .post(url, data);
    },
    async getAllActive() {
        const url = `getAllCategoryActive`;
        return await axiosClient
            .get(url);
    }
};

export default categoryAPI;