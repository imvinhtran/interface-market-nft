/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
// mui
import { CircularProgress, Typography } from '@mui/material';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// models
import { CancelOrderInput, NFT, OrderResponseAPI } from 'models';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
// actions
import { cancelOrder } from 'redux/actions/OrderAction/cancelOrderAction';

export interface IButtonCancelOfferProps {
	personalOffer: OrderResponseAPI | null;
	loadingPersonalOffer: boolean;
	refetchApi: VoidFunction;
}

export default function ButtonCancelOffer({
	personalOffer,
	loadingPersonalOffer,
	refetchApi,
}: IButtonCancelOfferProps) {
	const dispatch = useDispatch();

	// useState
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// functions
	const isQualifiedToCancelOffer = () => {
		if (
			!isLoadingItem &&
			item &&
			!loadingPersonalOffer &&
			userAddress !== item.owner &&
			personalOffer
		) {
			return true;
		}
		return false;
	};

	const handleCancelOffer = async () => {
		if (!item || !userAddress || !chainId || !personalOffer) {
			console.log('Missing Field!');
			return;
		}

		setIsLoading(true);

		const cancelOrderInput: CancelOrderInput = {
			orderMaker: personalOffer,
			makerAddress: userAddress,
			chainId,
			setLoading: setIsLoading,
			refetchApi,
			itemId: item.itemId,
			collectionId: item.collectionId,
		};

		dispatch(cancelOrder(cancelOrderInput));
	};

	return (
		<>
			{isQualifiedToCancelOffer() && (
				<ButtonGradient
					onClick={handleCancelOffer}
					disabled={isLoading}
					sx={{ width: '170px' }}
				>
					{isLoading && <CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />}

					<Typography variant="body1">Cancel offer</Typography>
				</ButtonGradient>
			)}
		</>
	);
}
