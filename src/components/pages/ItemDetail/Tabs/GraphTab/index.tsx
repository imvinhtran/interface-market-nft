/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import merge from 'lodash/merge';
import moment from 'moment';
// components
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from './BaseOptionChart';
// models
import { PriceActivity } from 'models';
import { ApexOptions } from 'apexcharts';
import { formatNumber } from 'utils';
// styled
import { Box, useTheme } from '@mui/material';
import { YaxisTitle } from './styled';

export interface IGraphTabProps {
	listActivityPriceChart: PriceActivity[];
}

export default function GraphTab({ listActivityPriceChart }: IGraphTabProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	listActivityPriceChart.push({ date: '2022-03-30T17:00:00.000Z', avgPrice: 1231.446 });
	listActivityPriceChart.push({ date: '2022-03-31T17:00:00.000Z', avgPrice: 323.463 });

	const priceDataList: number[] = listActivityPriceChart.map((item: PriceActivity) =>
		Number(item.avgPrice.toFixed(2))
	);
	const categoriesDataList: string[] = listActivityPriceChart.map((item: PriceActivity) =>
		moment(item.date).subtract(1, 'days').format('ll')
	);

	const CHART_DATA = [{ name: 'Price (USD)', data: priceDataList }];

	const chartOptions: ApexOptions = merge(BaseOptionChart(), {
		xaxis: {
			categories: categoriesDataList,
			labels: {
				style: {
					colors: isLightTheme ? '#000' : '#fff',
				},
			},
		},
		tooltip: { x: { show: false }, marker: { show: false } },
		yaxis: [
			{
				labels: {
					style: {
						colors: isLightTheme ? '#000' : '#fff',
					},
					formatter: function (val: number, index: number): string {
						// lib give number 5e-324 when compile, too small
						if (val < 0.01) return '0';

						return formatNumber(val, 2);
					},
				},
			},
		],
	});

	return (
		<Box sx={{ position: 'relative', mt: 1 }}>
			<YaxisTitle variant="subtitle2">Price (USD)</YaxisTitle>
			<ReactApexChart type="area" series={CHART_DATA} options={chartOptions} height={320} />
		</Box>
	);
}
