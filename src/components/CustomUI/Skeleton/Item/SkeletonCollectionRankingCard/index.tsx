import * as React from 'react';
import { Skeleton, Box, Stack } from '@mui/material';
import { Wrapper } from './styled';

export interface ISkeletonCollectionRankingCardProps {}

export default function SkeletonCollectionRankingCard(props: ISkeletonCollectionRankingCardProps) {
	return (
		<Wrapper>
			<Stack direction="row" alignItems="center">
				<Skeleton variant="text" sx={{ width: '12px', ml: 1 }} />
				<Skeleton variant="circular" width={50} height={50} sx={{ ml: 2.5 }} />
				<Box sx={{ ml: 2, flexGrow: 1 }}>
					<Skeleton variant="text" />
					<Skeleton variant="text" />
				</Box>
			</Stack>
		</Wrapper>
	);
}
