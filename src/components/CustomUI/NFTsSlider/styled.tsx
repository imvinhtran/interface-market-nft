import { styled, Box } from '@mui/material';

export const SlideButtonWrapper = styled(Box)(({ theme }) => ({
	display: 'block',

	'&.slick-next, &.slick-prev': {
		width: 35,
		height: 35,
		borderRadius: '50%',
		zIndex: 100,

		...(theme.palette.mode === 'light'
			? {
					background: 'rgb(224 246 255)',
			  }
			: {
					background: '#183657',
			  }),

		'&::before': {
			display: 'none',
		},

		'&:hover': {
			backgroundColor: '#80bdff !important',
			transition: '0.5s all',
			border: '1px solid #032142',
		},
	},
}));

export const SlideButtonStyle = styled('div')({
	width: '15%',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	transition: '0.5s all',
	img: {
		width: '100%',
	},
});
