import { styled, Stack } from '@mui/material';

export const OfferList = styled(Stack)(({ theme }) => ({
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
	tr: {
		':nth-of-type(even)': {
			background: '#072d54',
		},
	},
}));
