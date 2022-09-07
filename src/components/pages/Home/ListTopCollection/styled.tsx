import { Typography, styled, Box } from '@mui/material';

export const FilterTrendingCollection = styled(Typography)(({ theme }) => ({
	// width: 120,
	display: 'flex',
	alignItems: 'center',
	color: theme.palette.primary.light,
	cursor: 'pointer',
	fontWeight: 600,
	paddingLeft: '0.5rem',
}));

export const FilterContent = styled(Box)({
	display: 'flex',
	'@media screen and (max-width: 432px)': {
		flexDirection: 'column',
		alignItems: 'center',
	},
});
