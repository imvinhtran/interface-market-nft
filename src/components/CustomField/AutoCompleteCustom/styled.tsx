import { styled, Stack, Box } from '@mui/material';

export const SelectOptionBox = styled(Stack)(({ theme }) => ({
	cursor: 'pointer',
	position: 'relative',
	borderRadius: '12px',
	padding: '15px 0 15px 15px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));

export const CurrentValue = styled(Stack)(({ theme }) => ({}));

export const IconArrowDown = styled(Box)(({ theme }) => ({
	transition: 'all 0.3s',
	'&.active': {
		transform: 'rotate(180deg)',
	},
}));

export const DropDownContent = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '110%',
	left: 0,
	width: '100%',
	maxHeight: 300,
	borderRadius: 10,
	zIndex: 100,
	overflow: 'auto',
	display: 'block !important',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
				border: '1px solid',
				borderColor: theme.palette.primary.main,
		  }),

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '3px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},
}));

export const ListOption = styled('ul')(({ theme }) => ({}));

export const OptionItem = styled('li')(({ theme }) => ({
	cursor: 'pointer',
	padding: 10,

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.main,
			  }
			: {
					backgroundColor: theme.palette.primary.darker,
			  }),
	},

	'&::after': {
		content: '""',
		width: '100%',
		height: '0.9px',
		backgroundImage: theme.palette.gradients.line,
	},
	'&:last-child': {
		'&::after': {
			display: 'none',
		},
	},
}));

export const InputStyle = styled('input')(({ theme }) => ({
	border: 'none',
	outline: 'none',
	background: 'transparent',
	width: '100%',
	fontSize: 16,
	color: theme.palette.text.primary,

	'&::placeholder': {
		color: theme.palette.text.primary,
		fontSize: 15,
		fontWeight: 500,
		opacity: 0.4,
	},
}));
