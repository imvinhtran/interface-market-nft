import { ListParams, CreateAndUpdateNFTInput } from 'models';
import axiosAuthen from './axiosAuthen';
import axiosClient from './axiosClient';

const nftsApi = {
	//AUTHENTICATE
	createNft(data: CreateAndUpdateNFTInput, chainId: number): Promise<any> {
		const url = `/items/create`;
		return axiosAuthen.post(url, data);
	},
	updateNftByItemId(
		data: CreateAndUpdateNFTInput,
		userAddress: string,
		itemId: string
	): Promise<any> {
		const url = `/items/update/userAddress/${userAddress}/itemId/${itemId}`;
		return axiosAuthen.put(url, data);
	},
	freezeNft(itemId: string, userAddress: string, metaData: string): Promise<any> {
		const url = `/items/freeze`;

		const body = { itemId, userAddress, metaData };
		return axiosAuthen.put(url, body);
	},

	//CLIENT
	getListTokenId(paginationParams: ListParams, filter: ListParams): Promise<any> {
		const { pageSize, page } = paginationParams;

		const url = `/items/query/pageSize/${pageSize}/page/${page}`;
		const body = { ...filter };
		return axiosClient.post(url, body);
	},
	getSearchListTokenId(paginationParams: ListParams, filter: ListParams): Promise<any> {
		const { pageSize, page } = paginationParams;

		const url = `/items/query-search/pageSize/${pageSize}/page/${page}`;
		const body = { ...filter };
		return axiosClient.post(url, body);
	},
	getLessNftInfoByTokenId(filter: ListParams): Promise<any> {
		const { itemId, userAddress } = filter;
		const url = `/items/itemId/${itemId}?userAddress=${userAddress}`;
		return axiosClient.get(url);
	},
	getDetailNftItemById(itemId: string): Promise<any> {
		const url = `/items/detail/itemId/${itemId}`;
		return axiosClient.get(url);
	},
	getSearchNftItemById(itemId: string): Promise<any> {
		const url = `/items/search/itemId/${itemId}`;
		return axiosClient.get(url);
	},
	getDataForFreezeNft(itemId: string): Promise<any> {
		const url = `/items/freeze/metadata/itemId/${itemId}`;
		return axiosClient.get(url);
	},
};

export default nftsApi;
