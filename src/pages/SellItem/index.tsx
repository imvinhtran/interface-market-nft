/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//components
import SaleItemMethod from 'components/pages/SellItem/SaleItemMethod';
import SaleItemSetup from 'components/pages/SellItem/SaleItemSetup';
import SaleItemSummary from 'components/pages/SellItem/SaleItemSummary';
import Modal from 'components/CustomUI/Modal/index';
import LoadingPage from 'components/CustomUI/LoadingPage';
//redux
import { RootState } from 'redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
import {
	selectNftItem,
	selectLoading as selectLoadingNftItem,
} from 'redux/slices/nftItemByItemIdSlice';
import {
	selectListTokenPayment,
	selectLoading as selectLoadingListToken,
} from 'redux/slices/tokenPaymentSlice';
import {
	selectCollectionItem,
	selectLoading as selectLoadingCollection,
} from 'redux/slices/collectionSlice';
// actions
import { fetchDetailNftItemById } from 'redux/actions/nftItemByItemIdAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { fetchCollectionById } from 'redux/actions/collectionAction';
// model
import { NFT, TokenPayment } from 'models';
// mui
import { Container, Grid, Typography, Stack } from '@mui/material';
// context
import SellingController from 'contexts/SellingContext';
// constants
import { ITEM_STATUS } from '../../constants';

function SellItem() {
	const { itemId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//state
	const [modalErrorItem, setModalErrorItem] = useState(false);
	const [modalErrorCollection, setModalErrorCollection] = useState(false);
	const [modalErrorListTokenPayment, setModalErrorListTokenPayment] = useState(false);

	//selector
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);

	const item: NFT | null = useSelector(selectNftItem);
	const loadingNftItem = useSelector(selectLoadingNftItem);

	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);
	const loadingListToken: boolean = useSelector(selectLoadingListToken);

	const collection = useSelector(selectCollectionItem);
	const loadingCollection = useSelector(selectLoadingCollection);

	// useEffect
	// fetch nft info and list payment token
	useEffect(() => {
		if (itemId) {
			dispatch(fetchDetailNftItemById(itemId, executeAfterFetchNftItemById));
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemId]);

	// functions
	const executeAfterFetchCollectionById = (globalStateNewest: RootState) => {
		const { collection } = globalStateNewest;
		if (!collection.isSuccess) {
			setModalErrorCollection(true);
		}
	};

	const executeAfterFetchNftItemById = (globalStateNewest: RootState) => {
		const { nftItem } = globalStateNewest;
		if (nftItem.isSuccess) {
			if (nftItem.NFTItem!.status === ITEM_STATUS.BUY_NOW) {
				navigate(`/detail/${itemId}`);
				return;
			}
			// after fetch item success, fetch collection of the item
			dispatch(
				fetchCollectionById(nftItem.NFTItem!.collectionId, executeAfterFetchCollectionById)
			);
		} else {
			setModalErrorItem(true);
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			setModalErrorListTokenPayment(true);
		}
	};

	return (
		<SellingController>
			{loadingNftItem || loadingCollection || loadingListToken ? (
				<LoadingPage />
			) : (
				item &&
				collection &&
				listTokenPayment.length > 0 && (
					<Container maxWidth="xl">
						<Typography variant="h3" sx={{ p: '2rem 0' }}>
							List item for sale
						</Typography>
						<Grid container spacing={3}>
							<Grid item xs={12} md={8}>
								<Typography variant="h6" sx={{ pb: '1rem' }}>
									Choose your sell method
								</Typography>

								<Grid container spacing={3}>
									<Grid item xs={12} lg={4} xl={3}>
										<SaleItemMethod />
									</Grid>
									<Grid item xs={12} lg={8} xl={9}>
										<SaleItemSetup listTokenPayment={listTokenPayment} />
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={4}>
								<Stack>
									<Typography variant="h6" sx={{ pb: '1rem' }}>
										Review
									</Typography>

									<SaleItemSummary collection={collection} currentItem={item} />
								</Stack>
							</Grid>
						</Grid>
					</Container>
				)
			)}

			{modalErrorItem && (
				<Modal
					onOpen={modalErrorItem}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						Item not found!
					</Typography>
				</Modal>
			)}

			{!loadingNftItem && userAddress !== item?.owner && (
				<Modal
					onOpen={true}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						You are not the owner of this item!
					</Typography>
				</Modal>
			)}

			{!modalErrorCollection && (
				<Modal
					onOpen={modalErrorCollection}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						Collection not found!
					</Typography>
				</Modal>
			)}

			{modalErrorListTokenPayment && (
				<Modal
					onOpen={modalErrorListTokenPayment}
					mainHeader="An error occurred"
					onClose={() => {
						navigate('/');
					}}
					style={{ maxWidth: 400 }}
				>
					<Typography
						variant="h6"
						sx={{ width: '100%', textAlign: 'center', pb: '1rem' }}
					>
						List token payment not found!
					</Typography>
				</Modal>
			)}
		</SellingController>
	);
}

export default SellItem;
