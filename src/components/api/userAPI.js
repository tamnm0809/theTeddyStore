import axiosClient from "./axiosClient";

const userAPI = {
    async register(data) {
        const url = `register`;
        return await axiosClient
            .post(url, data);
    },
    async resetPassword(data) {
        const url = `reset-password/${data.email}`;
        return  await axiosClient
            .post(url);
    }
};

export default userAPI;