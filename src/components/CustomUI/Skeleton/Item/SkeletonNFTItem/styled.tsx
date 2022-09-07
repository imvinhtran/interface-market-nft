import { styled, Box, Skeleton } from '@mui/material';

export const CardWrapper = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadiusMd,
	overflow: 'hidden',
	position: 'relative',
	padding: 10,

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
				background: theme.palette.primaryLight.lighter,
		  }
		: {
				border: '2px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
		  }),
}));

export const SkeletonImage = styled(Skeleton)({
	top: 0,
	borderRadius: '16px',
	height: 0,
	paddingBottom: '100%',
});
