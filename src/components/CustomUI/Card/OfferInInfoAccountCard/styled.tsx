import { Box, styled } from '@mui/material';

export const OfferCard = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '12px',
	borderBottom: '1px solid',
	borderRadius: '12px',
	cursor: 'pointer',

	[theme.breakpoints.down(480)]: {
		display: 'block',
	},

	'&:hover': {
		...(theme.palette.mode === 'light'
			? { backgroundColor: theme.palette.primaryLight.main }
			: {
					backgroundColor: theme.palette.primary.main,
			  }),
	},
}));
