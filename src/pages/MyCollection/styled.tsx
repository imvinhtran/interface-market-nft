import { Box, styled } from '@mui/material';

export const ButtonImport = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	transition: 'all 0.4s',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: { backgroundColor: theme.palette.primary.main }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.dark,
			  }
			: { backgroundColor: theme.palette.primary.light }),
	},
}));
