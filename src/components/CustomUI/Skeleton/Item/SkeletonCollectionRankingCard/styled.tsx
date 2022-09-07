import { styled, Box } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: '8px',
	padding: 10,
	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					boxShadow: theme.customShadows.cardLightHover,
			  }
			: {
					boxShadow: theme.customShadows.cardDarkHover,
			  }),
	},

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
				background: theme.palette.primaryLight.lighter,
		  }
		: {
				// backgroundColor: theme.palette.primary.dark,
				backgroundImage: theme.palette.gradients.third,
		  }),
}));
