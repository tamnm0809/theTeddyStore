import axiosClient from "./axiosClient";

const sizeAPI = {
    async getAll(page, size) {
        const url = `getAllSize?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async updateSize(data) {
        const url = `updateSize`;
        return await axiosClient
            .post(url, data);
    },
    async searchSize(data) {
        const url = `searchSize`;
        return await axiosClient
            .post(url, data);
    },
    async getAllActive() {
        const url = `getAllSizeV1`;
        return await axiosClient
            .get(url);
    }
};

export default sizeAPI;