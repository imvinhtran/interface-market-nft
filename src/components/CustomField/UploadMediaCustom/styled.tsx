import { styled } from '@mui/material';

export const DropzoneContainer = styled('div')({
	overflow: 'hidden',
});

export const DropzoneStyle = styled('div')({
	outline: 'none',
	overflow: 'hidden',
	zIndex: 0,
	width: '100%',
	height: '100%',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	// borderRadius: '50%',
	'& > *': { width: '100%', height: '100%' },
	'&:hover': {
		cursor: 'pointer',
	},

	'.Player': {
		objectFit: 'contain',
	},
});

export const ImageDefault = styled('div')({
	width: 300,
	height: 300,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 'unset !important',
});

export const ChangeBtn = styled('div')({
	width: '100%',
	height: 50,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: 'black',
		opacity: 0.4,
	},
});
