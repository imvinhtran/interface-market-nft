import React from 'react';
// components
import SkeletonGlobalSearchResultCard from '../../Item/SkeletonGlobalSearchResultCard';
// mui
import { Box } from '@mui/material';
// styled
import { Divider } from 'components/Layouts/GlobalSearch/Common/styled';

type SkeletonGlobalResultListProps = {
	amount?: number;
};

export default function SkeletonGlobalResultList({ amount }: SkeletonGlobalResultListProps) {
	return (
		<>
			{new Array(amount ? amount : 3).fill(null).map((item, idx) => {
				return (
					<Box key={idx}>
						<Divider />
						<SkeletonGlobalSearchResultCard />
					</Box>
				);
			})}
		</>
	);
}
