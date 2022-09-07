import { styled } from '@mui/material';

export const ImageInputContainer = styled('div')({
	position: 'relative',
	width: '100%',
	height: '100%',
	overflow: 'hidden',

	'& input': {
		opacity: 0,
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

export const ImageDefault = styled('img')({
	width: '80px',
	height: '80px',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	borderRadius: 'unset !important',
});

export const ImageStyle = styled('img')({
	position: 'absolute',
	top: 0,
	borderRadius: '20px',
	padding: 4,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
});
