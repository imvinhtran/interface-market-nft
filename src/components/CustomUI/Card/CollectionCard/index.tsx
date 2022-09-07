/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// styled
import {
	BottomPart,
	CollectionBackground,
	CollectionCardWrapper,
	CollectionInfo,
	CollectionLogo,
	CollectionLogoWrapper,
	CollectionName,
	CollectionNumberItem,
	CollectionOwner,
	OwnerName,
} from './styled';
// models
import { Collection } from 'models';
// utils
import { compressImage, sliceAddress } from 'utils';
// components
import Loadable from 'components/CustomUI/LoadableComponent';
// apis
import collectionApi from 'apis/collectionApi';
import { MediaErrorContent } from '../NFTItem/styled';

const LazyImageCustom = Loadable(
	lazy(() => import('components/CustomUI/LazyImages/LazyImageCustom'))
);
const SkeletonCollectionCard = Loadable(
	lazy(() => import('components/CustomUI/Skeleton/Item/SkeletonCollectionCard'))
);
export interface ICollectionCardProps {
	collectionId: string;
}

export default function CollectionCard({ collectionId }: ICollectionCardProps) {
	const navigate = useNavigate();
	const theme = useTheme();

	// useState
	const [collection, setCollection] = useState<Collection>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [refetchApi, setRefetchApi] = useState<boolean>(false);

	// useEffect
	useEffect((): any => {
		// if (!itemId || !userAddress || !chainId) return;
		if (!collectionId) return;
		let mounted = true;

		(async () => {
			setIsLoading(true);

			try {
				const res: Collection = await collectionApi.getCollectionById(collectionId);

				if (mounted) {
					setCollection(res);
					setIsSuccess(true);
				}
			} catch (error) {
				setIsLoading(false);
				setIsSuccess(false);
				console.log(error);
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		})();

		return () => (mounted = false);
	}, [collectionId, refetchApi]);

	// functions
	const handleOnClickCollectionOwner = (e: any, collectionOwner: string) => {
		e.stopPropagation();
		navigate(`/info-account/${collectionOwner}`);
	};

	const ErrorMediaRender = () => {
		return (
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'grey',
					opacity: '0.2',
				}}
			></Box>
		);
	};

	return (
		<Box>
			{!isLoading ? (
				!isSuccess ? (
					<Stack
						justifyContent="center"
						alignItems="center"
						sx={{
							position: 'relative',
							width: '100%',
							height: '321px',

							[theme.breakpoints.down('md')]: {
								height: '311px',
							},
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								zIndex: '0',
								backgroundColor: 'gray',
								opacity: '0.2',
								borderRadius: '15px',
							}}
						></Box>
						<Typography variant="h6">Error</Typography>
						<Typography variant="body2" sx={{ px: 5, pb: 1, textAlign: 'center' }}>
							Something went wrong when load this collection. Please refresh.
						</Typography>

						<IconButton
							aria-label="refresh"
							onClick={(e) => {
								e.stopPropagation();
								setRefetchApi(!refetchApi);
							}}
						>
							<RefreshIcon />
						</IconButton>
					</Stack>
				) : collection ? (
					<Fragment>
						<CollectionCardWrapper
							onClick={() => {
								navigate(`/collections/view/${collection.collectionId}`);
							}}
						>
							<CollectionBackground>
								<LazyImageCustom
									src={
										collection.background
											? compressImage(collection.background, 500, 'best')
											: '/baner3.png'
									}
									alt="collection background"
									type="skeleton"
									wrapperPosition="relative"
									errorComponent={ErrorMediaRender()}
								/>
							</CollectionBackground>

							<BottomPart>
								<CollectionLogoWrapper>
									<CollectionLogo
										sx={{ width: '100px', height: '100px' }}
										src={
											collection.logo &&
											compressImage(collection.logo, 150, 'best')
										}
										alt={collection.collectionName}
									/>
								</CollectionLogoWrapper>

								<CollectionInfo>
									<CollectionName variant="h5">
										{collection.collectionName}
									</CollectionName>

									<CollectionOwner>
										<Typography variant="subtitle1">By </Typography>
										{collection.userAddress && (
											<OwnerName
												variant="subtitle1"
												onClick={(e: any) => {
													handleOnClickCollectionOwner(
														e,
														collection.userAddress
													);
												}}
											>
												{collection.ownerInfo?.username.toLowerCase() ===
												'unknown name'
													? sliceAddress(collection.userAddress, 6, 5)
													: collection.ownerInfo?.username}
											</OwnerName>
										)}
									</CollectionOwner>

									<CollectionNumberItem variant="subtitle2" noWrap>
										{collection.description}
									</CollectionNumberItem>
								</CollectionInfo>
							</BottomPart>
						</CollectionCardWrapper>
					</Fragment>
				) : (
					<></>
				)
			) : (
				<SkeletonCollectionCard />
			)}
		</Box>
	);
}
