/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectListNft,
	selectHasNextPage,
	selectLoading,
	selectFilter,
	setFilter,
	selectInitialState,
	resetAll,
	selectPagination,
	setPagination,
} from 'redux/slices/collectionItemSlice';
import { selectCollectionItem } from 'redux/slices/collectionSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
// actions
import { fetchNFTsByCollectionId } from 'redux/actions/collectionItemAction';
// mui
import { Box, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// models
import InfiniteListItem from 'components/CustomUI/InfiniteListItem';
import FilterItemGroup from 'components/CustomUI/FilterItemGroup';
import FieldInput from 'components/CustomField/FieldInput';
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
import { toast } from 'react-toastify';
import { RootState } from 'redux/store';

function InWalletTab() {
	const navigate = useNavigate();
	const { collectionId } = useParams();
	const dispatch = useDispatch();
	const typingTimeoutRef = useRef<any>(null);

	// useState
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);

	// useSelector
	const collection = useSelector(selectCollectionItem);
	const userAddress = useSelector(selectAddress);
	const listNFTs = useSelector(selectListNft);
	const isLoading = useSelector(selectLoading);
	const hasNextPage = useSelector(selectHasNextPage);
	const filter = useSelector(selectFilter);
	const pagination = useSelector(selectPagination);

	const initialState = selectInitialState;

	// useEffect

	// fetch all nfts of collection
	// isFirstLoad === true
	useEffect(() => {
		if (collection) {
			dispatch(
				fetchNFTsByCollectionId(
					collection.collectionId,
					collection.chainId,
					initialState.pagination,
					initialState.filter,
					true,
					executeAfterFetchNFTsByCollectionId
				)
			);
		}

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collection]);

	// fetch all nfts of collection
	// isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !filter.isFiltering) {
			return;
		}

		if (collection) {
			dispatch(
				fetchNFTsByCollectionId(
					collection.collectionId,
					collection.chainId,
					pagination,
					filter,
					false,
					executeAfterFetchNFTsByCollectionId
				)
			);
		}
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

	const executeAfterFetchNFTsByCollectionId = (globalStateNewest: RootState) => {
		setFetchNextPage(false);
		const { collectionItem } = globalStateNewest;
		if (!collectionItem.isSuccess) {
			toast.error(collectionItem.errorMessage);
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
		<Fragment>
			<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
				<FilterItemGroup
					filterStatus
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

					<Tooltip title="Add Item" placement="top" arrow>
						<Box>
							<ButtonGradient
								sx={{ width: 'fit-content', py: 1 }}
								onClick={() =>
									navigate(`/collections/add-item/collectionId/${collectionId}`)
								}
								disabled={
									collection?.userAddress.toLowerCase() !==
									userAddress?.toLowerCase()
								}
							>
								<AddIcon />
							</ButtonGradient>
						</Box>
					</Tooltip>
				</Stack>
			</Stack>

			<Box sx={{ mt: 5 }}>
				<InfiniteListItem
					listTokenId={listNFTs}
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
		</Fragment>
	);
}

export default React.memo(InWalletTab);
