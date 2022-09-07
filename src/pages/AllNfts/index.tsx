/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
//redux
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
	resetAll,
	selectAllNfts,
	selectFilter,
	selectHasNextPage,
	selectInitialState,
	selectLoading,
	selectPagination,
	setFilter,
	setPagination,
} from 'redux/slices/allNftsSlice';
//actions
import { fetchAllNFTs } from 'redux/actions/allNftsAction';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
//mui
import { Box, Container, Stack, Typography } from '@mui/material';
import { FilterStack } from './styled';
import { selectChainId } from 'redux/slices/web3InfoSlice';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';

const InfiniteListItem = Loadable(lazy(() => import('components/CustomUI/InfiniteListItem')));
const ButtonLoadmore = Loadable(lazy(() => import('components/CustomUI/ButtonLoadmore')));
const FilterItemGroup = Loadable(lazy(() => import('components/CustomUI/FilterItemGroup')));
const FieldInput = Loadable(lazy(() => import('components/CustomField/FieldInput')));

function AllNFT() {
	const dispatch = useDispatch();
	const typingTimeoutRef = useRef<any>(null);

	// useState
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);

	// useSelector
	const chainId = useSelector(selectChainId);
	const pagination = useSelector(selectPagination);
	const filter = useSelector(selectFilter);
	const hasNextPage = useSelector(selectHasNextPage);
	const listTokenId = useSelector(selectAllNfts);
	const isLoading = useSelector(selectLoading);

	const initialState = selectInitialState;

	// useEffect
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// fetch list payment token
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	// fetchAllNFTs isFirstLoad === true
	useEffect(() => {
		dispatch(
			fetchAllNFTs(
				initialState.pagination,
				initialState.filter,
				true,
				executeAfterFetchAllNfts
			)
		);

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// fetchAllNFTs isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !filter.isFiltering) {
			return;
		}

		dispatch(fetchAllNFTs(pagination, filter, false, executeAfterFetchAllNfts));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination, filter]);

	useEffect(() => {
		if (fetchNextPage) {
			dispatch(setPagination({ ...pagination, page: pagination.page + 1 }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchNextPage]);

	// functions
	const handleFetchNextPage = () => {
		setFetchNextPage(true);
	};

	const executeAfterFetchAllNfts = (globalStateNewest: RootState) => {
		setFetchNextPage(false);

		const { allNfts } = globalStateNewest;

		if (!allNfts.isSuccess) {
			toast.error('Some error occur when getting all NFTs! ' + allNfts.errorMessage);
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	const handleFilterByName = (e: any) => {
		const value = e.target.value;

		if (typingTimeoutRef) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			dispatch(setFilter({ ...filter, itemName: value }));
		}, 500);
	};

	return (
		<Container maxWidth="xl">
			<Typography variant="h2" sx={{ mt: 3 }}>
				NFTSpaceX
			</Typography>

			<FilterStack sx={{ mt: 5 }}>
				<FilterItemGroup
					filterBlockChain
					filterStatus
					filterCollection
					filterPrice
					initialStateFilter={initialState.filter}
					filter={filter}
					setFilter={setFilter}
				/>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="end"
					spacing={2}
					sx={{ flexGrow: 1 }}
				>
					<Box sx={{ flexGrow: 1 }}>
						<FieldInput
							type="text"
							onChange={handleFilterByName}
							placeholder="Search name ..."
							sx={{
								padding: '12px 15px',
								width: '80%',
								marginLeft: 'auto',
								minWidth: '130px',
								maxWidth: '500px',
							}}
						/>
					</Box>
				</Stack>
			</FilterStack>

			<Box sx={{ mt: 3 }}>
				<InfiniteListItem
					listTokenId={listTokenId}
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

export default AllNFT;
