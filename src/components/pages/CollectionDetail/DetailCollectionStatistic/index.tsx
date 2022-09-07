/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// models
import { Collection } from 'models';
// mui, styled
import { Typography } from '@mui/material';
import { DetailStatistic, StatisticBox, StatisticNumber, StatisticTitle } from './styled';
// utils
import { formatNumber, formatNumberWithText } from 'utils';

export interface DetailCollectionStatisticProps {
	collection: Collection;
	sx?: any;
}

function DetailCollectionStatistic({ collection, sx }: DetailCollectionStatisticProps) {
	return (
		<DetailStatistic sx={sx}>
			<StatisticBox>
				<StatisticNumber variant="h3">
					{collection
						? collection.items
							? formatNumberWithText(collection.items, 0, 2)
							: '0'
						: '0'}
				</StatisticNumber>
				<StatisticTitle variant="body1">Items</StatisticTitle>
			</StatisticBox>
			<StatisticBox>
				<StatisticNumber variant="h3">
					{collection
						? collection.owners
							? formatNumberWithText(collection.owners, 0, 2)
							: '0'
						: '0'}
				</StatisticNumber>
				<StatisticTitle variant="body1">Owners</StatisticTitle>
			</StatisticBox>
			<StatisticBox>
				<StatisticNumber variant="h3">
					{collection
						? collection.floorPrice
							? `$${formatNumberWithText(collection.floorPrice, 2)}`
							: '0'
						: '0'}
				</StatisticNumber>
				<StatisticTitle variant="body1">Floor Price</StatisticTitle>
			</StatisticBox>
			<StatisticBox>
				<StatisticNumber variant="h3">
					{collection
						? collection.volumeTrade
							? `$${formatNumberWithText(collection.volumeTrade, 2)}`
							: '0'
						: '0'}
				</StatisticNumber>
				<StatisticTitle variant="body1">Volume Traded</StatisticTitle>
			</StatisticBox>
		</DetailStatistic>
	);
}

export default DetailCollectionStatistic;
