/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, Fragment, useState } from 'react';
import moment from 'moment';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
//components
import ExpandCard from '../ExpandCard';
import CustomTable from 'components/CustomUI/CustomTable';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
//redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
import { selectListOrderOffer } from 'redux/slices/orderSlice';
//modals
import { NFT, OrderResponseAPI, TokenPayment } from 'models';
//image
import TradingIcon from 'assets/icons/trading.png';
//mui
import { CircularProgress, Typography } from '@mui/material';
// utils
import { erc20function, isNativeToken, formatAddressHistory, formatTimeHistory } from 'utils';

export interface IOfferHistoryProps {
	isLoading: boolean;
	handleAcceptOffer: Function;
}

function OfferHistory({ isLoading, handleAcceptOffer }: IOfferHistoryProps) {
	// state
	const [listOrderOfferWithPriceToToken, setListOrderOfferWithPriceToToken] = useState<any>([]);
	//selector
	const listOrderOffer: OrderResponseAPI[] = useSelector(selectListOrderOffer);
	let addressState = useSelector(selectAddress);
	const nftItem: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	// change price by wei token and get it's symbol's payment token
	useEffect(() => {
		(async () => {
			if (listOrderOffer && listTokenPayment.length > 0) {
				let newList = [];
				newList = await Promise.all(
					listOrderOffer.map(async (item: OrderResponseAPI) => {
						let priceToToken: string = '-----';
						let symbol: string = '';

						const currentToken = listTokenPayment.find(
							(token) => token.address === item.paymentToken
						);

						if (currentToken) {
							symbol = currentToken.symbol;
							if (isNativeToken(currentToken.address)) {
								priceToToken = formatEther(item.basePrice);
							} else {
								const result: string = await erc20function().changeWeiToToken(
									currentToken.address,
									BigNumber.from(item.basePrice)
								);
								priceToToken = result;
							}
						}

						return {
							...item,
							basePrice: priceToToken,
							symbol,
						};
					})
				);

				setListOrderOfferWithPriceToToken(newList);
			}
		})();
	}, [listOrderOffer]);

	const isQualifiedToAcceptOffer = (): boolean => {
		if (
			!isLoadingItem &&
			nftItem &&
			addressState === nftItem.owner &&
			listOrderOffer.length > 0
		) {
			return true;
		}
		return false;
	};

	const renderTitle = () => {
		let listTitle = [];
		if (isQualifiedToAcceptOffer()) {
			listTitle = ['Price', 'From', 'Time', ''];
		} else {
			listTitle = ['Price', 'From', 'Time'];
		}
		return Object.values(listTitle);
	};

	const renderListData = () => {
		if (listOrderOfferWithPriceToToken && listOrderOfferWithPriceToToken.length > 0) {
			return listOrderOfferWithPriceToToken.map((item: any) => {
				let singleDataTableItem: any = {
					Price: (
						<Fragment>
							{item.basePrice} {item.symbol}
						</Fragment>
					),
					From: <Fragment>{formatAddressHistory(item.maker, addressState)}</Fragment>,
					Time: <Fragment>{formatTimeHistory(item.createAt)}</Fragment>,
				};

				// owner of the item can accept offer
				if (isQualifiedToAcceptOffer()) {
					singleDataTableItem = {
						...singleDataTableItem,
						Button: (
							<ButtonGradient
								onClick={() => handleAcceptOffer(item.orderId)}
								disabled={isLoading}
							>
								{isLoading && (
									<CircularProgress sx={{ color: 'white', mr: 2 }} size={15} />
								)}
								<Typography variant="subtitle2">Accept</Typography>
							</ButtonGradient>
						),
					};
				}

				return singleDataTableItem;
			});
		}
	};

	return (
		<ExpandCard title="Offers" icon={TradingIcon} alt="trading-icon">
			<CustomTable thData={renderTitle()} tdData={renderListData()} />
		</ExpandCard>
	);
}

export default OfferHistory;
