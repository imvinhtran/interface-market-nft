import { Box, styled } from '@mui/material';

export const GalleryContainer = styled(Box)({
	zIndex: 3,
	width: '100%',
	position: 'relative',
	paddingTop: '0.5rem',
});

export const MarqueeItem = styled(Box)({
	height: 300,
	borderRadius: '10px',
	position: 'relative',
	margin: '10px',
	overflow: 'hidden',
	cursor: 'pointer',
	transition: 'all 0.5s ease',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},

	'&:hover': {
		'&::before': {
			transition: 'all 0.5s ease',
			position: 'absolute',
			backgroundColor: 'rgba(0,0,0,0.6)',
			top: 0,
			left: 0,
			content: '""',
			width: '100%',
			height: '100%',
			opacity: 0.6,
		},
	},
});

export const MarqueeItemPrimary = styled(MarqueeItem)({
	width: 300,
	'@media screen and (max-width: 1068px)': {
		width: 180,
		height: 180,
	},
});

export const MarqueeItemSecondary = styled(MarqueeItem)({
	width: 500,
	'@media screen and (max-width: 1068px)': {
		width: 210,
		height: 118,
	},
});

export const ViewButton = styled(Box)(({ theme }) => ({
	// display: 'none',
	borderRadius: '16px',
	backgroundColor: 'white',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
}));
