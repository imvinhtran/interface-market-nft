import { Box, styled } from '@mui/material';

export const ResultItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',
	padding: '8px 0 8px 8px',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.dark,
			  }
			: {
					backgroundColor: theme.palette.primary.main,
			  }),
	},
}));
