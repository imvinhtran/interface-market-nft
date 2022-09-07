/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
//models
import { CollectionCategory, CollectionId } from 'models';
//components
import CollectionCard from 'components/CustomUI/Card/CollectionCard';
import CustomSlider from 'components/CustomUI/CustomSlider';
import TextGradient from 'components/CustomUI/TextGradient';
//constants
import { CATEGORY_COLLECTION } from 'constants/common.constant';
//mui
import { Box, Skeleton, Typography } from '@mui/material';
//styled
import { CategoryHeader } from './styled';
//redux
import {
	selectCollectionCategory,
	selectLoading,
	selectIsSuccess,
	setRefresh,
} from 'redux/slices/collectionCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCollectionCard from 'components/CustomUI/Skeleton/Item/SkeletonCollectionCard';
import { dispatch } from 'redux/store';
import ErrorBoundary from 'components/CustomUI/ErrorBoundary';

const CategoryCollection = () => {
	const dispatch = useDispatch();
	const listCollectionCategory = useSelector(selectCollectionCategory);
	const isLoading = useSelector(selectLoading);
	const isSuccess = useSelector(selectIsSuccess);

	const renderListCollection = (listCollectionId: CollectionId[]) => {
		if (listCollectionId.length > 0) {
			return listCollectionId.map((item: any, index: number) => (
				<CollectionCard key={index} collectionId={item._id} />
			));
		}
	};

	const renderListSkeleton = () => {
		return new Array(6).fill(null).map((item, idx) => {
			return <SkeletonCollectionCard key={idx} />;
		});
	};

	const renderCategoryName = (category: number) => {
		return CATEGORY_COLLECTION[category];
	};

	const handleRefresh = () => {
		dispatch(setRefresh());
	};

	return (
		<Fragment>
			{!isLoading ? (
				!isSuccess ? (
					<ErrorBoundary
						title="Error!!!"
						content="Currently we couldn't load this content. Please refresh"
						callbackFn={handleRefresh}
					/>
				) : (
					listCollectionCategory.length > 0 &&
					listCollectionCategory.map((item: CollectionCategory, index: number) => (
						<Box id={renderCategoryName(item.key)} key={index} sx={{ mb: 5 }}>
							<CategoryHeader>
								<Typography variant="h3" sx={{ fontWeight: '400' }}>
									{renderCategoryName(item.key)}
								</Typography>
							</CategoryHeader>

							<Box sx={{ mt: 2 }}>
								<CustomSlider
									delay={20000}
									slidesPerView={3}
									loop={true}
									spaceBetween={30}
									slidesPerGroup={1}
									centeredSlides={true}
									slidesToShowPoint1358={3}
									slidesToShowPoint1093={2.5}
									slidesToShowPoint828={2}
									slidesToShowPoint547={1.5}
									slidesToShowPoint320={1}
									slidesToShowPoint0={1}
									renderItem={renderListCollection(item.data)}
								/>
							</Box>
						</Box>
					))
				)
			) : (
				new Array(3).fill(null).map((item: any, index: number) => (
					<Fragment key={index}>
						<Box sx={{ mt: 2 }}>
							<CustomSlider
								delay={20000}
								slidesPerView={3}
								loop={true}
								spaceBetween={30}
								slidesPerGroup={1}
								centeredSlides={true}
								slidesToShowPoint1358={3}
								slidesToShowPoint1093={2.5}
								slidesToShowPoint828={2}
								slidesToShowPoint547={1.5}
								slidesToShowPoint320={1}
								slidesToShowPoint0={1}
								renderItem={renderListSkeleton()}
							/>
						</Box>
					</Fragment>
				))
			)}
		</Fragment>
	);
};

export default React.memo(CategoryCollection);
