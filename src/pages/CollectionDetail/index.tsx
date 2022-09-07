/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
//mui
import { Box, Container } from '@mui/material';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { selectChainId } from 'redux/slices/web3InfoSlice';
import {
	selectCollectionItem,
	selectLoading as selectLoadingCollection,
} from 'redux/slices/collectionSlice';
// actions
import { fetchCollectionDetailById } from 'redux/actions/collectionAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
// styled
import {
	CollectionBackground,
	CollectionDescription,
	CollectionMoreInfo,
	CollectionMoreInfoWrapper,
	ReadMoreButton,
} from './styled';
import { fetchCollectionHistory } from 'redux/actions/tradingAction';
import { sliceString } from 'utils';

//Loadable components
const TabDetailCollection = Loadable(
	lazy(() => import('components/pages/CollectionDetail/TabDetailCollection'))
);
const Loading = Loadable(lazy(() => import('components/CustomUI/LoadingPage')));
const LazyImage = Loadable(lazy(() => import('components/CustomUI/LazyImages/LazyImage')));
const InfoCollection = Loadable(
	lazy(() => import('components/pages/CollectionDetail/InfoCollection'))
);

function DetailCollection() {
	const { collectionId } = useParams();
	const dispatch = useDispatch();

	// useState
	const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

	// useSelector
	const chainId = useSelector(selectChainId);
	const collection = useSelector(selectCollectionItem);
	const loadingCollection = useSelector(selectLoadingCollection);

	// fetch collection by id
	useEffect(() => {
		if (!collectionId) return;
		dispatch(fetchCollectionDetailById(collectionId));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionId]);

	// fetch histories of collection
	useEffect(() => {
		if (collectionId) {
			dispatch(fetchCollectionHistory(collectionId, executeAfterFetchCollectionHistory));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionId]);

	// fetch list token payment
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
	}, [chainId, dispatch, collectionId]);

	// function
	const executeAfterFetchCollectionHistory = (globalStateNewest: RootState) => {
		const { tradeHistory } = globalStateNewest;
		if (!tradeHistory.isSuccess) {
			toast.error('Can not fetch collection history!' + tradeHistory.errorMessage);
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	return (
		<>
			{loadingCollection ? (
				<Loading />
			) : (
				<Container maxWidth="xl" sx={{ pt: '5px' }}>
					<CollectionBackground>
						<LazyImage
							src={collection?.background}
							alt="user background"
							style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						/>
					</CollectionBackground>
					<InfoCollection collection={collection} />

					{collection && (
						<CollectionMoreInfoWrapper>
							<CollectionMoreInfo>
								<CollectionDescription variant="body1">
									{isLoadMore
										? collection.description
										: sliceString(collection.description, 100)}
								</CollectionDescription>

								{collection.description.length > 100 && !isLoadMore && (
									<ReadMoreButton
										variant="button"
										onClick={() => {
											setIsLoadMore(true);
										}}
									>
										Read more
									</ReadMoreButton>
								)}

								{isLoadMore && (
									<ReadMoreButton
										variant="button"
										onClick={() => {
											setIsLoadMore(false);
										}}
									>
										Show less
									</ReadMoreButton>
								)}
							</CollectionMoreInfo>
						</CollectionMoreInfoWrapper>
					)}

					<Box sx={{ mt: '60px' }}>
						<TabDetailCollection />
					</Box>
				</Container>
			)}
		</>
	);
}

export default React.memo(DetailCollection);
