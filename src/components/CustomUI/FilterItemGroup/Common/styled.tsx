import { styled, Stack, Box, Typography, Button } from '@mui/material';

export const ButtonWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	borderRadius: 12,
	padding: '10px 20px',
	cursor: 'pointer',
	transition: '0.1s all',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),

	'&:hover': {
		transform: 'scale(0.95)',
	},
}));

export const ButtonBadge = styled(Typography)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 15,
	transform: 'translateY(-50%)',
	fontSize: 12,
	borderRadius: 5,
	paddingLeft: 2,
	paddingRight: 2,

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundColor: theme.palette.primaryLight.light,
	// 	  }
	// 	: {
	// 			backgroundColor: theme.palette.primary.main,
	// 	  }),
}));

export const ButtonStyled = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'center',
}));

export const IconStyled = styled(Box)(({ theme }) => ({
	marginRight: 10,

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover !important',
	},
}));

export const ButtonTitle = styled(Typography)(({ theme }) => ({
	maxWidth: 180,
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
}));

export const DropdownWrapper = styled(Box)(({ theme }) => ({
	border: `1px solid ${theme.palette.primary.main}`,
	borderRadius: 20,
	padding: '10px 20px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.light,
		  }
		: {
				backgroundImage: 'linear-gradient(to left, #00284b 0%, #020a1a 100%)',
		  }),
}));

export const ListOption = styled('ul')(({ theme }) => ({
	overflowY: 'auto',
	maxHeight: 300,

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

export const OptionItem = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',
	padding: '10px 0',
	borderRadius: 10,
	cursor: 'pointer',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.main,
			  }
			: {
					background: theme.palette.primary.main,
			  }),
	},
}));

export const OptionItemImage = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: 10,
	transform: 'translateY(-50%)',
	borderRadius: '50%',
	overflow: 'hidden',

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
}));

export const OptionItemText = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
}));

export const CheckIconWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	right: 10,
	transform: 'translateY(-50%)',
	width: 20,
	height: 20,
}));

export const DropdownButtonGroup = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	alignItems: 'center',
	width: '100%',
	marginTop: 10,
}));

const ButtonGroupItemStyled = styled(Button)(({ theme }) => ({
	flexGrow: 1,
	borderRadius: 10,
	padding: '8px 20px',
	textAlign: 'center',
	cursor: 'pointer',
}));

export const ButtonClear = styled(ButtonGroupItemStyled)(({ theme }) => ({
	marginRight: 10,
	color: theme.palette.text.primary,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: theme.palette.primaryLight.dark,
			  }
			: {
					backgroundColor: theme.palette.primary.light,
			  }),
	},
}));

export const ButtonApply = styled(ButtonGroupItemStyled)(({ theme }) => ({
	backgroundImage: theme.palette.gradients.main,
	color: theme.palette.text.primary,

	'&:hover': {
		transition: '0.5s all',
		backgroundSize: '200%',
		backgroundPosition: 'right center',
		boxShadow: 'none',
	},
}));
