import React from 'react';
// components
import SkeletonOfferInInfoAccountCard from '../../Item/SkeletonOfferInInfoAccountCard';
// mui
import { Box } from '@mui/material';

type SkeletonOfferInInfoAccountListProps = {
	amount?: number;
};

export default function SkeletonOfferInInfoAccountList({
	amount,
}: SkeletonOfferInInfoAccountListProps) {
	return (
		<>
			{new Array(amount ? amount : 3).fill(null).map((item, idx) => {
				return (
					<Box key={idx} sx={{ mb: 1 }}>
						<SkeletonOfferInInfoAccountCard />
					</Box>
				);
			})}
		</>
	);
}
