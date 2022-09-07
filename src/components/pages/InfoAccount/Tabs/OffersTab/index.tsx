/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// models
import { OptionSelectCustom, OrderResponseAPI } from 'models';
// redux
import { useSelector } from 'react-redux';
import { selectListOrderOffer, selectLoading } from 'redux/slices/orderSlice';

// components
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';

import SelectCustom from 'components/CustomField/SelectCustom';
// mui
import { Box, useTheme } from '@mui/material';
// styled
import { OfferList } from './styled';

// images
import ImageNoOffer from 'assets/icons/no-offers.webp';
import OfferInInfoAccountCard from 'components/CustomUI/Card/OfferInInfoAccountCard';
import SkeletonOfferInInfoAccountList from 'components/CustomUI/Skeleton/List/SkeletonOfferInInfoAccountList';

interface OffersTabProps {
	currentFilterOfferOption: OptionSelectCustom;
	setCurrentFilterFilterOfferOption: Function;
	listFilterOfferOption: OptionSelectCustom[];
}

function OffersTab({
	currentFilterOfferOption,
	setCurrentFilterFilterOfferOption,
	listFilterOfferOption,
}: OffersTabProps) {
	const theme = useTheme();

	// useSelector
	const listOrderOffer: OrderResponseAPI[] = useSelector(selectListOrderOffer);
	const isLoading = useSelector(selectLoading);

	// vars
	const isLightTheme = theme.palette.mode === 'light';

	// functions
	const handleChangeFilterOption = (currentOption: OptionSelectCustom) => {
		setCurrentFilterFilterOfferOption(currentOption);
	};

	return (
		<>
			<Box sx={{ width: '200px', ml: 'auto' }}>
				<SelectCustom
					currentItem={currentFilterOfferOption}
					listItem={listFilterOfferOption}
					onChange={handleChangeFilterOption}
					sx={{
						border: 'none',
						...(isLightTheme
							? {
									backgroundColor: theme.palette.primaryLight.main,
							  }
							: {
									backgroundColor: theme.palette.primary.dark,
							  }),
					}}
				/>
			</Box>

			<Box sx={{ marginTop: '1rem', paddingBottom: '1rem' }}>
				{!isLoading ? (
					<OfferList>
						{listOrderOffer && listOrderOffer.length > 0 ? (
							listOrderOffer.map((item: any, index: number) => (
								<Box sx={{ mb: 1 }} key={index}>
									<OfferInInfoAccountCard orderId={item._id} />
								</Box>
							))
						) : (
							<Box sx={{ mt: 2 }}>
								<NoItemCircleCard title="No offer yet!" image={ImageNoOffer} />
							</Box>
						)}
					</OfferList>
				) : (
					<SkeletonOfferInInfoAccountList />
				)}
			</Box>
		</>
	);
}
export default OffersTab;
