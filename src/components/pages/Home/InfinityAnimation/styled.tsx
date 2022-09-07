import { Box, Stack, styled } from '@mui/material';

export const AstronautContainer = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	minHeight: '50vh',
	// height: '100%',

	img: {
		height: '100%',
		width: '100%',
		display: 'block',
	},

	'@keyframes roll': {
		'25%': {
			top: '10%',
		},
		'75%': {
			top: '5%',
		},
	},
}));

export const AstronautImg = styled(Box)({
	position: 'absolute',
	width: '25%',
	overflow: 'hidden',
	top: '6%',
	left: '28%',
	zIndex: 10,
	animation: 'roll 10s linear infinite',
});

export const InfinityImg = styled(Box)(({ theme }) => ({
	width: '80%',

	[theme.breakpoints.down('md')]: {
		width: '90%',
	},
}));

export const AstronautTxt = styled(Box)(({ theme }) => ({
	width: '70%',
	marginTop: 20,

	[theme.breakpoints.down('md')]: {
		width: '90%',
	},
}));
