// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
//mui
import { Box } from '@mui/material';
//styled
import { BoxGrid } from './styled';
//components
import NFTItem from '../Card/NFTItem';
import SkeletonNftList from '../Skeleton/List/SkeletonNFTList';

export interface InfiniteListProps {
	userAddress: string | null | undefined;
	chainId: number;
	listTokenId: any;
	hasNextPage: boolean | undefined;
	callApi: any;
}

const InfiniteList = ({
	userAddress,
	chainId,
	listTokenId,
	hasNextPage,
	callApi,
}: InfiniteListProps) => {
	// const renderInfinityList = useCallback(
	// 	(fetchNextPage: any, hasNextPage: boolean | undefined) => {
	// 		return (
	// 			<BoxGrid>
	// 				<InfiniteScroll
	// 					dataLength={listTokenId.length}
	// 					next={fetchNextPage}
	// 					hasMore={hasNextPage!}
	// 					loader={<SkeletonNftList />}
	// 					className="GridList"
	// 				>
	// 					{listTokenId.map((item: any, index: number) => (
	// 						<NFTItem itemId={item} key={index} />
	// 					))}
	// 				</InfiniteScroll>
	// 			</BoxGrid>
	// 		);
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[userAddress, listTokenId, chainId]
	// );

	return (
		<Box sx={{ width: '100%' }}>
			{/* {renderInfinityList(callApi, hasNextPage)} */}
			<BoxGrid>
				<InfiniteScroll
					dataLength={listTokenId.length}
					next={callApi}
					hasMore={hasNextPage!}
					loader={<SkeletonNftList />}
					className="GridList"
				>
					{listTokenId.map((item: any, index: number) => (
						<NFTItem itemId={item} key={index} />
					))}
				</InfiniteScroll>
			</BoxGrid>

			{hasNextPage === undefined && (
				<BoxGrid>
					<Box className="GridList">
						<SkeletonNftList />
					</Box>
				</BoxGrid>
			)}
		</Box>
	);
};

export default InfiniteList;
