/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, lazy } from 'react';
//component
import Loadable from 'components/CustomUI/LoadableComponent';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import { selectListCollectionActivity } from 'redux/slices/tradingSlice';
//models
import { CollectionActivity } from 'models';
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

const CustomTable = Loadable(lazy(() => import('components/CustomUI/CustomTable')));

function ActivityTab() {
	const theme = useTheme();

	// useSelector
	const listCollectionActivity: CollectionActivity[] = useSelector(selectListCollectionActivity);
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

	const renderListData = (list: CollectionActivity[]) => {
		if (list && list.length > 0) {
			return list.map((item: CollectionActivity) => {
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

	return <CustomTable thData={renderHeader()} tdData={renderListData(listCollectionActivity)} />;
}

export default React.memo(ActivityTab);
