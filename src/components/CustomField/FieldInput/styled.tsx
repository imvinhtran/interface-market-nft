import { styled } from '@mui/material';

export const Input = styled('input')(({ theme }) => ({
	display: 'block',
	border: 'none',
	borderRadius: '12px',
	padding: '15px',
	outline: 'none',
	width: '100%',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '16px',
	color: theme.palette.text.primary,

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.main,
		  }
		: {
				background: theme.palette.primary.dark,
		  }),

	'&::placeholder': {
		color: theme.palette.mode === 'light' ? '#000' : '#fff',
		fontSize: '16px',
		fontWeight: 500,
		opacity: 0.4,
	},
}));
