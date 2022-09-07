import { styled, Box, Stack, Link } from '@mui/material';

export const ItemDescription = styled(Box)(({ theme }) => ({}));

export const MoreInfoList = styled(Box)(({ theme }) => ({}));

export const MoreInfoItem = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'space-between',
	marginBottom: 20,
}));

export const AddressStyled = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	'&: hover': {
		color: theme.palette.primary.lighter,
	},
}));

export const ImageBlockchain = styled(Box)(({ theme }) => ({
	width: 18,
	height: 18,
	borderRadius: '50%',
	overflow: 'hidden',

	img: {
		width: '100%',
		height: '100%',
	},
}));
