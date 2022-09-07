/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
//component
import CustomTable from 'components/CustomUI/CustomTable';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { selectListUserActivity } from 'redux/slices/tradingSlice';
//models
import { UserActivity } from 'models';
//constant
import { TYPE_TRANSACTION } from '../../../../../constants';
import { ETHERSCAN } from 'constants/etherscan.constant';
//mui
import { Link, useTheme } from '@mui/material';
// utils
import {
	formatAddressHistory,
	formatPriceHistory,
	formatTimeHistory,
	formatTxHashHistory,
} from 'utils';

function ActivityTab() {
	const theme = useTheme();
	// useSelector
	const listUserActivity: UserActivity[] = useSelector(selectListUserActivity);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	const getTransactionType = (type: number) => {
		return TYPE_TRANSACTION[type];
	};

	const renderHeader = () => {
		let listTitle = ['Event', 'Amount', 'From', 'To', 'Transaction hash', 'Time'];
		return Object.values(listTitle);
	};

	const getEtherscanInfoByChainId = (id: number) => {
		return ETHERSCAN[id];
	};

	const renderListData = (list: UserActivity[]) => {
		if (list && list.length > 0) {
			return list.map((item: UserActivity) => {
				return {
					Event: <Fragment>{getTransactionType(item.type)}</Fragment>,
					Price: (
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

	return <CustomTable thData={renderHeader()} tdData={renderListData(listUserActivity)} />;
}

export default ActivityTab;
