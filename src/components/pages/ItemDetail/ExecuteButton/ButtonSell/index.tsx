/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// constants
import { ITEM_STATUS } from '../../../../../constants';
// models
import { NFT } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import { Typography } from '@mui/material';
// image
import CardIcon from 'assets/icons/card.webp';

export interface IButtonSellProps {}

export default function ButtonSell(props: IButtonSellProps) {
	const navigate = useNavigate();

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);

	// functions
	const isQualifiedToSell = () => {
		if (
			!isLoadingItem &&
			item &&
			item.status === ITEM_STATUS.NOT_FOR_SELL &&
			userAddress === item.owner
		) {
			return true;
		}
		return false;
	};

	return (
		<>
			{isQualifiedToSell() && (
				<ButtonGradient
					onClick={() => navigate(`/sell-item/${item!.itemId}`)}
					sx={{ width: '150px' }}
				>
					<img src={CardIcon} alt="card icon" height={16} width={22} />
					<Typography variant="subtitle2" sx={{ ml: 1 }}>
						Sell Item
					</Typography>
				</ButtonGradient>
			)}
		</>
	);
}
