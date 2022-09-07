import { ListParams, Response, User } from 'models';
import axiosClient from './axiosClient';
import axiosAuthen from './axiosAuthen';

const baseURL = '/users';

const userApi = {
	loginUser(userAddress: string): Promise<Response<User>> {
		const url = baseURL + `/login`;
		return axiosAuthen.post(url, { userAddress });
	},

	getOtherUser(userAddress: string): Promise<Response<User>> {
		const url = baseURL + `/userAddress/${userAddress}`;
		return axiosClient.get(url);
	},

	getListUserById(paginationParams: ListParams, filter: ListParams): Promise<any> {
		const { pageSize, page } = paginationParams;

		const url = baseURL + `/query/pageSize/${pageSize}/page/${page}`;
		const body = { ...filter };
		return axiosClient.post(url, body);
	},

	getSearchUser(userId: string): Promise<Response<User>> {
		const url = baseURL + `/search/userId/${userId}`;
		return axiosClient.get(url);
	},

	updateUser(data: User): Promise<Response<User>> {
		const { userAddress } = data;
		const url = baseURL + `/userAddress/${userAddress}`;
		return axiosAuthen.put(url, data);
	},

	logoutUser(userAddress: string): Promise<any> {
		const url = baseURL + `/logout`;
		return axiosClient.post(url, { userAddress });
	},
};

export default userApi;
