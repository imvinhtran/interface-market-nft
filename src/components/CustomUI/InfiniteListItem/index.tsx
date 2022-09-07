/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// mui
import { Box, styled } from '@mui/material';
// components
import NFTItem from '../Card/NFTItem';
import SkeletonNftList from 'components/CustomUI/Skeleton/List/SkeletonNFTList';
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

export interface InfiniteListItemProps {
	listTokenId: any;
	isLoading: boolean;
	hasNextPage: boolean;
	fetchNextPage: Function;
	allowLoadMore: boolean;
}

const BoxGrid = styled(Box)({
	display: 'grid',
	gridAutoFlow: 'row',
	gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
	gap: 15,
});

export default function InfiniteListItem({
	listTokenId,
	isLoading,
	hasNextPage,
	fetchNextPage,
	allowLoadMore,
}: InfiniteListItemProps) {
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
			<BoxGrid ref={listRef}>
				{listTokenId.map((item: any, index: number) => {
					return <NFTItem itemId={item} key={index} />;
				})}
				{isLoading && <SkeletonNftList />}
			</BoxGrid>

			{!isLoading && listTokenId && listTokenId.length === 0 && (
				<NoItemCircleCard title="No data yet!" image={ImageNoOffer} />
			)}
		</Box>
	);
}
