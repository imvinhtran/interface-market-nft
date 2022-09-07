import { styled, Typography, Box } from '@mui/material';

export const MoreItemCard = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	marginLeft: 60,
	marginRight: 60,
	width: 250,
	flexShrink: 0,
}));

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	paddingTop: '100%',

	img: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
	},
}));

export const ItemName = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	width: '100%',
	marginTop: 10,
}));
