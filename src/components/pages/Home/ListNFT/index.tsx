/* eslint-disable @typescript-eslint/no-unused-vars */
// components
import { Box } from '@mui/material';
import nftsApi from 'apis/nftsApi';
import NFTItem from 'components/CustomUI/Card/NFTItem';
import NoItem from 'components/CustomUI/Card/NoItemCard/NoItemRectangleCard';
import ErrorBoundary from 'components/CustomUI/ErrorBoundary';
import SkeletonNftList from 'components/CustomUI/Skeleton/List/SkeletonNFTList';
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// styled
import { BoxGrid } from './styled';

const ListNFT = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [listNFTs, setListNFTs] = useState<any>([]);
	const [refresh, setRefresh] = useState<boolean>(false);

	// useEffect
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const listToken = await nftsApi.getListTokenId({ page: 1, pageSize: 10 }, {});
				setListNFTs(listToken.data);
				setIsLoading(false);
				setIsSuccess(true);
			} catch (error) {
				toast.error('Some error occurred while fetching');
				setIsLoading(false);
				setIsSuccess(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	const handleRefresh = (e: any) => {
		e.stopPropagation();
		setRefresh(false);
		setTimeout(() => {
			setRefresh(true);
		}, 1);
	};

	return (
		<Fragment>
			{isLoading ? (
				<BoxGrid sx={{ mt: 2 }}>
					<SkeletonNftList amount={10} />
				</BoxGrid>
			) : isSuccess ? (
				<BoxGrid sx={{ mt: 2 }}>
					{listNFTs.map((item: any, index: number) => {
						return <NFTItem itemId={item} key={index} />;
					})}
				</BoxGrid>
			) : (
				<ErrorBoundary
					title="Error!!!"
					content="Currently we couldn't load this content. Please refresh"
					callbackFn={handleRefresh}
				/>
			)}
		</Fragment>
	);
};

export default React.memo(ListNFT);
