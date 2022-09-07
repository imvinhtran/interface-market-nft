/* eslint-disable @typescript-eslint/no-unused-vars */
import collectionApi from 'apis/collectionApi';
import { Collection, ListParams, ListResponse, PaginationParams, Response } from 'models';

import {
	startLoading,
	hasError,
	fetchAllCollectionFirstLoadSuccess,
	fetchAllCollectionSuccess,
	fetchListCollectionsByOwnerOrCreatorItemsFirstLoadSuccess,
	fetchListCollectionsByOwnerOrCreatorItemsSuccess,
	fetchCollectionByIdSuccess,
	createCollectionSuccess,
	editCollectionSuccess,
	setHasNextPage,
} from 'redux/slices/collectionSlice';
//utils
import {
	callTransaction,
	checkHasNextPage,
	encodeFunctionCall,
	sendTransaction,
	waitingForMined,
} from 'utils';
//constants
import { CONTRACT } from '../../constants';
import { dispatch, getState } from '../store';

export function fetchAllCollection(
	pagination: ListParams,
	filter: ListParams,
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<Collection> = await collectionApi.getListCollectionId(
				pagination,
				filter
			);

			const paginationResponse: PaginationParams = response.pagination;
			const check: boolean = checkHasNextPage(
				paginationResponse.currentPage,
				paginationResponse.totalPages
			);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchAllCollectionFirstLoadSuccess(response));
			} else {
				dispatch(fetchAllCollectionSuccess(response));
			}
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function fetchListCollectionsByOwnerOrCreatorItems(
	pagination: ListParams,
	filter: ListParams,
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<Collection> =
				await collectionApi.getListCollectionByOwnerOrCreatorItems(pagination, filter);

			const paginationResponse: PaginationParams = response.pagination;
			const check: boolean = checkHasNextPage(
				paginationResponse.currentPage,
				paginationResponse.totalPages
			);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchListCollectionsByOwnerOrCreatorItemsFirstLoadSuccess(response));
			} else {
				dispatch(fetchListCollectionsByOwnerOrCreatorItemsSuccess(response));
			}
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function fetchCollectionById(collectionId: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: Response<Collection> = await collectionApi.getCollectionById(
				collectionId
			);

			dispatch(fetchCollectionByIdSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function fetchCollectionDetailById(collectionId: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: Response<Collection> = await collectionApi.getCollectionDetailById(
				collectionId
			);

			dispatch(fetchCollectionByIdSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function createCollection(data: Collection, myCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response = await collectionApi.createCollection(data);
			dispatch(createCollectionSuccess());
		} catch (error: any) {
			console.log(error.error);
			dispatch(hasError(error));
		}
	};
}

export function editCollection(data: Collection, collectionId: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response = await collectionApi.editCollection(data, collectionId);
			dispatch(editCollectionSuccess());
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

const callNFTAddress = async (chainId: number, address: string, salt: any, web3: any) => {
	const encodedCall = await encodeFunctionCall(web3, 'getAddress(uint256)', ['uint256'], [salt]);

	return callTransaction(address, CONTRACT[chainId].COLLECTION, encodedCall);
};

const deployNewNFT = async (chainId: number, address: any, salt: number, web3: any) => {
	const encodedCall = await encodeFunctionCall(web3, 'deploy(uint256)', ['uint256'], [salt]);

	//Consider using estimate gas later
	// const gas = await web3.eth.estimateGas({
	// 	from: address,
	// 	to: CONTRACT[chainId].COLLECTION,
	// 	data: encodedCall,
	// });

	const txHash = await sendTransaction(
		address,
		CONTRACT[chainId].COLLECTION,
		'0x0000000000000000000000000000000000000000000000000000000000000000',
		encodedCall,
		`0x556BA8`,
		'0x77359400'
	);

	return waitingForMined(txHash, web3);
};
