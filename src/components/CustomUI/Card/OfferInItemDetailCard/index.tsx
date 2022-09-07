import React, { useEffect, useState } from 'react';
// mui
import { Box, Typography } from '@mui/material';
// apis
import orderApi from 'apis/orderApi';
// components
import ButtonAcceptOffer from 'components/pages/ItemDetail/ExecuteButton/ButtonAcceptOffer';
import SkeletonOfferInItemDetailCard from 'components/CustomUI/Skeleton/Item/SkeletonOfferInItemDetailCard';
// models
import { OrderResponseAPI } from 'models';
// utils
import { formatNumber, formatTimestamp, generateGrad } from 'utils';
// styled
import { GradIcon } from '../NFTItem/styled';
import { ButtonBox, OfferCard } from './styled';

export interface IOfferInItemDetailCardProps {
	orderId: string;
}

export default function OfferInItemDetailCard({ orderId }: IOfferInItemDetailCardProps) {
	// useState
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [orderBuy, setOrderBuy] = useState<OrderResponseAPI | null>(null);

	// useEffect
	useEffect((): any => {
		let mounted = true;

		(async () => {
			setIsLoading(true);

			try {
				const res = await orderApi.getOrderDetail(orderId);
				const orderDetail: OrderResponseAPI = res.data;

				if (mounted) {
					setOrderBuy(orderDetail);
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		})();

		return () => (mounted = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !isLoading ? (
		orderBuy ? (
			<OfferCard>
				<GradIcon
					sx={{
						background: `${generateGrad(orderBuy.maker)}`,
						width: '50px',
						height: '50px',
						mr: 2,
						flexShrink: 0,
					}}
				/>
				<Box>
					<Typography variant="h6" sx={{ fontWeight: '600' }}>
						{orderBuy.salePrice} {orderBuy.symbolToken?.toUpperCase()} (
						{formatNumber(orderBuy.usdPrice ?? 0, 2)}$){' '}
						<span style={{ fontWeight: 100 }}>by</span>{' '}
						{orderBuy.maker.substring(0, 10)} ...{' '}
						{orderBuy.maker.substring(37, orderBuy.maker.length + 1)}{' '}
					</Typography>
					<Typography variant="body2">
						{formatTimestamp(
							Number(orderBuy.listingTime),
							'MMMM Do, YYYY, h:mm A'
						).toString()}
						{/* March 29, 2022, 10:56 PM */}
					</Typography>
				</Box>

				<ButtonBox className="ButtonDisplay">
					<ButtonAcceptOffer orderBuy={orderBuy} />
				</ButtonBox>
			</OfferCard>
		) : (
			<></>
		)
	) : (
		<SkeletonOfferInItemDetailCard />
	);
}
