import { Avatar, Box, styled } from '@mui/material';

export const LatestTransactionContainer = styled(Box)(({ theme }) => ({
	marginTop: '3rem',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
}));

export const LatestTransactionWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	width: '50%',
	padding: '10px 20px',
	height: '70px',

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				border: '2px solid',
				borderColor: theme.palette.primary.light,
				backgroundImage: theme.palette.gradients.secondary,
		  }),

	'.mySwiper': {
		width: '100%',
		height: '100%',
	},
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	'@media screen and (max-width: 1234px)': {
		width: '80%',
	},
	'@media screen and (max-width: 512px)': {
		width: '100%',
		padding: '10px',
		p: {
			fontSize: '14px',
		},
	},
}));

export const LatestTransactionBox = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '10px',
	span: {
		fontWeight: 600,
	},
	a: {
		color: theme.palette.text.primary,
		fontWeight: 600,
		cursor: 'pointer',
		'&:hover': {
			borderBottom: '1px solid',
		},
	},
}));

export const UserAvatar = styled(Avatar)({
	width: 40,
	height: 40,
	'@media screen and (max-width: 512px)': {
		width: 25,
		height: 25,
	},
});
