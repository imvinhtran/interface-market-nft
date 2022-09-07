import { styled } from '@mui/material';

export const TextArea = styled('textarea')(({ theme }) => ({
	display: 'block',
	border: '1px solid #0768ff',
	outline: 'none',
	background: 'transparent',
	width: '100%',
	borderRadius: 5,
	padding: '5px',
	color: 'white',
	fontSize: 14,
	'&::placeholder': {
		color: theme.palette.mode === 'light' ? 'black' : 'white',
		fontSize: 12,
		fontWeight: 'normal',
		opacity: 0.4,
	},
}));
