import { styled, Typography, Box } from '@mui/material';
import { flexStyled } from 'components/Theme/CustomStyled';

export const CollectionName = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.special,
	width: 'fit-content',
	cursor: 'pointer',
	'&:hover': {
		textDecoration: 'underline !important',
	},
}));

export const ItemName = styled(Typography)({
	padding: '0.5rem 0',
});

export const ItemOwner = styled(Typography)(({ theme }) => ({
	span: {
		color: theme.palette.text.special,
		cursor: 'pointer',

		'&:hover': {
			textDecoration: 'underline !important',
		},
	},
}));

export const BoxSubContent = styled(Box)({
	...flexStyled('start', 'center'),
});

export const BoxPrice = styled(Box)({
	...flexStyled('start', 'center'),
});
