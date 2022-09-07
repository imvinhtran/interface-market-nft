import { Box, styled, Card } from '@mui/material';

export const OverviewItem = styled(Card)(({ theme }) => ({
	position: 'relative',
	borderRadius: '16px',
	backgroundColor: 'transparent',
	width: '100%',
	height: 200,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	gap: 10,

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				boxShadow: theme.customShadows.cardDark,
		  }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					boxShadow: theme.customShadows.cardLightHover,
			  }
			: {
					boxShadow: theme.customShadows.cardDarkHover,
			  }),
	},

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		// opacity: 0.2,
		zIndex: -1,

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.main,
			  }
			: {
					backgroundImage: theme.palette.gradients.third,
			  }),
	},
}));

export const OverviewImage = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: '-10%',
	right: '-10%',
	width: '40%',
	height: '100%',
	zIndex: -1,
	opacity: 0.2,

	img: {
		width: '100%',
		height: '100%',
	},
}));
