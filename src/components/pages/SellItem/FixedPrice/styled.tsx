import { Box, styled } from '@mui/material';

export const SelectAndInputWraper = styled(Box)(({ theme }) => ({
	borderRadius: '16px',
	padding: '11px 10px',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));
