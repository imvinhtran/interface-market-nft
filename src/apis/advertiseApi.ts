import { Response } from 'models';
import { AdvertiseBanner } from 'models/advertise';
import axiosClient from './axiosClient';

const advertiseApi = {
	getListBanner(): Promise<AdvertiseBanner[]> {
		const url = '/promotion/collection';
		return axiosClient.get(url);
	},
	getListVideo(): Promise<Response<string>> {
		const url = '/promotion/hotpot';
		return axiosClient.get(url);
	},
	getListItem(): Promise<any> {
		const url = '/promotion/nft';
		return axiosClient.get(url);
	},
};

export default advertiseApi;
