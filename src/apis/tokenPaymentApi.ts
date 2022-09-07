import axiosClient from './axiosClient';

const tokenPaymentApi = {
	getListPaymentTokenByChainId(chainId: number): Promise<any> {
		const url = `orders/listToken?chainId=${chainId}`;
		return axiosClient.get(url);
	},

	changeTokenToUsd(from: string, to: string, inputPrice: string): Promise<any> {
		const url = `/items/changePrice`;
		return axiosClient.post(url, { from, to, inputPrice });
	},
};

export default tokenPaymentApi;
