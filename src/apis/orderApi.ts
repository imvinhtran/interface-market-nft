import { OfferFilter } from 'models';
import axiosAuthen from './axiosAuthen';
import axiosClient from './axiosClient';

const orderApi = {
	//AUTHENTICATE
	createOrder(data: any, chainId: number): Promise<any> {
		console.log('data gui len ne', { ...data, chainId });

		const url = `/sell/create`;
		return axiosAuthen.post(url, { ...data, chainId });
	},
	acceptOrder(data: any): Promise<any> {
		const { order, collectionId, chainId, transactionHash, type, finalPrice, userAddress } =
			data;
		const url = `buy/create`;
		console.log('data gui len ne', {
			...order,
			collectionId,
			transactionHash,
			type,
			finalPrice,
			userAddress,
			chainId,
		});

		return axiosAuthen.post(url, {
			...order,
			collectionId,
			transactionHash,
			type,
			finalPrice,
			userAddress,
			chainId,
		});
	},

	deleteOrder(data: any): Promise<any> {
		console.log('data gui len ne', data);

		const url = `orders/delete`;
		return axiosAuthen.post(url, data);
	},

	//CLIENT
	getOrderDetailByUser(orderId: string): Promise<any> {
		const url = `/offers/user/orderId/${orderId}`;
		return axiosClient.get(url);
	},

	getOrderDetail(orderId: string): Promise<any> {
		const url = `/orders/detail/orderId/${orderId}`;
		return axiosClient.get(url);
	},

	getOrderSellByItemId(itemId: string): Promise<any> {
		const url = `orders/itemId/${itemId}`;
		return axiosClient.get(url);
	},

	getPersonalOffer(userAddress: string, itemId: string): Promise<any> {
		const url = `offers/userAddress/${userAddress}/itemId/${itemId}`;
		return axiosClient.get(url);
	},

	getListOffer(filter: OfferFilter): Promise<any> {
		const url = `offers/query`;
		return axiosClient.post(url, filter);
	},
};

export default orderApi;
