import { styled, Button } from '@mui/material';

export const ButtonStyled = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	cursor: 'pointer',
	borderRadius: '12px',
	outline: 'none',
	color: 'white',
	backgroundImage: theme.palette.gradients.main,
	border: 'none',
	transition: '0.5s all',
	fontWeight: 100,

	'&:focus': {
		outline: 'none',
	},
	'&:hover': {
		transition: '0.5s all',
		backgroundSize: '200%',
		backgroundPosition: 'right center',
		boxShadow: 'none',
	},

	'&:disabled': {
		backgroundImage: 'unset',
		background: theme.palette.action.disabled,
		color: 'black',
	},
}));
