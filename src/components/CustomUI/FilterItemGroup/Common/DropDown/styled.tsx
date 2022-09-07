import { styled, Stack, Box } from '@mui/material';

export const DropDownWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
}));

export const DropDownOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	display: 'none',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	// backgroundColor: 'black',
	zIndex: 1,

	'&.active': {
		display: 'block',
	},
}));

export const ButtonContent = styled(Box)(({ theme }) => ({}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	display: 'none',
	top: '110%',
	left: 0,
	zIndex: 10,

	'&.active': {
		display: 'block',
	},
}));
