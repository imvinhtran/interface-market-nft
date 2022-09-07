import { styled, Box } from '@mui/material';

export const AdvertiseSectionWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '16px',
	overflow: 'hidden',
	[theme.breakpoints.between(600, 1200)]: {
		padding: '0 8%',
	},
}));

export const SliderItem = styled(Box)(({ theme }) => ({
	top: 0,
	width: '100%',
	height: '100%',
	position: 'absolute',
	objectFit: 'contain',
	// border: '3px solid',
	// borderColor: theme.palette.primary.light,
	borderRadius: '16px',
	overflow: 'hidden',
}));
