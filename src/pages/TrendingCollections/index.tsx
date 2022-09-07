/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, lazy } from 'react';
import { toast } from 'react-toastify';
//redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectListCollection,
	selectPagination,
	selectLoading,
	selectFilter,
	selectHasNextPage,
	resetAll,
	setPagination,
	selectInitialState,
	setFilter,
	selectIsFiltering,
} from 'redux/slices/collectionTrendingSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
//actions
import { fetchTrendingCollection } from 'redux/actions/collectionTrendingAction';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
//mui
import { Box, Container, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
//styled
import { FilterTrendingCollection } from 'components/pages/Home/ListTopCollection/styled';
import {
	CheckIconWrapper,
	DropdownWrapper,
	ListOption,
	OptionItem,
	OptionItemText,
} from 'components/CustomUI/FilterItemGroup/Common/styled';

const InfiniteListTrendingCollection = Loadable(
	lazy(() => import('components/CustomUI/InfiniteListTrendingCollection'))
);
const ButtonLoadmore = Loadable(lazy(() => import('components/CustomUI/ButtonLoadmore')));
const DropDown = Loadable(
	lazy(() => import('components/CustomUI/FilterItemGroup/Common/DropDown'))
);

type FilterProps = {
	name: string;
	value: string;
};

const listFilter: FilterProps[] = [
	{ name: '1 day', value: 'volume24Hours' },
	{ name: '7 days', value: 'volume7Days' },
	{ name: '30 days', value: 'volume30Days' },
];

function TrendingCollections() {
	const dispatch = useDispatch();

	// useState
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<string>('7 days');

	// useSelector
	const pagination = useSelector(selectPagination);
	const filter = useSelector(selectFilter);
	const hasNextPage = useSelector(selectHasNextPage);
	const listCollection = useSelector(selectListCollection);
	const isLoading = useSelector(selectLoading);
	const isFiltering = useSelector(selectIsFiltering);

	const initialState = selectInitialState;

	// useEffect
	// fetchTrendingCollection isFirstLoad === true
	useEffect(() => {
		dispatch(
			fetchTrendingCollection(
				initialState.pagination,
				initialState.filter,
				true,
				executeAfterFetchAllCollection
			)
		);

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// fetchTrendingCollection isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !isFiltering) {
			return;
		}

		dispatch(
			fetchTrendingCollection(pagination, filter, false, executeAfterFetchAllCollection)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, filter]);

	useEffect(() => {
		if (fetchNextPage) {
			dispatch(setPagination({ ...pagination, page: pagination.page + 1 }));
		}
	}, [fetchNextPage]);

	// functions
	const handleFetchNextPage = () => {
		setFetchNextPage(true);
	};

	const handleClickOption = (filterDay: FilterProps) => {
		setSelectedFilter(filterDay.name);
		// setSortBy(filter.value);
		console.log(filter);
		dispatch(setFilter({ ...filter, sortBy: filterDay.value }));
		setActiveDropDown(false);
	};

	const executeAfterFetchAllCollection = (globalStateNewest: RootState) => {
		setFetchNextPage(false);

		const { trendingCollection } = globalStateNewest;

		if (!trendingCollection.isSuccess) {
			toast.error(
				'Some error occur when getting trending collections! ' +
					trendingCollection.errorMessage
			);
		}
	};

	const renderButtonContent = () => (
		<FilterTrendingCollection variant="h2">
			{selectedFilter} <KeyboardArrowDownIcon sx={{ width: 40, height: 40 }} />
		</FilterTrendingCollection>
	);

	const renderDropdownContent = () => (
		<DropdownWrapper sx={{ width: '180px' }}>
			<ListOption>
				{listFilter.map((filter: FilterProps, index: number) => {
					const isItemSelected = selectedFilter === filter.name;
					return (
						<OptionItem key={index} onClick={() => handleClickOption(filter)}>
							<OptionItemText>{filter.name}</OptionItemText>

							{isItemSelected && (
								<CheckIconWrapper>
									<CheckIcon sx={{ width: '100%', height: '100%' }} />
								</CheckIconWrapper>
							)}
						</OptionItem>
					);
				})}
			</ListOption>
		</DropdownWrapper>
	);

	return (
		<Container maxWidth="xl">
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
				<Typography variant="h2">Ranking Collection in</Typography>
				<DropDown
					activeDropDown={activeDropDown}
					setActiveDropDown={setActiveDropDown}
					buttonContent={renderButtonContent()}
					dropdownContent={renderDropdownContent()}
				/>
			</Box>

			<Box sx={{ marginTop: '20px' }}>
				<InfiniteListTrendingCollection
					listCollection={listCollection}
					isLoading={isLoading}
					hasNextPage={hasNextPage}
					fetchNextPage={handleFetchNextPage}
					allowLoadMore={allowLoadMore}
				/>
			</Box>

			{!allowLoadMore && hasNextPage && !isLoading && (
				<Stack sx={{ marginTop: '50px' }} alignItems="center">
					<ButtonLoadmore onClick={() => setAllowLoadMore(true)} />
				</Stack>
			)}
		</Container>
	);
}

export default React.memo(TrendingCollections);
