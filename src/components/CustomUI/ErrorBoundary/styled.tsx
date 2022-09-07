import { styled } from '@mui/material';

export const ErrorBoundaryContainer = styled('div')(({ theme }) => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 15,
	textAlign: 'center',
}));

export const ErrorBoundaryWrapper = styled('div')(({ theme }) => ({
	maxWidth: 300,
	borderRadius: '10px',
	padding: 10,
	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.dark,
		  }
		: {
				background: theme.palette.primary.main,
		  }),
}));
