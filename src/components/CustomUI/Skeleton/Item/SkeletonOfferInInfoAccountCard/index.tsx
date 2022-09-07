import * as React from 'react';
import { Box, Skeleton, Stack, useTheme } from '@mui/material';

export interface ISkeletonOfferInInfoAccountCardProps {}

export default function SkeletonOfferInInfoAccountCard(
	props: ISkeletonOfferInInfoAccountCardProps
) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	return (
		<Stack
			spacing={1}
			sx={{
				p: 1.5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderBottom: '1px solid',
				borderColor: isLightTheme ? theme.palette.grey['300'] : theme.palette.grey['700'],
				borderRadius: '15px',
				[theme.breakpoints.down(480)]: {
					flexDirection: 'column',
					alignItems: 'unset',
				},
			}}
		>
			<Stack direction="row">
				<Skeleton
					variant="rectangular"
					width={50}
					height={50}
					sx={{ flexShrink: 0, mr: 2 }}
				/>

				<Box>
					<Skeleton sx={{ width: '250px' }} />
					<Skeleton sx={{ width: '150px' }} />
				</Box>
			</Stack>

			<Skeleton
				sx={{
					width: '100px',
					marginLeft: 'auto',
					[theme.breakpoints.down(480)]: {
						marginLeft: 'unset',
					},
				}}
			/>
		</Stack>
	);
}
