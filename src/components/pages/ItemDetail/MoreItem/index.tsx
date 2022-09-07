import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import IconCollectionWhite from 'assets/icons/collection-white.webp';
import IconCollectionBlack from 'assets/icons/collection-black.webp';
// mui
import { Box, useTheme } from '@mui/material';
// component
import ExpandCard from '../ExpandCard';
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
// import MoreItemFromCollectionCard from 'components/CustomUI/Card/MoreItemFromCollectionCard';
import NFTItem from 'components/CustomUI/Card/NFTItem';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { resetAll, selectListNft } from 'redux/slices/collectionItemSlice';
// actions
import { fetchNFTsByCollectionId } from 'redux/actions/collectionItemAction';
// styled
import { CollectionSlide } from './styled';
// models
import { Collection } from 'models';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

export interface IMoreItemProps {
	itemId: string;
	collection: Collection | null | undefined;
}

export default function MoreItem({ collection, itemId }: IMoreItemProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	const dispatch = useDispatch();
	// useSelector
	const listTokenId = useSelector(selectListNft);

	// fetch only 20 items from current collection
	// isFirstLoad === true
	useEffect(() => {
		if (collection) {
			dispatch(
				fetchNFTsByCollectionId(
					collection._id!,
					collection.chainId,
					{ page: 1, pageSize: 20 },
					{},
					true,
					executeAfterFetchNFTsByCollectionId
				)
			);
		}

		return () => {
			dispatch(resetAll());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collection]);

	// function
	const executeAfterFetchNFTsByCollectionId = (globalStateNewest: RootState) => {
		const { collectionItem } = globalStateNewest;
		if (!collectionItem.isSuccess) {
			toast.error(collectionItem.errorMessage);
		}
	};

	return (
		<ExpandCard
			title="More from this collection"
			icon={isLightTheme ? IconCollectionBlack : IconCollectionWhite}
			alt="more-icon"
		>
			<Box sx={{ mt: '20px' }}>
				{listTokenId.length > 1 ? (
					<CollectionSlide>
						{listTokenId
							.filter((item: any) => {
								return item._id !== itemId;
							})
							.map((item: any, idx: number) => {
								return (
									<Box
										sx={{
											width: '250px',
											marginRight: '20px',
											flexShrink: 0,
										}}
										key={idx}
									>
										<NFTItem itemId={item} />
									</Box>
								);
							})}
					</CollectionSlide>
				) : (
					<Box sx={{ mt: 5, width: '100%' }}>
						<NoItemCircleCard title="No items left!" image={ImageNoOffer} />
					</Box>
				)}
			</Box>
		</ExpandCard>
	);
}
