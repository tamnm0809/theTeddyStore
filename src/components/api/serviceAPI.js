import axiosClient from "./axiosClient";

const serviceAPI = {
    async getAll(page, size) {
        const url = `getAllServiceV1?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async updateService(data) {
        const url = `updateService`;
        return await axiosClient
            .post(url, data);
    },
    async delete(id) {
        const url = `deleteService/${id}`;
        return await axiosClient
            .delete(url);
    },
    async searchService(textSearch) {
        const url = `searchService/${textSearch}`;
        return await axiosClient
            .get(url);
    },
};

export default serviceAPI; 