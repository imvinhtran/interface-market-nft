import { Box, styled } from '@mui/material';

export const SaleSetupContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	padding: '1rem 2rem',
	borderRadius: theme.shape.borderRadiusLg,

	...(theme.palette.mode === 'light'
		? { boxShadow: theme.customShadows.cardLightHover }
		: {
				border: '2px solid',
				borderColor: theme.palette.primary.main,
				backgroundColor: theme.palette.primary.darker,
		  }),

	[theme.breakpoints.down(600)]: {
		padding: '1rem',
	},
}));
