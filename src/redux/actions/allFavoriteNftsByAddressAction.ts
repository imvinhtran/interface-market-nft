/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListParams, ListResponse, NFT } from 'models';
import { dispatch, getState } from 'redux/store';
import interactionApi from 'apis/interactionApi';
import {
	startLoading,
	hasError,
	fetchFavoriteNftsByAddressSuccess,
} from 'redux/slices/allFavoriteNftsByAddressSlice';

export function fetchFavoriteNFTsByAddress(userAddress: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<NFT> = await interactionApi.getListFavoriteByAddress(
				userAddress
			);

			dispatch(fetchFavoriteNftsByAddressSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
