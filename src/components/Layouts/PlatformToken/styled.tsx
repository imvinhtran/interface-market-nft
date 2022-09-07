import { Stack, styled } from '@mui/material';

export const PlatFormCoin = styled(Stack)(({ theme }) => ({
	position: 'relative',
	borderRadius: '12px',
	padding: '6px 10px',
	overflow: 'hidden',

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: -1,

		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.main,
			  }
			: {
					backgroundColor: theme.palette.primary.main,
			  }),
	},
}));
