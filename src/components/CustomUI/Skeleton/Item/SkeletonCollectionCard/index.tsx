import { Skeleton, useTheme } from '@mui/material';
import * as React from 'react';
import { SkeletonCollectionCardContainer } from './styled';

export interface ISkeletonCollectionCardProps {}

export default function SkeletonCollectionCard(props: ISkeletonCollectionCardProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	return (
		<SkeletonCollectionCardContainer alignItems="center" direction="column">
			<Skeleton variant="rectangular" width="100%" height={150} />
			<Skeleton
				variant="circular"
				width={100}
				height={100}
				sx={{
					marginTop: '-50px',
					boxShadow: `0px 0px 10px 20px ${theme.palette.grey['600']}`,
					bgcolor: isLightTheme ? 'grey.100' : '#1A3049',
				}}
			/>
			<Skeleton height={40} width="60%" sx={{ mt: 1 }} />
			<Skeleton width="50%" />
			<Skeleton width="40%" sx={{ mt: 2, mb: 2 }} />
		</SkeletonCollectionCardContainer>
	);
}
