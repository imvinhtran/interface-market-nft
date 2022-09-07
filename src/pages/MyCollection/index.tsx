/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectListCollectionsByOwnerOrCreatorItems,
	selectPagination,
	selectLoading,
	selectFilter,
	selectHasNextPage,
	resetAll,
	setPagination,
	selectInitialState,
} from 'redux/slices/collectionSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
//actions
import { fetchListCollectionsByOwnerOrCreatorItems } from 'redux/actions/collectionAction';
//components
import ButtonGradient from '../../components/CustomUI/ButtonGradient';
import Modal from 'components/CustomUI/Modal';
import SelectCustom from 'components/CustomField/SelectCustom';
import Loadable from 'components/CustomUI/LoadableComponent';
//mui
import { Box, CircularProgress, Container, Stack, Typography, useTheme } from '@mui/material';
// styled
import { ButtonImport } from './styled';
// models
import { FilterCollection, OptionSelectCustom } from 'models';
// constants
import { listBlockChain } from 'components/CustomUI/FilterItemGroup/FilterBlockChain';
import FieldInput from 'components/CustomField/FieldInput';
import collectionApi from 'apis/collectionApi';

const listBlockchainTransformed: OptionSelectCustom[] = listBlockChain.map((item) => {
	return { name: item.name, value: item.chainId, image: item.chainImage };
});

const InfiniteListCollection = Loadable(
	lazy(() => import('components/CustomUI/InfiniteListCollection'))
);
const ButtonLoadmore = Loadable(lazy(() => import('components/CustomUI/ButtonLoadmore')));

function MyCollection() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [modal, setModal] = useState<boolean>(false);
	const [currentBlockchain, setCurrentBlockchain] = useState<OptionSelectCustom>(
		listBlockchainTransformed[0]
	);
	const [inputValue, setInputValue] = useState<string>('');
	const [allowLoadMore, setAllowLoadMore] = useState<boolean>(false);
	const [fetchNextPage, setFetchNextPage] = useState<boolean>(false);
	const [refetchApi, setRefetchApi] = useState<boolean>(false);
	const [isImporting, setIsImporting] = useState<boolean>(false);

	// useSelector
	const userAddress = useSelector(selectAddress);
	const pagination = useSelector(selectPagination);
	const filter = useSelector(selectFilter);
	const hasNextPage = useSelector(selectHasNextPage);
	const listTokenId = useSelector(selectListCollectionsByOwnerOrCreatorItems);
	const isLoading = useSelector(selectLoading);

	const initialState = selectInitialState;

	// fetchAllCollection isFirstLoad === true
	useEffect(() => {
		if (userAddress) {
			const tempFilter: FilterCollection = {
				...initialState.filter,
				userAddress,
				isCreator: true,
				isOwner: true,
			};

			dispatch(
				fetchListCollectionsByOwnerOrCreatorItems(
					initialState.pagination,
					tempFilter,
					true,
					executeAfterFetchAllCollection
				)
			);
		}

		return () => {
			dispatch(resetAll());
			setAllowLoadMore(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userAddress, refetchApi]);

	// fetchAllCollection isFirstLoad === false
	useEffect(() => {
		if (pagination.page === 1 && !filter.isFiltering) {
			return;
		}

		if (userAddress) {
			const tempFilter: FilterCollection = {
				...filter,
				userAddress,
				isCreator: true,
				isOwner: true,
			};

			dispatch(
				fetchListCollectionsByOwnerOrCreatorItems(
					pagination,
					tempFilter,
					false,
					executeAfterFetchAllCollection
				)
			);
		}
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

	const executeAfterFetchAllCollection = (globalStateNewest: RootState) => {
		setFetchNextPage(false);

		const { collection } = globalStateNewest;

		if (!collection.isSuccess) {
			console.log('');
			toast.error(
				'Some error occur when getting all collections! ' + collection.errorMessage
			);
		}
	};

	const onChangeBlockchain = (option: OptionSelectCustom) => {
		setCurrentBlockchain(option);
	};

	const handleOnChangeInputValue = (e: any) => {
		setInputValue(e.target.value);
	};

	const handleImportCollection = async () => {
		console.log(inputValue);
		console.log(currentBlockchain.value);
		if (inputValue.trim() === '') {
			toast.warning('Please enter collection address!');
			return;
		}

		if (userAddress) {
			setIsImporting(true);
			try {
				await collectionApi.importCollection(
					Number(currentBlockchain.value),
					userAddress,
					inputValue
				);

				setRefetchApi(!refetchApi);
				setModal(false);
				toast.success('Import collection successfully!');
			} catch (error) {
				console.log(error);
				toast.warning(
					'We can not find your collection address! Please check your collection info again!'
				);
			} finally {
				setIsImporting(false);
			}
		}
	};

	return (
		<Container maxWidth="xl">
			<Typography variant="h2" sx={{ mt: 3 }}>
				Collectible asset
			</Typography>

			<Typography variant="body1">
				Create, curate, and manage collections of unique NFTs to share and sell.
			</Typography>

			<Stack
				direction="row"
				alignItems="stretch"
				sx={{ width: '100%', marginTop: '20px' }}
				spacing={2}
			>
				<Box sx={{ width: '180px' }}>
					<ButtonGradient
						sx={{ height: '100%' }}
						onClick={() => navigate('/collections/create-collection')}
					>
						<span>Create a collection</span>
					</ButtonGradient>
				</Box>

				<Box sx={{ width: '180px' }}>
					<ButtonImport
						sx={{
							height: '100%',
						}}
						onClick={() => {
							setModal(true);
						}}
					>
						<Typography variant="button" sx={{ textAlign: 'center', width: '100%' }}>
							Import a collection
						</Typography>
					</ButtonImport>

					<Modal
						onOpen={modal}
						mainHeader="Import Collection"
						style={{ maxWidth: '450px', overflowY: 'auto' }}
						allowClose={true}
						onClose={() => {
							setModal(false);
						}}
					>
						<Typography variant="h6" sx={{ mb: 1 }}>
							Blockchain
						</Typography>

						<SelectCustom
							currentItem={currentBlockchain}
							listItem={listBlockchainTransformed}
							onChange={onChangeBlockchain}
							sx={{}}
						/>

						<Typography variant="h6" sx={{ mb: 1, mt: 5 }}>
							Contract address
						</Typography>

						<FieldInput
							type="text"
							value={inputValue}
							placeholder={'Address...'}
							onChange={handleOnChangeInputValue}
						/>

						<ButtonGradient
							sx={{ mt: 3, mb: 2 }}
							disabled={isImporting}
							onClick={handleImportCollection}
						>
							{isImporting && (
								<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
							)}

							<span>{isImporting ? 'Importing...' : 'Import'}</span>
						</ButtonGradient>
					</Modal>
				</Box>
			</Stack>

			<Box sx={{ marginTop: '20px' }}>
				<InfiniteListCollection
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

export default React.memo(MyCollection);
