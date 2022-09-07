import { styled } from '@mui/material';

export const CollectionSlide = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	paddingBottom: 20,
	overflowX: 'auto',
	/* scrollbar */
	'&::-webkit-scrollbar': {
		height: 4,
		background: '#33BAFF',
	},

	/* Track */
	'&::-webkit-scrollbar-track': {
		// boxShadow: 'inset 0 0 5px grey',
		borderRadius: 10,
		background: '#08569E',
	},

	/* Handle */
	'&::-webkit-scrollbar-thumb': {
		background: '#33BAFF',
		borderRadius: 10,
		cursor: 'pointer',
	},

	/* Handle on hover */
	'&::-webkit-scrollbar-thumb:hover': {
		background: '#0083c4',
	},
}));
