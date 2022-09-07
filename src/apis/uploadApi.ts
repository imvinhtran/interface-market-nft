import { UploadItemResponse } from 'models';
import axiosClient from './axiosClient';

const uploadApi = {
	uploadItemMedia(data: FormData): Promise<UploadItemResponse> {
		const url = '/items/upload';
		return axiosClient.post(url, data);
	},
	uploadItemPreviewMedia(data: FormData): Promise<any> {
		const url = '/items/uploadPreview';
		return axiosClient.post(url, data);
	},
	uploadCollectionMedia(data: FormData): Promise<any> {
		const url = '/collections/upload';
		return axiosClient.post(url, data);
	},
	uploadUserMedia(data: FormData, userAddress: string): Promise<any> {
		const url = `/users/upload`;
		return axiosClient.post(url, data);
	},
};

export default uploadApi;
