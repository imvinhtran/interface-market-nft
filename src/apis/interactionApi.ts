import { InteractionInput } from 'models';
import axiosAuthen from './axiosAuthen';
import axiosClient from './axiosClient';

const interactionApi = {
	interactionNft(data: InteractionInput): Promise<any> {
		const url = `interactions/create`;
		return axiosAuthen.post(url, data);
	},
	getListFavoriteByAddress(userAddress: string): Promise<any> {
		const url = `interactions/userAddress/${userAddress}`;
		return axiosClient.get(url);
	},
};

export default interactionApi;
