import { Box, styled } from '@mui/material';

export const CategoryHeader = styled(Box)({
	width: '100%',
	display: 'flex',
	transition: 'all 0.6 ease',
	'@media screen and (max-width: 1020px)': {
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
});
