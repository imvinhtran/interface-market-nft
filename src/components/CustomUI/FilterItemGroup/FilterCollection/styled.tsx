import { styled, Box } from '@mui/material';

export const CollectionImage = styled(Box)(({ theme }) => ({
	borderRadius: '50%',
	overflow: 'hidden',
	marginRight: 8,

	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
}));
