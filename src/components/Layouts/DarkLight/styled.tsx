import { styled } from '@mui/material';

export const DarkLightStyle = styled('div')({
	border: '1px solid #0768ff',
	borderRadius: '8px',
	cursor: 'pointer',

	'&:hover .rotateImg': {
		transform: 'rotate(360deg)',
		transition: '0.4s all',
	},
});

export const DarkLightImage = styled('div')({
	padding: '7px',
	width: '30px',
	height: '30px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '8px',
	transform: 'rotate(0deg)',
	transition: '0.5s all',
	position: 'relative',

	// wrap the icon with this element, because icon will be deleted from dom, and it will close the modal option list
	'&::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
});
