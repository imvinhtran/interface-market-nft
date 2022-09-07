import { styled, Card, Typography, Box } from '@mui/material';

export const ItemCardStyle = styled(Card)(({ theme }) => ({
	// transition: 'all .3s cubic-bezier(0,0,.5,1)',
	WebkitTransition: '0.2s all ease-out',
	MozTransition: '0.2s all ease-out',
	OTransition: '0.2s all ease-out',
	transition: '0.2s all ease-out',

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				border: '2px solid',
				borderColor: theme.palette.primary.main,
				background: theme.palette.gradients.fourth,
		  }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					boxShadow: theme.customShadows.cardLightHover,
					transform: 'scale(1.01)',
			  }
			: {
					background: theme.palette.gradients.third,
					// transition: 'background 2s ease',
			  }),
	},
}));

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '10px',
	overflow: 'hidden',

	img: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
	},
}));

export const PriceStyle = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.special,
}));

export const PriceChangeStyle = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
}));

export const ImageBlockchain = styled(Box)(({ theme }) => ({
	width: 20,
	height: 20,
	borderRadius: '50%',
	overflow: 'hidden',

	img: {
		width: '100%',
		height: '100%',
	},
}));

export const ItemFooter = styled(Box)(({ theme }) => ({
	borderRadius: theme.shape.borderRadiusSm,
	overflow: 'hidden',
	position: 'relative',
	marginTop: 2,

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		opacity: 0.2,
		zIndex: -1,

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.darker,
			  }
			: {
					backgroundColor: theme.palette.primary.light,
			  }),
	},
}));

export const BoxCountDown = styled(Box)(({ theme }) => ({
	position: 'absolute',
	height: '2.5rem',
	width: '60%',
	zIndex: '2',
	top: 'calc(100% - 2.5rem)',
	left: '0',
	borderRadius: theme.shape.borderRadiusMd,
	padding: '0.5rem',
	border: '1px solid #ffffff',
	backgroundImage:
		'linear-gradient(52deg,rgb(0, 255, 54) 7%,rgb(0, 238, 87) 17%,rgb(0, 197, 173) 37%,rgb(0, 164, 241) 52%,rgb(11, 24, 252) 88%,rgb(13, 0, 255) 94%)',
}));

export const AvatarIcon = styled(Box)(({ theme }) => ({
	transition: 'all 0.6s ease',
	cursor: 'pointer',
	':hover': {
		zIndex: 3,
		transform: 'translateY(-5px)',
	},
}));

export const GradIcon = styled(Box)({
	borderRadius: '50%',
	width: 25,
	height: 25,
});

export const MediaWrapper = styled(Box)({
	video: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
	},
});

export const PlayBtn = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	zIndex: 2,
	borderRadius: '50%',
	width: 32,
	height: 32,

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#D8D8D8',
				'&:hover': {
					backgroundColor: '#BBBBBB',
				},
		  }
		: {
				backgroundColor: 'rgb(53, 56, 64)',
				'&:hover': {
					backgroundColor: '#595B64',
				},
		  }),
}));

export const MediaErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	textAlign: 'center',
});

export const ErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	textAlign: 'center',
});
