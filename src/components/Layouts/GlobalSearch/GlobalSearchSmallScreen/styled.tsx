import { Box, Stack, styled } from '@mui/material';

// --------------------SMALL SCREEN--------------------------------
export const SearchResultsWrapperSS = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '100%',
	left: '50%',
	width: '100%',
	maxHeight: 400,
	overflow: 'auto',
	transform: 'translateX(-50%)',
	boxShadow: theme.customShadows.z24,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: 'inherit',
		  }
		: {
				backgroundImage: theme.palette.gradients.modal,
				borderBottom: `1px solid ${theme.palette.border.cardDark}`,
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

export const DropDownOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	// backgroundColor: 'black',
	zIndex: 1,
	display: 'none',

	'&.active': {
		display: 'block',
	},
}));

export const DropDownContentSS = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	transform: 'translateY(-110%)',
	transition: 'all 0.2s',
	width: '100vw',
	zIndex: 100,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundImage: theme.palette.gradients.modal,
		  }),

	'&.active': {
		transform: 'translateY(0)',
	},
}));
