/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
//mui
import { Grid } from '@mui/material';
// components
import SkeletonCollectionRankingList from 'components/CustomUI/Skeleton/List/SkeletonCollectionRankingList';
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import CollectionRankingCard from 'components/CustomUI/Card/CollectionRankingCard';
import ErrorBoundary from 'components/CustomUI/ErrorBoundary';
// models
import { Collection } from 'models';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

interface CommonListCollectionProps {
	listCollection: Collection[];
	isLoading: boolean;
	filter: string;
	isSuccess: boolean;
	setRefresh: Function;
}

function CommonListCollection({
	listCollection,
	isLoading,
	filter,
	isSuccess,
	setRefresh,
}: CommonListCollectionProps) {
	const renderCommonListCollection = () => {
		if (!listCollection || listCollection.length <= 0)
			return <NoItemCircleCard title="No data yet!" image={ImageNoOffer} />;

		return listCollection.map((item: any, index: number) => {
			return (
				<Grid item xs={1} key={index}>
					<CollectionRankingCard collection={item} rank={index} filter={filter} />
				</Grid>
			);
		});
	};

	return (
		<Grid container spacing={1} columns={{ xs: 1, sm: 2, md: 3, lg: 5 }} sx={{ mt: 2 }}>
			{isLoading ? (
				<SkeletonCollectionRankingList />
			) : isSuccess ? (
				renderCommonListCollection()
			) : (
				<ErrorBoundary
					title="Error!!!"
					content="Currently we couldn't load this content. Please refresh"
					callbackFn={setRefresh}
				/>
			)}
		</Grid>
	);
}

export default CommonListCollection;
