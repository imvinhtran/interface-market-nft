import { Stack, styled } from '@mui/material';

export const SkeletonCollectionCardContainer = styled(Stack)(({ theme }) => ({
	width: '100%',
	borderRadius: '15px',
	overflow: 'hidden',
	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
				background: theme.palette.primaryLight.lighter,
		  }
		: {
				background: theme.palette.gradients.fourth,
		  }),
}));
