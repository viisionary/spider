import dotenv from 'dotenv';
import axios from 'axios';
import { serverAddress } from '../constant/serverAddress';
// import {globalShowSnackbar} from "../containers/App";
dotenv.config();
export const delay = (ms: number, params: any = {}) =>
    new Promise((res): any => {
        setTimeout(() => {
            res(params);
        }, ms);
    });
const httpClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '' : serverAddress,
});

httpClient.interceptors.request.use((config: any) => {
    const accessToken = localStorage.getItem('Authorization');
    config.timeout = 5000;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
});
httpClient.interceptors.response.use(
    async function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // await delay(2000)
        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。

        // globalShowSnackbar({
        //     severity: "error",
        //     message: error.response.data?.msg
        // })

        return Promise.reject(error);
    }
);
export { httpClient };
