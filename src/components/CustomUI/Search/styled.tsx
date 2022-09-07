import { styled, Stack, Box } from '@mui/material';

export const InputWrapper = styled(Stack)(({ theme }) => ({
	border: '1px solid #0768ff',
	borderRadius: 10,
	padding: 13,
}));

export const IconSearch = styled(Box)(({ theme }) => ({
	width: 30,
	borderRight: '1px solid #0768ff',
	marginRight: 10,
	paddingRight: 10,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'& img': {
		display: 'block',
		width: '100%',
	},
}));

export const InputSearch = styled('input')(({ theme }) => ({
	display: 'block',
	width: '100%',
	outline: 'none',
	border: 'none',
	background: 'transparent',
	color: 'white',
	fontSize: 16,
	'&::placeholder': {
		color: theme.palette.mode === 'light' ? 'black' : 'white',
		fontSize: 12,
		fontWeight: 'normal',
		opacity: 0.4,
	},
}));
