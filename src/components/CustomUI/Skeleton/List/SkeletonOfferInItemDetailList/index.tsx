import React from 'react';
// components
import SkeletonOfferInItemDetailCard from '../../Item/SkeletonOfferInItemDetailCard';
// mui
import { Box } from '@mui/material';

type SkeletonOfferInItemDetailListProps = {
	amount?: number;
};

export default function SkeletonOfferInItemDetailList({
	amount,
}: SkeletonOfferInItemDetailListProps) {
	return (
		<>
			{new Array(amount ? amount : 3).fill(null).map((item, idx) => {
				return (
					<Box key={idx} sx={{ mb: 1 }}>
						<SkeletonOfferInItemDetailCard />
					</Box>
				);
			})}
		</>
	);
}
