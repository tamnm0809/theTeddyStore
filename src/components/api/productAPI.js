import axiosClient from "./axiosClient";

const productAPI = {
    async getAll(page, size) {
        const url = `getAllProductV1?page=${page}&size=${size}`;
        return await axiosClient
            .get(url);
    },
    async getAllProductActive() {
        const url = `getAllProductActive`;
        return await axiosClient
            .get(url);
    },
    async getAllProductNoDiscount() {
        const url = `getAllProductNoDiscount`;
        return await axiosClient
            .get(url);
    },
    async searchProduct(textSearch) {
      const url = `searchProduct?textSearch=${textSearch}`;
        return await axiosClient
            .get(url);
    },
    async updateProduct(data) {
        const url = `updateProduct`;
        return await axiosClient
            .post(url, data);
    },
    async deleteProduct(id) {
        const url = `deleteProduct`;
        return await axiosClient
            .patch(url, {id});
    }
};

export default productAPI;
