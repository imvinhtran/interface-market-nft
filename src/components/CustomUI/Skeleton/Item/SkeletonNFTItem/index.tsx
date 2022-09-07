/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Skeleton, Box } from '@mui/material';
// styled
import { CardWrapper, SkeletonImage } from './styled';

export interface ISkeletonNFTItemCardProps {}

export default function SkeletonNFTItemCard(props: ISkeletonNFTItemCardProps) {
	return (
		<CardWrapper>
			<Box sx={{ width: '100%', position: 'relative' }}>
				<SkeletonImage width="100%" variant="rectangular" />

				<Skeleton sx={{ mt: 1, height: '22px' }} />
				<Skeleton sx={{ mt: 1, height: '22px' }} />

				<Skeleton height="65px" width="100%" sx={{ borderRadius: '14px' }} />
			</Box>
		</CardWrapper>
	);
}
