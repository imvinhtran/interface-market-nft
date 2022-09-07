/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
import { selectChainId, selectAddress } from 'redux/slices/web3InfoSlice';
import { selectFilter } from 'redux/slices/orderSlice';
//actions
import { fetchDetailNftItemById } from 'redux/actions/nftItemByItemIdAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
import { fetchListOrderOffer } from 'redux/actions/orderAction';
import { fetchTradingHistoryByNFTsId } from 'redux/actions/tradingAction';
// models
import { NFT, OrderResponseAPI, PriceActivity } from 'models';
// mui
import { Container, Grid, Box } from '@mui/material';
// api
import orderApi from 'apis/orderApi';
import historyApi from 'apis/historyApi';
// components
import Loadable from 'components/CustomUI/LoadableComponent';
// utils
import { compareDate, timestampToDate } from 'utils';
// constants
import { ORDER_TYPE } from '../../constants';

const TradingHistory = Loadable(lazy(() => import('components/pages/ItemDetail/TradingHistory')));
const ItemImage = Loadable(lazy(() => import('components/pages/ItemDetail/ItemImage')));
const MoreItem = Loadable(lazy(() => import('components/pages/ItemDetail/MoreItem')));
const TabItemDetail = Loadable(lazy(() => import('components/pages/ItemDetail/TabItemDetail')));
const Loading = Loadable(lazy(() => import('components/CustomUI/LoadingPage')));

declare let window: any;

const Detail = () => {
	const { itemId } = useParams();
	const dispatch = useDispatch();

	//state
	const [listActivityPriceChart, setListActivityPriceChart] = useState<PriceActivity[]>([]);
	const [personalOffer, setPersonalOffer] = useState<OrderResponseAPI | null>(null);
	const [isLoadingPersonalOffer, setIsLoadingPersonalOffer] = useState<boolean>(false);
	const [isDeletingOrderExpired, setIsDeletingOrderExpired] = useState<boolean>(false);
	const [stateRefetchApi, setStateRefetchApi] = useState<boolean>(false);

	//selector
	const item: NFT | null = useSelector(selectNftItem);
	const chainId = useSelector(selectChainId);
	const isLoadingItem = useSelector(selectLoading);
	const filter = useSelector(selectFilter);
	const addressState = useSelector(selectAddress);

	//useEffect
	// fetch NFT detail
	useEffect(() => {
		if (itemId) dispatch(fetchDetailNftItemById(itemId, executeAfterFetchNftItemById));

		window.scrollTo({ top: 0, behavior: 'smooth' });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateRefetchApi, itemId]);

	// fetch list payment token
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	// fetch list order offer
	useEffect(() => {
		if (chainId && itemId) {
			dispatch(fetchListOrderOffer({ itemId, ...filter }, executeAfterFetchListOrderOffer));
		}
	}, [dispatch, chainId, filter, stateRefetchApi, itemId]);

	//fetch personal order offer
	useEffect(() => {
		if (addressState && itemId) {
			(async () => {
				try {
					setIsLoadingPersonalOffer(true);
					const offerRes: OrderResponseAPI = await orderApi.getPersonalOffer(
						addressState,
						itemId
					);

					setPersonalOffer(offerRes);
				} catch (error: any) {
					setPersonalOffer(null);
					console.log(error.message);
				} finally {
					setIsLoadingPersonalOffer(false);
				}
			})();
		}
	}, [addressState, itemId, stateRefetchApi]);

	// fetch activity price chart
	useEffect(() => {
		if (itemId) {
			(async function () {
				try {
					const response: PriceActivity[] = await historyApi.getActivityPriceChart(
						itemId
					);

					setListActivityPriceChart(response);
				} catch (e: any) {
					console.log(e);
				}
			})();
		}
	}, [dispatch, stateRefetchApi, itemId]);

	// fetch history of the item
	useEffect(() => {
		if (chainId) {
			dispatch(
				fetchTradingHistoryByNFTsId({ chainId, itemId }, executeAfterFetchHistoryOfItem)
			);
		}
	}, [dispatch, itemId, chainId, stateRefetchApi, itemId]);

	//function
	const refetchApi = () => {
		setStateRefetchApi(!stateRefetchApi);
	};

	const executeAfterFetchNftItemById = async (globalStateNewest: RootState) => {
		const { nftItem } = globalStateNewest;

		if (!nftItem.isSuccess) {
			toast.error(nftItem.errorMessage, {
				autoClose: 2500,
			});
			return;
		}

		// check expire order sell
		const orderSell: OrderResponseAPI | undefined = nftItem.NFTItem!.order;
		if (
			orderSell &&
			compareDate(new Date(), timestampToDate(parseInt(orderSell.expirationTime))) > 0
		) {
			try {
				setIsDeletingOrderExpired(true);
				// call api delete order sell and save a history record on database
				const collectionId = nftItem.NFTItem!.collection?.collectionId;

				const deleteData = {
					collectionId,
					orderId: orderSell.orderId ?? orderSell._id,
					type: ORDER_TYPE.EXPIRED_LISTING,
					transactionHash: '',
				};

				await orderApi.deleteOrder(deleteData);

				refetchApi();
			} catch (error) {
				toast.error('Some error occur when executing your expired order sell!');
			} finally {
				setIsDeletingOrderExpired(false);
			}
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	const executeAfterFetchListOrderOffer = (globalStateNewest: RootState) => {
		const { order } = globalStateNewest;
		if (!order.isSuccess) {
			toast.error('Can not fetch order offer of this item!');
		}
	};

	const executeAfterFetchHistoryOfItem = (globalStateNewest: RootState) => {
		const { tradeHistory } = globalStateNewest;
		if (!tradeHistory.isSuccess) {
			toast.error('Can not fetch histories of this item!');
		}
	};

	return (
		<>
			{isLoadingItem || isDeletingOrderExpired ? (
				<Loading />
			) : (
				<Container maxWidth="xl" sx={{ mt: 5 }}>
					<Grid container spacing={10}>
						<Grid item xs={12} lg={6}>
							<ItemImage item={item} />
						</Grid>
						<Grid item xs={12} lg={6}>
							<TabItemDetail
								// props for ItemInfoTab
								item={item}
								personalOffer={personalOffer}
								loadingPersonalOffer={isLoadingPersonalOffer}
								refetchApi={refetchApi}
								// props for GraphTab
								listActivityPriceChart={listActivityPriceChart}
							/>
						</Grid>
					</Grid>

					{item && (
						<Box sx={{ mt: 5 }}>
							<TradingHistory />
						</Box>
					)}

					{itemId && (
						<Box sx={{ mt: 5 }}>
							<MoreItem collection={item?.collection} itemId={itemId} />
						</Box>
					)}
				</Container>
			)}
		</>
	);
};

export default Detail;
