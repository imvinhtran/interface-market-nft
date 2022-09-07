import { Box, styled, Typography } from '@mui/material';

export const GlobalSearchComponent = styled(Box)(({ theme }) => ({
	marginLeft: 'auto',
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
	borderRadius: 10,
}));

export const ResultTitle = styled(Typography)(({ theme }) => ({
	padding: '8px 0 8px 8px',
	fontWeight: 600,
}));
