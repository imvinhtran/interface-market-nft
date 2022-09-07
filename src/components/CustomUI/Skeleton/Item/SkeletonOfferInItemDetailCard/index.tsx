import * as React from 'react';
import { Box, Skeleton, Stack, useTheme } from '@mui/material';

export interface ISkeletonOfferInItemDetailCardProps {}

export default function SkeletonOfferInItemDetailCard(props: ISkeletonOfferInItemDetailCardProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	return (
		<Stack
			direction="row"
			alignItems="center"
			spacing={1}
			sx={{
				p: 1,
				borderBottom: '1px solid',
				borderColor: isLightTheme ? theme.palette.grey['300'] : theme.palette.grey['700'],
				borderRadius: '15px',
				backgroundColor: isLightTheme ? theme.palette.primaryLight.lighter : 'unset',
			}}
		>
			<Skeleton variant="circular" width={50} height={50} sx={{ flexShrink: 0 }} />
			<Box>
				<Skeleton sx={{ width: '250px' }} />
				<Skeleton sx={{ width: '150px' }} />
			</Box>
		</Stack>
	);
}
