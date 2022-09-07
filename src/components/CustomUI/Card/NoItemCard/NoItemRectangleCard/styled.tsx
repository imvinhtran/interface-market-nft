import { styled, Box, Stack, Typography, keyframes } from '@mui/material';

export const NoItemWrapper = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: '100%',

	span: {
		'&:nth-of-type(1)': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: 2,
			animation: `${animateNoItem1} 2s linear infinite`,
		},
		'&:nth-of-type(2)': {
			position: 'absolute',
			top: 0,
			right: 0,
			width: 2,
			height: '100%',
			animation: `${animateNoItem2} 2s linear infinite`,
		},
		' &:nth-of-type(3)': {
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
			height: 2,
			animation: `${animateNoItem3} 2s linear infinite`,
		},
		'&:nth-of-type(4)': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: 2,
			height: '100%',
			animation: `${animateNoItem4} 2s linear infinite`,
		},
	},

	...(theme.palette.mode === 'dark'
		? {
				'span:nth-of-type(1)': {
					background: 'linear-gradient(to right, #0c002b, #1779ff)',
				},
				'span:nth-of-type(2)': {
					background: 'linear-gradient(to bottom, #0c002b, #1779ff)',
				},
				'span:nth-of-type(3)': {
					background: 'linear-gradient(to left, #0c002b, #1779ff)',
				},
				'span:nth-of-type(4)': {
					background: 'linear-gradient(to top, #0c002b, #1779ff)',
				},
		  }
		: {
				'span:nth-of-type(1)': {
					background: 'linear-gradient(to right, #e9f5ff, #7ecdff)',
				},
				'span:nth-of-type(2)': {
					background: 'linear-gradient(to bottom, #e9f5ff, #7ecdff)',
				},
				'span:nth-of-type(3)': {
					background: 'linear-gradient(to left, #e9f5ff, #7ecdff)',
				},
				'span:nth-of-type(4)': {
					background: 'linear-gradient(to top, #e9f5ff, #7ecdff)',
				},
		  }),
}));

export const NoItemCard = styled(Stack)(({ theme }) => ({
	width: 220,
	padding: 30,
	alignItems: 'center',
	position: 'relative',
	overflow: 'hidden',

	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(255, 255, 255, 0.05)',
	},
}));

export const AnimationLine = styled('span')(({ theme }) => ({}));

export const CardImage = styled(Box)(({ theme }) => ({
	width: 60,
}));

export const CardText = styled(Typography)(({ theme }) => ({
	marginTop: 12,
}));

const animateNoItem1 = keyframes`
0% {
    transform: translateX(-100%);
}
100% {
    transform: translateX(100%);
}
`;

const animateNoItem2 = keyframes`
0% {
    transform: translateY(-100%);
}
100% {
    transform: translateY(100%);
}
`;

const animateNoItem3 = keyframes`
0% {
    transform: translateX(100%);
}
100% {
    transform: translateX(-100%);
}
`;

const animateNoItem4 = keyframes`
0% {
    transform: translateY(100%);
}
100% {
    transform: translateY(-100%);
}
`;
