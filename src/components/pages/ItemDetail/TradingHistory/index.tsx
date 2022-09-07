/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, Fragment, useState, lazy } from 'react';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectChainId, selectAddress } from 'redux/slices/web3InfoSlice';
import { selectListItemActivity } from 'redux/slices/tradingSlice';
import { selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
//actions
import { fetchTradingHistoryByNFTsId } from 'redux/actions/tradingAction';
//constant
import { ETHERSCAN } from 'constants/etherscan.constant';
import { TYPE_TRANSACTION } from '../../../../constants';
//modals
import { ItemActivity } from 'models/histories';
//image
import IconGraphWhite from 'assets/icons/graph-white.webp';
import IconGraphBlack from 'assets/icons/graph-black.webp';
//mui
import { Link, useTheme } from '@mui/material';
// utils
import {
	formatAddressHistory,
	formatPriceHistory,
	formatTimeHistory,
	formatTxHashHistory,
} from 'utils';

const ExpandCard = Loadable(lazy(() => import('../ExpandCard')));
const CustomTable = Loadable(lazy(() => import('components/CustomUI/CustomTable')));

export interface TradingHistoryProps {}

const getTransactionType = (type: number) => {
	return TYPE_TRANSACTION[type];
};

function TradingHistory(props: TradingHistoryProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	//selector
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const listItemActivity: ItemActivity[] = useSelector(selectListItemActivity);

	const renderTitle = () => {
		let listTitle = ['Event', 'Amount', 'From', 'To', 'Transaction hash', 'Time'];
		return Object.values(listTitle);
	};

	const getEtherscanInfoByChainId = (id: number) => {
		return ETHERSCAN[id];
	};

	const renderListData = () => {
		if (listItemActivity && listItemActivity.length > 0) {
			return listItemActivity.map((item: ItemActivity) => {
				return {
					Event: <Fragment>{getTransactionType(item.type)}</Fragment>,
					Amount: (
						<Fragment>{formatPriceHistory(item.tokenPrice, item.priceType)}</Fragment>
					),
					From: <Fragment>{formatAddressHistory(item.from, userAddress)}</Fragment>,
					To: <Fragment>{formatAddressHistory(item.to, userAddress)}</Fragment>,
					TransactionHash: item.txHash ? (
						<Link
							href={`${getEtherscanInfoByChainId(chainId).url}tx/${item.txHash}`}
							sx={{
								color: theme.palette.text.primary,
								'&:hover': {
									color: '#3366FF',
									transition: 'all 0.2s',
								},
							}}
							target="_blank"
						>
							{formatTxHashHistory(item.txHash)}
						</Link>
					) : (
						<Fragment>-----</Fragment>
					),
					Time: <Fragment>{formatTimeHistory(item.createdAt)}</Fragment>,
				};
			});
		}
	};

	return (
		<ExpandCard
			title="Item Activity"
			icon={isLightTheme ? IconGraphBlack : IconGraphWhite}
			alt="trading-icon"
		>
			<CustomTable thData={renderTitle()} tdData={renderListData()} />
		</ExpandCard>
	);
}

export default TradingHistory;
