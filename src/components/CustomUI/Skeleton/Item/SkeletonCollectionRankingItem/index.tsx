import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const SkeletonCollectionRankingItem = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				width: '100%',
			}}
		>
			<Skeleton variant="rectangular" sx={{ width: '20px' }} />
			<Skeleton variant="rectangular" sx={{ width: 60, height: 60, borderRadius: '12px' }} />
			<Stack direction="column" justifyContent="space-between" sx={{ height: 60 }}>
				<Skeleton sx={{ width: 200, height: 20 }} />
				<Box>
					<Skeleton sx={{ width: 100, height: 15 }} />
					<Skeleton sx={{ width: 100, height: 15 }} />
				</Box>
			</Stack>
		</Box>
	);
};

export default SkeletonCollectionRankingItem;
