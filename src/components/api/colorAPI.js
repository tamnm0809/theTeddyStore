import axiosClient from "./axiosClient";

const colorAPI = {
    async getAll(page, size) {
        const url = `getAllColor?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async updateColor(data) {
        const url = `updateColor`;
        return await axiosClient
            .post(url, data);
    },
    async searchColor(data) {
        const url = `searchColor`;
        return await axiosClient
            .post(url, data);
    },
    async getAllActive() {
        const url = `getAllColorV1`;
        return await axiosClient
            .get(url);
    }
};

export default colorAPI;