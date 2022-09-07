import React, { lazy, useEffect, useRef } from 'react';
// mui
import { Box, Grid } from '@mui/material';
// components
import Loadable from 'components/CustomUI/LoadableComponent';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

const NoItemCircleCard = Loadable(
	lazy(() => import('components/CustomUI/Card/NoItemCard/NoItemCircleCard'))
);
const SkeletonCollectionList = Loadable(
	lazy(() => import('components/CustomUI/Skeleton/List/SkeletonCollectionList'))
);

const CollectionCard = Loadable(lazy(() => import('components/CustomUI/Card/CollectionCard')));
export interface InfiniteListCollectionProps {
	listTokenId: any;
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: Function;
	allowLoadMore: boolean;
}

export default function InfiniteListCollection({
	listTokenId,
	isLoading,
	hasNextPage,
	fetchNextPage,
	allowLoadMore,
}: InfiniteListCollectionProps) {
	const listRef = useRef<any>();

	useEffect(() => {
		// Handler to call on window scroll
		function handleScroll() {
			//Loadmore when scroll to the bottom of list
			if (allowLoadMore && hasNextPage && listRef.current) {
				const bottom = listRef.current.getBoundingClientRect().bottom;

				if (window.innerHeight > bottom - 300) {
					fetchNextPage();
				}
			}
		}
		// Add event listener
		window.addEventListener('scroll', handleScroll, { passive: true });
		// Call handler right away so state gets updated with initial window position
		handleScroll();
		// Remove event listener on cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasNextPage, allowLoadMore]);

	return (
		<Box sx={{ width: '100%' }}>
			<Grid
				container
				spacing={4}
				columns={{ xs: 1, md: 2, lg: 3 }}
				sx={{ marginTop: '20px' }}
				ref={listRef}
			>
				{listTokenId.map((item: any, index: number) => {
					return (
						<Grid item xs={1} key={index}>
							<CollectionCard collectionId={item} />
						</Grid>
					);
				})}
				{isLoading && <SkeletonCollectionList />}
			</Grid>

			{!isLoading && listTokenId && listTokenId.length === 0 && (
				<NoItemCircleCard title="No data yet!" image={ImageNoOffer} />
			)}
		</Box>
	);
}
