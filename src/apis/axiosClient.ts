/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_ENDPOINT } from 'constants/index';

const axiosClient = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use(
	async function (config: AxiosRequestConfig) {
		return config;
	},
	function (error: any) {
		// Do something with request error
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	async function (error: AxiosError) {
		return Promise.reject(error);
	}
);

export default axiosClient;
