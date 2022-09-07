/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useMemo, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { BigNumber } from 'ethers';
//constants
import { ORDER_CONFIGURATION } from '../../../../constants';
// utils
import { formatNumber } from 'utils';
import { CalculateFinalPrice } from 'redux/actions/OrderAction/common';
import { OrderResponseAPI } from 'models';

export interface ItemPriceProps {
	saleKind: number;
	basePrice: number;
	usdPrice: number;
	extra: number;
	extraUSD: number;
	listingTime: number;
	endTime: number;
	orderSell: OrderResponseAPI;
}

export default function ItemPrice({
	basePrice,
	usdPrice,
	saleKind,
	extra,
	extraUSD,
	endTime,
	listingTime,
	orderSell,
}: ItemPriceProps) {
	// console.log('extraUSD', extraUSD);
	// console.log('extra', extra);

	const today = Math.floor(new Date().getTime() / 1000);

	const calDiff = useMemo(() => {
		const rs = extra / (endTime - listingTime);
		// console.log('diff', rs);
		return rs;
	}, [endTime, extra, listingTime]);

	const calDiffUsd = useMemo(() => {
		const rs = extraUSD / (endTime - listingTime);
		// console.log('diff USD', rs);
		return rs;
	}, [endTime, extraUSD, listingTime]);

	const calCurrentPrice = useMemo(() => {
		const rs = basePrice - (extra * (today - listingTime)) / (endTime - listingTime);
		// console.log('current', rs);
		return rs;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basePrice, endTime, extra, listingTime]);

	const calCurrentUsdPrice = useMemo(() => {
		const rs = usdPrice - (extraUSD * (today - listingTime)) / (endTime - listingTime);
		// console.log('currentUsd', rs);
		return rs;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endTime, extraUSD, listingTime, usdPrice]);

	//state
	const [currentPrice, setCurrentPrice] = useState<number>(calCurrentPrice);
	const [currentUsdPrice, setCurrentUsdPrice] = useState<number>(calCurrentUsdPrice);
	const [diff] = useState<any>(calDiff);
	const [usdDiff] = useState<any>(calDiffUsd);

	useEffect(() => {
		const interval = setInterval(() => {
			if (endTime > today) {
				const price = currentPrice - diff;
				const usdPrice = currentUsdPrice - usdDiff;
				setCurrentUsdPrice(usdPrice);
				setCurrentPrice(price);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<Fragment>
			{today < listingTime ? (
				<Fragment>
					<Typography variant="h3" sx={{ lineHeight: 1 }}>
						{formatNumber(basePrice, 0, 4)}
					</Typography>
					<Typography variant="subtitle2">
						($
						{formatNumber(usdPrice, 0, 3)})
					</Typography>
				</Fragment>
			) : (
				<Fragment>
					<Typography variant="h3" sx={{ lineHeight: 1 }}>
						{formatNumber(currentPrice, 0, 4)}
					</Typography>
					<Typography variant="subtitle2">
						($
						{formatNumber(currentUsdPrice, 0, 3)})
					</Typography>
				</Fragment>
			)}
		</Fragment>
	);
}
