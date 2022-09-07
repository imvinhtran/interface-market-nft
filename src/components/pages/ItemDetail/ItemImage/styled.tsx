import { Skeleton, styled } from '@mui/material';
import { Box } from '@mui/system';

export const BoxImage = styled(Box)({
	position: 'relative',
	width: '100%',
	borderRadius: 20,
	// overflow: 'hidden',
});

export const SkeletonImage = styled(Skeleton)({
	width: 'auto',
	height: 'auto',
	maxWidth: '100%',
	maxHeight: '100%',
	borderRadius: 16,
});

export const ColorPicker = styled(Box)({
	width: 25,
	height: 25,
	cursor: 'pointer',
	border: '0.2px solid #fff',
	borderRadius: '50%',
	transition: 'all 0.2s',
	'&:hover': {
		transform: 'scale(1.2)',
	},
});

export const MediaWrapper = styled(Box)({
	// position: 'absolute',
	// top: '50%',
	// left: '50%',
	// transform: 'translate(-50%, -50%)',
	// maxHeight: '100%',
	// borderRadius: 16,
	width: '100%',
});
