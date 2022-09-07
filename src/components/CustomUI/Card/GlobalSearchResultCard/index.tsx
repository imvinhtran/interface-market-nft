/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { Avatar, Box, Typography } from '@mui/material';
// components
import SkeletonGlobalSearchResultCard from 'components/CustomUI/Skeleton/Item/SkeletonGlobalSearchResultCard';
// styled
import { ResultItem } from './styled';
// utils
import { sliceAddress } from 'utils';
// apis
import nftsApi from 'apis/nftsApi';
import collectionApi from 'apis/collectionApi';
import userApi from 'apis/userApi';
// redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';

interface SearchResult {
	image: string;
	info1: string;
	info2: string;
	src: string;
}

export interface IGlobalSearchResultCardProps {
	resultId: string;
	type: 'collection' | 'item' | 'user';
	deactivateDropdown: Function;
}

export default function GlobalSearchResultCard({
	resultId,
	type,
	deactivateDropdown,
}: IGlobalSearchResultCardProps) {
	const navigate = useNavigate();

	// useState
	const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// useSelector
	const userAddress = useSelector(selectAddress);

	// useEffect
	useEffect((): any => {
		let mounted = true;

		(async () => {
			setIsLoading(true);

			try {
				if (type === 'collection') {
					const res: any = await collectionApi.getSearchCollectionById(resultId);

					if (mounted) {
						setSearchResult({
							image: res.logo,
							info1: res.collectionName,
							info2: sliceAddress(res.collectionAddress, 6, 5) ?? '',
							src: `/collections/view/${res._id}`,
						});
					}
				} else if (type === 'item') {
					const res: any = await nftsApi.getSearchNftItemById(resultId);

					console.log(res);

					if (mounted) {
						setSearchResult({
							image: res.itemMedia,
							info1: res.itemName,
							info2: sliceAddress(res.itemTokenId, 6, 5) ?? '',
							src: `/detail/${res._id}`,
						});
					}
				} else {
					const res: any = await userApi.getSearchUser(resultId);

					if (mounted) {
						setSearchResult({
							image: res.avatar,
							info1: res.username,
							info2: sliceAddress(res.userAddress, 6, 5) ?? '',
							src:
								userAddress === res.userAddress
									? 'my-info-account'
									: `/info-account/${res.userAddress}`,
						});
					}
				}
			} catch (error) {
				console.log(error);
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		})();

		return () => (mounted = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return !isLoading ? (
		searchResult ? (
			<ResultItem
				onClick={() => {
					deactivateDropdown();
					navigate(searchResult.src);
				}}
			>
				<Avatar
					src={searchResult.image}
					alt="collection logo"
					sx={{ width: '40px', height: '40px' }}
				/>
				<Box>
					<Typography variant="body1">{searchResult.info1}</Typography>
					<Typography variant="body2" sx={{ opacity: 0.5 }}>
						{searchResult.info2}
					</Typography>
				</Box>
			</ResultItem>
		) : (
			<></>
		)
	) : (
		<SkeletonGlobalSearchResultCard />
	);
}
