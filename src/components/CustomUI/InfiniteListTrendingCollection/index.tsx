/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Grid, styled, Typography, useTheme, Skeleton } from '@mui/material';
//components
//models
import { Collection } from 'models';
import { formatNumber } from 'utils';
//context
import { SizeContext } from 'contexts/SizeObserver';
//mui
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { CollectionName, FlexBox, TableScrollable, TableWrapper } from './styled';
//redux
import { setFilter, selectFilter } from 'redux/slices/collectionTrendingSlice';
import { dispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export interface InfiniteListTrendingCollectionProps {
	listCollection: Collection[];
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: Function;
	allowLoadMore: boolean;
}

export default function InfiniteListTrendingCollection({
	listCollection,
	isLoading,
	hasNextPage,
	fetchNextPage,
	allowLoadMore,
}: InfiniteListTrendingCollectionProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const theme = useTheme();
	const { innerWidth, innerHeight } = useContext(SizeContext);

	//state
	const [filterVolume, setFilterVolume] = useState(false);
	const [filterItem, setFilterItem] = useState(false);
	const [filterFloorPrice, setFilterFloorPrice] = useState(false);

	//selector
	const filter = useSelector(selectFilter);

	useEffect(() => {
		// Handler to call on window scroll

		//Loadmore when scroll to the bottom of list
		if (allowLoadMore && hasNextPage && listRef.current) {
			const bottom = listRef.current.getBoundingClientRect().bottom;

			if (innerHeight > bottom - 300) {
				fetchNextPage();
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasNextPage, allowLoadMore, innerHeight]);

	const handleFilter = (sortBy: string, sort: boolean) => {
		const sortFrom = sort ? 'asc' : 'desc';
		dispatch(setFilter({ ...filter, sortBy, sortFrom }));
	};

	const renderPercent = (percent: number) => (
		<Typography
			sx={{
				color: percent > 0 ? 'green' : percent < 0 ? 'red' : 'inherit',
				whiteSpace: 'nowrap',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{percent > 0 ? <ArrowDropUpIcon /> : percent < 0 ? <ArrowDropDownIcon /> : null}
			{percent === 0 ? '___' : `${Math.abs(percent).toFixed(2)} %`}
		</Typography>
	);

	const renderVolume = useCallback(
		(collection: Collection) => {
			let value = 0;
			if (filter.sortBy === 'volume24Hours') {
				value = collection.volume24Hour!;
			} else if (filter.sortBy === 'volume7Days') {
				value = collection.volume7Days!;
			} else value = collection.volume30Days!;
			return <Fragment>$ {formatNumber(value.toString()!, 2)}</Fragment>;
		},
		[filter]
	);

	return (
		<Box sx={{ width: '100%' }} ref={listRef}>
			{!isLoading ? (
				<TableWrapper>
					<TableScrollable>
						<thead>
							<tr>
								<th>
									<FlexBox>
										<Typography>Collection</Typography>
									</FlexBox>
								</th>
								<th>
									<FlexBox
										onClick={() => {
											handleFilter('volume7Days', !filterVolume);
											setFilterVolume(!filterVolume);
										}}
									>
										<Typography>Volume Trade</Typography>
										{!filterVolume ? (
											<KeyboardArrowDownIcon />
										) : (
											<KeyboardArrowUpIcon />
										)}
									</FlexBox>
								</th>
								<th>
									<FlexBox>24h %</FlexBox>
								</th>
								<th>
									<FlexBox>7d %</FlexBox>
								</th>
								<th>
									<FlexBox>30d %</FlexBox>
								</th>
								<th>
									<FlexBox
										onClick={() => {
											handleFilter('items', !filterItem);
											setFilterItem(!filterItem);
										}}
									>
										<Typography>Items</Typography>
										{!filterItem ? (
											<KeyboardArrowDownIcon />
										) : (
											<KeyboardArrowUpIcon />
										)}
									</FlexBox>
								</th>
								<th>
									<FlexBox
										onClick={() => {
											handleFilter('floorPrice', !filterFloorPrice);
											setFilterFloorPrice(!filterFloorPrice);
										}}
									>
										<Typography>Floor Price</Typography>
										{!filterFloorPrice ? (
											<KeyboardArrowDownIcon />
										) : (
											<KeyboardArrowUpIcon />
										)}
									</FlexBox>
								</th>
							</tr>
						</thead>
						<tbody>
							{listCollection.map((collection: Collection, index: number) => (
								<tr key={index}>
									<th>
										<FlexBox>
											<CollectionName
												onClick={() =>
													navigate(
														`/collections/view/${collection.collectionId}`
													)
												}
											>
												<Avatar
													variant="rounded"
													src={collection.logo}
													sx={{ width: 40, height: 40, margin: '0 10px' }}
													alt="collection logo"
												/>
												<Typography>{collection.collectionName}</Typography>
											</CollectionName>
										</FlexBox>
									</th>
									<td>
										<FlexBox>
											<Fragment>{renderVolume(collection)}</Fragment>
										</FlexBox>
									</td>
									<td>
										<FlexBox>{renderPercent(collection.percent24Hour)}</FlexBox>
									</td>
									<td>
										<FlexBox>{renderPercent(collection.percent7Days)}</FlexBox>
									</td>
									<td>
										<FlexBox>{renderPercent(collection.percent30Days)}</FlexBox>
									</td>
									<td>
										<FlexBox>{collection.items}</FlexBox>
									</td>
									<td>
										<FlexBox>
											$ {formatNumber(collection.floorPrice.toString()!, 2)}
										</FlexBox>
									</td>
								</tr>
							))}
						</tbody>
					</TableScrollable>
				</TableWrapper>
			) : (
				<TableWrapper>
					<TableScrollable>
						<thead>
							<tr>
								<th>
									<FlexBox>
										<Typography>Collection</Typography>
									</FlexBox>
								</th>
								<th>
									<FlexBox>
										<Typography>Volume Trade</Typography>
										<KeyboardArrowDownIcon />
									</FlexBox>
								</th>
								<th>
									<FlexBox>24h %</FlexBox>
								</th>
								<th>
									<FlexBox>7d %</FlexBox>
								</th>
								<th>
									<FlexBox>30d %</FlexBox>
								</th>
								<th>
									<FlexBox>
										<Typography>Items</Typography>

										<KeyboardArrowDownIcon />
									</FlexBox>
								</th>
								<th>
									<FlexBox>
										<Typography>Floor Price</Typography>

										<KeyboardArrowDownIcon />
									</FlexBox>
								</th>
							</tr>
						</thead>
						<tbody>
							{new Array(10).fill(null).map((item: any, index: number) => (
								<tr key={index}>
									<th>
										<FlexBox sx={{ height: 40 }}>
											<Skeleton sx={{ width: 250 }} />
										</FlexBox>
									</th>
									{new Array(6).fill(null).map((item: any, idx: number) => (
										<td key={idx}>
											<FlexBox>
												<Skeleton sx={{ width: '100%' }} />
											</FlexBox>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</TableScrollable>
				</TableWrapper>
			)}
		</Box>
	);
}
