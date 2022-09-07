import { styled, Box, TextField } from '@mui/material';

export const DatePickerWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
}));

export const DatePickerTextField = styled(TextField)(({ theme }) => ({
	display: 'block',
	width: '100%',
	opacity: 0,
	zIndex: 2,

	'& *': {
		display: 'block',
		width: '100%',
	},

	input: {
		// IMPORTANT: the height of all block DatePicker depend on this input, because the height of button choose date is follow this input
		// height: 100,
	},

	// this button is in the TextField, and the TextField have position:relative; by default
	button: {
		background: 'red',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		borderRadius: 'unset',
		zIndex: 5,
	},
}));

export const DatePickerVisiblePart = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	borderRadius: 10,
	opacity: 1,
	padding: '10px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));
