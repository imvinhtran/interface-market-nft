import axiosClient from './axiosClient';

const signatureApi = {
	getSignature(signatureId: string): Promise<any> {
		const url = `signatures/id/${signatureId}`;
		return axiosClient.get(url);
	},
};

export default signatureApi;
