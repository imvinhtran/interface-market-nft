import { Box, styled } from '@mui/material';

export const SelectAndInputWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: 8,
	borderRadius: '16px',
	padding: '11px 10px',
	width: '100%',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));
