import { styled, ButtonGroup } from '@mui/material';

export const ButtonGroupStyle = styled(ButtonGroup)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	right: 0,

	'.MuiButton-root': {
		padding: '8px 0',
		color: 'white',
		border: `1px solid ${theme.palette.mode === 'light' ? '#000' : '#fff'}`,
		'&:hover': {
			border: `1px solid ${theme.palette.mode === 'light' ? '#000' : '#fff'}`,
			backgroundColor: 'transparent',
		},
	},
}));
