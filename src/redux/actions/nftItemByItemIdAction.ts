import nftsApi from 'apis/nftsApi';
import { NFT, Response } from 'models';
import { startLoading, hasError, fetchNftItemSuccess } from 'redux/slices/nftItemByItemIdSlice';

export function fetchDetailNftItemById(itemId: string, MyCallBack: (value: any) => void) {
	return async (dispatch: any, getState: any) => {
		dispatch(startLoading());
		try {
			const response: Response<NFT> = await nftsApi.getDetailNftItemById(itemId);
			dispatch(fetchNftItemSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
