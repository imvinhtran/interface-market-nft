/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFavoriteNftsByAddress,
	selectLoading,
} from 'redux/slices/allFavoriteNftsByAddressSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
//actions
import { fetchFavoriteNFTsByAddress } from 'redux/actions/allFavoriteNftsByAddressAction';
//models
import { NFT } from 'models';
import InfiniteListItem from 'components/CustomUI/InfiniteListItem';
import { RootState } from 'redux/store';

function Favorites() {
	const dispatch = useDispatch();

	// useSelector
	const userAddress = useSelector(selectAddress);
	const isLoading = useSelector(selectLoading);
	const listFavoriteNFTs: NFT[] = useSelector(selectFavoriteNftsByAddress);
	const listFavoriteNFTsTransformed = listFavoriteNFTs.map((item) => {
		return { _id: item.itemId };
	});

	// useEffect
	// fetch list favorite nfts
	useEffect(() => {
		if (userAddress) {
			dispatch(fetchFavoriteNFTsByAddress(userAddress, executeAfterFetchListFavorite));
		}
	}, [dispatch, userAddress]);

	// functions
	const executeAfterFetchListFavorite = (globalStateNewest: RootState) => {
		const { allFavoriteNftsByAddress } = globalStateNewest;
		if (!allFavoriteNftsByAddress.isSuccess) {
			toast.error('Can not fetch list favorite!' + allFavoriteNftsByAddress.errorMessage);
		}
	};

	return (
		<Box sx={{ mt: 5 }}>
			<InfiniteListItem
				listTokenId={listFavoriteNFTsTransformed}
				isLoading={isLoading}
				hasNextPage={false}
				fetchNextPage={() => {}}
				allowLoadMore={true}
			/>
		</Box>
	);
}

export default Favorites;
