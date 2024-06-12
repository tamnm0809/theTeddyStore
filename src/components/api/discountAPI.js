import axiosClient from "./axiosClient";

const discountAPI = {
    async getAll(page, size) {
        const url = `getAllDiscount?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async updateDiscount(data) {
        const url = `updateDiscount`;
        return await axiosClient
            .post(url, data);
    },
    async deleteDiscount(id) {
        const url = `deleteDiscount/${id}`;
        return await axiosClient
            .delete(url);
    },
    async searchDiscount(data) {
        const url = `searchDiscount`;
        return await axiosClient
            .post(url, data);
    },
    async getAllActive() {
        const url = `getAllDiscountActive`;
        return await axiosClient
            .get(url);
    }
};

export default discountAPI;