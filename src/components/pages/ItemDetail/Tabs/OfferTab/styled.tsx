import { Box, styled, BoxProps } from '@mui/material';

export const FilterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '12px',
	borderRadius: '10px',
	cursor: 'pointer',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.dark,
		  }),
}));

interface OfferListProps extends BoxProps {
	listheight: number;
}

export const OfferList = styled((props: OfferListProps) => {
	const { ...other } = props;
	return <Box {...other} />;
})(({ theme, listheight }) => ({
	maxHeight: listheight,
	overflow: 'auto',

	[theme.breakpoints.down('lg')]: {
		maxHeight: 450,
	},

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
