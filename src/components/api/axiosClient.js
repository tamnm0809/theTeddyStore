import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:7070/teddy-store/",
});
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor
axiosClient.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
