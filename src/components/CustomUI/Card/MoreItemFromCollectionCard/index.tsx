/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// styled
import { ItemImage, ItemName, MoreItemCard } from './styled';
// models
import { NFT } from 'models';
// apis
import nftsApi from 'apis/nftsApi';
import { compressImage, sliceString } from 'utils';
// mui
import { Box, Skeleton } from '@mui/material';
// components
import MediaDisplay from '../NFTItem/MediaDisplay';

export interface IMoreItemFromCollectionCardProps {
	itemId: any;
}

export default function MoreItemFromCollectionCard({ itemId }: IMoreItemFromCollectionCardProps) {
	const navigate = useNavigate();
	// const location = useLocation();

	// useSelector
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// useState
	const [item, setItem] = useState<NFT>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const a = true;

	useEffect(() => {
		if (!itemId || !chainId) return;

		(async () => {
			setIsLoading(true);
			try {
				const res: NFT = await nftsApi.getLessNftInfoByTokenId({
					itemId: itemId._id,
					userAddress:
						userAddress ?? '0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8'.toLowerCase(),
				});
				setItem(res);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [itemId, userAddress, chainId]);

	return !isLoading ? (
		item ? (
			<MoreItemCard
				onClick={() => {
					navigate(`/detail/${itemId._id}`);
					window.location.reload();
				}}
			>
				<ItemImage>
					<MediaDisplay media={item.itemMedia} preview={item.itemPreviewMedia} name="" />
				</ItemImage>
				<ItemName variant="body1">
					{item.itemName && sliceString(item.itemName, 20)}
				</ItemName>
			</MoreItemCard>
		) : (
			<></>
		)
	) : (
		<Box sx={{ width: '250px', marginLeft: '60px', marginRight: '60px', flexShrink: 0 }}>
			<Skeleton variant="rectangular" sx={{ paddingTop: '100%', borderRadius: '12px' }} />

			<Skeleton variant="rectangular" sx={{ mt: 2, mx: 5, borderRadius: '12px' }} />
		</Box>
	);
}
