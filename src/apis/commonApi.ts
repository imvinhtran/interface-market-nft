import axiosClient from './axiosClient';

const commonApi = {
	convertPrice(data: any): Promise<any> {
		const { chainId, symbolToken, amount } = data;
		const url = `tools/price-conversion/chainId/${chainId}/from/${symbolToken}/to/usd/price/${amount}`;
		return axiosClient.get(url, data);
	},
	getQuote(data: any): Promise<any> {
		const url = '/api/tools/lastest-quotes';
		return axiosClient.get(url, data);
	},
};

export default commonApi;
