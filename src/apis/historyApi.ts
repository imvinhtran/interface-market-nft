import { ListParams, ListResponse, UserActivity, PriceActivity, CollectionActivity } from 'models';
import axiosClient from './axiosClient';

const tradingApi = {
	getTradingHistoryByNFTsId(data: ListParams): Promise<any> {
		const { itemId } = data;
		const url = `/histories/itemId/${itemId}/pageSize/9999/page/1`;
		return axiosClient.get(url);
	},
	getActivityHistoryByUserAddress(userAddress: string): Promise<ListResponse<UserActivity>> {
		const url = `/histories/userAddress/${userAddress}/pageSize/9999/page/1`;
		return axiosClient.get(url);
	},
	getActivityHistoryByCollectionId(
		collectionId: string
	): Promise<ListResponse<CollectionActivity>> {
		const url = `/histories/collectionId/${collectionId}/pageSize/9999/page/1`;
		return axiosClient.get(url);
	},
	getActivityPriceChart(itemId: string): Promise<PriceActivity[]> {
		const url = `/histories/chart/itemId/${itemId}`;
		return axiosClient.get(url);
	},
	getLatestTransaction(): Promise<any> {
		const url = `/histories/latest`;
		return axiosClient.get(url);
	},
};

export default tradingApi;
