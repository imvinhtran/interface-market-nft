import * as React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export interface ISkeletonGlobalSearchResultCardProps {}

export default function SkeletonGlobalSearchResultCard(
	props: ISkeletonGlobalSearchResultCardProps
) {
	return (
		<Stack direction="row" alignItems="center" spacing={1} sx={{ padding: '5px 0px 5px 10px' }}>
			<Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
			<Box>
				<Skeleton sx={{ width: '100px' }} />
				<Skeleton sx={{ width: '80px' }} />
			</Box>
		</Stack>
	);
}
